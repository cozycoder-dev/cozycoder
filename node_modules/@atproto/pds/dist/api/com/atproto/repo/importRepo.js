"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findBlobRefs = void 0;
exports.default = default_1;
const cid_1 = require("multiformats/cid");
const p_queue_1 = __importDefault(require("p-queue"));
const common_1 = require("@atproto/common");
const lexicon_1 = require("@atproto/lexicon");
const repo_1 = require("@atproto/repo");
const syntax_1 = require("@atproto/syntax");
const xrpc_server_1 = require("@atproto/xrpc-server");
function default_1(server, ctx) {
    server.com.atproto.repo.importRepo({
        auth: ctx.authVerifier.accessFull({
            checkTakedown: true,
        }),
        handler: async ({ input, auth }) => {
            const did = auth.credentials.did;
            if (!ctx.cfg.service.acceptingImports) {
                throw new xrpc_server_1.InvalidRequestError('Service is not accepting repo imports');
            }
            await ctx.actorStore.transact(did, (store) => importRepo(store, input.body));
        },
    });
}
const importRepo = async (actorStore, incomingCar) => {
    const now = new Date().toISOString();
    const rev = common_1.TID.nextStr();
    const did = actorStore.repo.did;
    const { roots, blocks } = await (0, repo_1.readCarStream)(incomingCar);
    if (roots.length !== 1) {
        throw new xrpc_server_1.InvalidRequestError('expected one root');
    }
    const blockMap = new repo_1.BlockMap();
    for await (const block of blocks) {
        blockMap.set(block.cid, block.bytes);
    }
    const currRepo = await actorStore.repo.maybeLoadRepo();
    const diff = await (0, repo_1.verifyDiff)(currRepo, blockMap, roots[0], undefined, undefined, { ensureLeaves: false });
    diff.commit.rev = rev;
    await actorStore.repo.storage.applyCommit(diff.commit, currRepo === null);
    const recordQueue = new p_queue_1.default({ concurrency: 50 });
    const controller = new AbortController();
    for (const write of diff.writes) {
        recordQueue
            .add(async () => {
            const uri = syntax_1.AtUri.make(did, write.collection, write.rkey);
            if (write.action === repo_1.WriteOpAction.Delete) {
                await actorStore.record.deleteRecord(uri);
            }
            else {
                let parsedRecord;
                try {
                    const parsed = await (0, repo_1.getAndParseRecord)(blockMap, write.cid);
                    parsedRecord = parsed.record;
                }
                catch {
                    throw new xrpc_server_1.InvalidRequestError(`Could not parse record at '${write.collection}/${write.rkey}'`);
                }
                const indexRecord = actorStore.record.indexRecord(uri, write.cid, parsedRecord, write.action, rev, now);
                const recordBlobs = (0, exports.findBlobRefs)(parsedRecord);
                const indexRecordBlobs = actorStore.repo.blob.insertBlobs(uri.toString(), recordBlobs);
                await Promise.all([indexRecord, indexRecordBlobs]);
            }
        }, { signal: controller.signal })
            .catch((err) => controller.abort(err));
    }
    await recordQueue.onIdle();
    controller.signal.throwIfAborted();
};
const findBlobRefs = (val, layer = 0) => {
    if (layer > 32) {
        return [];
    }
    // walk arrays
    if (Array.isArray(val)) {
        return val.flatMap((item) => (0, exports.findBlobRefs)(item, layer + 1));
    }
    // objects
    if (val && typeof val === 'object') {
        // convert blobs, leaving the original encoding so that we don't change CIDs on re-encode
        if (val instanceof lexicon_1.BlobRef) {
            return [val];
        }
        // retain cids & bytes
        if (cid_1.CID.asCID(val) || val instanceof Uint8Array) {
            return [];
        }
        return Object.values(val).flatMap((item) => (0, exports.findBlobRefs)(item, layer + 1));
    }
    // pass through
    return [];
};
exports.findBlobRefs = findBlobRefs;
//# sourceMappingURL=importRepo.js.map