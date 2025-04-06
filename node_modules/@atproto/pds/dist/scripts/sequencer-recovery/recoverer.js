"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processSeqEvt = exports.Recoverer = void 0;
const common_1 = require("@atproto/common");
const crypto_1 = require("@atproto/crypto");
const repo_1 = require("@atproto/repo");
const account_manager_1 = require("../../account-manager/account-manager");
const db_1 = require("../../db");
const repo_2 = require("../../repo");
const user_queues_1 = require("./user-queues");
const PAGE_SIZE = 5000;
class Recoverer {
    constructor(ctx, opts) {
        Object.defineProperty(this, "ctx", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ctx
        });
        Object.defineProperty(this, "queues", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "failed", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.queues = new user_queues_1.UserQueues(opts.concurrency);
        this.failed = new Set();
    }
    async run(startCursor = 0) {
        const failed = await this.ctx.recoveryDb.db
            .selectFrom('failed')
            .select('did')
            .execute();
        for (const row of failed) {
            this.failed.add(row.did);
        }
        const totalRes = await this.ctx.sequencer.db.db
            .selectFrom('repo_seq')
            .select(db_1.countAll.as('count'))
            .executeTakeFirstOrThrow();
        const totalEvts = totalRes.count;
        let completed = 0;
        let cursor = startCursor;
        while (cursor !== undefined) {
            const page = await this.ctx.sequencer.requestSeqRange({
                earliestSeq: cursor,
                limit: PAGE_SIZE,
            });
            page.forEach((evt) => this.processEvent(evt));
            cursor = page.at(-1)?.seq;
            await this.queues.onEmpty();
            completed += PAGE_SIZE;
            const percentComplete = (completed / totalEvts) * 100;
            console.log(`${percentComplete.toFixed(2)}% - ${cursor}`);
        }
        await this.queues.processAll();
    }
    async processAll() {
        await this.queues.processAll();
    }
    async destroy() {
        await this.queues.destroy();
    }
    processEvent(evt) {
        const did = didFromEvt(evt);
        if (!did) {
            return;
        }
        this.queues.addToUser(did, async () => {
            if (this.failed.has(did)) {
                return;
            }
            await (0, exports.processSeqEvt)(this.ctx, evt).catch(async (err) => {
                this.failed.add(did);
                await trackFailure(this.ctx.recoveryDb, did, err);
            });
        });
    }
}
exports.Recoverer = Recoverer;
const processSeqEvt = async (ctx, evt) => {
    // only need to process commits & tombstones
    if (evt.type === 'account') {
        await processAccountEvt(ctx, evt.evt);
    }
    if (evt.type === 'commit') {
        await processCommit(ctx, evt.evt).catch();
    }
};
exports.processSeqEvt = processSeqEvt;
const processCommit = async (ctx, evt) => {
    const did = evt.repo;
    const { writes, blocks } = await parseCommitEvt(evt);
    if (evt.since === null) {
        const actorExists = await ctx.actorStore.exists(did);
        if (!actorExists) {
            await processRepoCreation(ctx, evt, writes, blocks);
            return;
        }
    }
    await ctx.actorStore.transact(did, async (actorTxn) => {
        const root = await actorTxn.repo.storage.getRootDetailed();
        if (root.rev >= evt.rev) {
            return;
        }
        const commit = await actorTxn.repo.formatCommit(writes);
        commit.newBlocks = blocks;
        commit.cid = evt.commit;
        commit.rev = evt.rev;
        await Promise.all([
            actorTxn.repo.storage.applyCommit(commit),
            actorTxn.repo.indexWrites(writes, commit.rev),
            trackBlobs(actorTxn, writes),
        ]);
    });
};
const processRepoCreation = async (ctx, evt, writes, blocks) => {
    const did = evt.repo;
    const keypair = await crypto_1.Secp256k1Keypair.create({ exportable: true });
    await ctx.actorStore.create(did, keypair);
    const commit = {
        cid: evt.commit,
        rev: evt.rev,
        since: evt.since,
        prev: null,
        newBlocks: blocks,
        relevantBlocks: new repo_1.BlockMap(),
        removedCids: new repo_1.CidSet(),
    };
    await ctx.actorStore.transact(did, (actorTxn) => Promise.all([
        actorTxn.repo.storage.applyCommit(commit, true),
        actorTxn.repo.indexWrites(writes, commit.rev),
        actorTxn.repo.blob.processWriteBlobs(commit.rev, writes),
    ]));
    await trackNewAccount(ctx.recoveryDb, did);
};
const processAccountEvt = async (ctx, evt) => {
    // do not need to process deactivation/takedowns because we backup account DB as well
    if (evt.status !== account_manager_1.AccountStatus.Deleted) {
        return;
    }
    const { directory } = await ctx.actorStore.getLocation(evt.did);
    await (0, common_1.rmIfExists)(directory, true);
    await ctx.accountManager.deleteAccount(evt.did);
};
const trackBlobs = async (store, writes) => {
    await store.repo.blob.deleteDereferencedBlobs(writes);
    for (const write of writes) {
        if (write.action === repo_1.WriteOpAction.Create ||
            write.action === repo_1.WriteOpAction.Update) {
            for (const blob of write.blobs) {
                await store.repo.blob.insertBlobMetadata(blob);
                await store.repo.blob.associateBlob(blob, write.uri);
            }
        }
    }
};
const trackFailure = async (recoveryDb, did, err) => {
    await recoveryDb.db
        .insertInto('failed')
        .values({
        did,
        error: err?.toString(),
        fixed: 0,
    })
        .onConflict((oc) => oc.doNothing())
        .execute();
};
const trackNewAccount = async (recoveryDb, did) => {
    await recoveryDb.db
        .insertInto('new_account')
        .values({
        did,
        published: 0,
    })
        .onConflict((oc) => oc.doNothing())
        .execute();
};
const parseCommitEvt = async (evt) => {
    const did = evt.repo;
    const evtCar = await (0, repo_1.readCar)(evt.blocks);
    const writesUnfiltered = await Promise.all(evt.ops.map(async (op) => {
        const { collection, rkey } = (0, repo_1.parseDataKey)(op.path);
        if (op.action === 'delete') {
            return (0, repo_2.prepareDelete)({ did, collection, rkey });
        }
        if (!op.cid)
            return undefined;
        const recordBytes = evtCar.blocks.get(op.cid);
        if (!recordBytes)
            return undefined;
        const record = (0, repo_1.cborToLexRecord)(recordBytes);
        if (op.action === 'create') {
            return (0, repo_2.prepareCreate)({
                did,
                collection,
                rkey,
                record,
                validate: false,
            });
        }
        else {
            return (0, repo_2.prepareUpdate)({
                did,
                collection,
                rkey,
                record,
                validate: false,
            });
        }
    }));
    const writes = writesUnfiltered.filter((w) => w !== undefined);
    return {
        writes,
        blocks: evtCar.blocks,
    };
};
const didFromEvt = (evt) => {
    if (evt.type === 'account') {
        return evt.evt.did;
    }
    else if (evt.type === 'commit') {
        return evt.evt.repo;
    }
    else {
        return null;
    }
};
//# sourceMappingURL=recoverer.js.map