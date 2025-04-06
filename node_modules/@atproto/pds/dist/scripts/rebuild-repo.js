"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rebuildRepo = exports.rebuildRepoScript = void 0;
const promises_1 = __importDefault(require("node:readline/promises"));
const common_1 = require("@atproto/common");
const repo_1 = require("@atproto/repo");
const rebuildRepoScript = async (ctx, args) => {
    const did = args[0];
    if (!did || !did.startsWith('did:')) {
        throw new Error('Expected DID as argument');
    }
    return (0, exports.rebuildRepo)(ctx, did, true);
};
exports.rebuildRepoScript = rebuildRepoScript;
const rebuildRepo = async (ctx, did, promptUser) => {
    const memoryStore = new repo_1.MemoryBlockstore();
    const commit = await ctx.actorStore.transact(did, async (store) => {
        const [rootDetails, records, existingCids] = await Promise.all([
            store.repo.storage.getRootDetailed(),
            store.record.listAll(),
            store.record.listExistingBlocks(),
        ]);
        // increment existing rev by 1 ms
        const revTid = common_1.TID.fromStr(rootDetails.rev);
        const rev = common_1.TID.fromTime(revTid.timestamp() + 1, revTid.clockid()).toString();
        let mst = await repo_1.MST.create(memoryStore);
        for (const record of records) {
            mst = await mst.add(record.path, record.cid);
        }
        const newBlocks = new repo_1.BlockMap();
        for await (const node of mst.walk()) {
            if (node.isTree()) {
                const pointer = await node.getPointer();
                if (!existingCids.has(pointer)) {
                    const serialized = await node.serialize();
                    newBlocks.set(serialized.cid, serialized.bytes);
                }
            }
        }
        const mstCids = await mst.allCids();
        const toDelete = new repo_1.CidSet(existingCids.toList()).subtractSet(mstCids);
        const newCommit = await (0, repo_1.signCommit)({
            did,
            version: 3,
            rev,
            prev: null,
            data: await mst.getPointer(),
        }, store.repo.signingKey);
        const commitCid = await newBlocks.add(newCommit);
        if (promptUser) {
            console.log('Record count: ', records.length);
            console.log('Existing blocks: ', existingCids.toList().length);
            console.log('Deleting blocks:', toDelete.toList().length);
            console.log('Adding blocks: ', newBlocks.size);
            const shouldContinue = await promptContinue();
            if (!shouldContinue) {
                throw new Error('Aborted');
            }
        }
        await store.repo.storage.deleteMany(toDelete.toList());
        await store.repo.storage.putMany(newBlocks, rev);
        await store.repo.storage.updateRoot(commitCid, rev);
        return {
            cid: commitCid,
            rev,
            since: null,
            prev: null,
            newBlocks,
            relevantBlocks: newBlocks,
            removedCids: toDelete,
            ops: [],
            blobs: new repo_1.CidSet(),
            prevData: null,
        };
    });
    await ctx.accountManager.updateRepoRoot(did, commit.cid, commit.rev);
    const syncData = await ctx.actorStore.read(did, (store) => store.repo.getSyncEventData());
    await ctx.sequencer.sequenceSyncEvt(did, syncData);
};
exports.rebuildRepo = rebuildRepo;
const promptContinue = async () => {
    const rl = promises_1.default.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    const answer = await rl.question('Continue? y/n ');
    return answer === '';
};
//# sourceMappingURL=rebuild-repo.js.map