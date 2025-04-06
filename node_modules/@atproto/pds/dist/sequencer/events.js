"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountEvt = exports.identityEvt = exports.syncEvt = exports.commitEvt = exports.commitEvtOp = exports.formatSeqAccountEvt = exports.formatSeqIdentityEvt = exports.syncEvtDataFromCommit = exports.formatSeqSyncEvt = exports.formatSeqCommit = void 0;
const node_assert_1 = __importDefault(require("node:assert"));
const zod_1 = require("zod");
const common_1 = require("@atproto/common");
const repo_1 = require("@atproto/repo");
const account_manager_1 = require("../account-manager/account-manager");
const formatSeqCommit = async (did, commitData) => {
    const blocksToSend = new repo_1.BlockMap();
    blocksToSend.addMap(commitData.newBlocks);
    blocksToSend.addMap(commitData.relevantBlocks);
    const evt = {
        repo: did,
        commit: commitData.cid,
        rev: commitData.rev,
        since: commitData.since,
        blocks: await (0, repo_1.blocksToCarFile)(commitData.cid, blocksToSend),
        ops: commitData.ops,
        prevData: commitData.prevData ?? undefined,
        // deprecated (but still required) fields
        rebase: false,
        tooBig: false,
        blobs: [],
    };
    return {
        did,
        eventType: 'append',
        event: (0, common_1.cborEncode)((0, common_1.noUndefinedVals)(evt)),
        sequencedAt: new Date().toISOString(),
    };
};
exports.formatSeqCommit = formatSeqCommit;
const formatSeqSyncEvt = async (did, data) => {
    const blocks = await (0, repo_1.blocksToCarFile)(data.cid, data.blocks);
    const evt = {
        did,
        rev: data.rev,
        blocks,
    };
    return {
        did,
        eventType: 'sync',
        event: (0, common_1.cborEncode)(evt),
        sequencedAt: new Date().toISOString(),
    };
};
exports.formatSeqSyncEvt = formatSeqSyncEvt;
const syncEvtDataFromCommit = (commitData) => {
    const { blocks, missing } = commitData.relevantBlocks.getMany([
        commitData.cid,
    ]);
    (0, node_assert_1.default)(!missing.length, 'commit block was not found, could not build sync event');
    return {
        rev: commitData.rev,
        cid: commitData.cid,
        blocks,
    };
};
exports.syncEvtDataFromCommit = syncEvtDataFromCommit;
const formatSeqIdentityEvt = async (did, handle) => {
    const evt = {
        did,
    };
    if (handle) {
        evt.handle = handle;
    }
    return {
        did,
        eventType: 'identity',
        event: (0, common_1.cborEncode)(evt),
        sequencedAt: new Date().toISOString(),
    };
};
exports.formatSeqIdentityEvt = formatSeqIdentityEvt;
const formatSeqAccountEvt = async (did, status) => {
    const evt = {
        did,
        active: status === 'active',
    };
    if (status !== account_manager_1.AccountStatus.Active) {
        evt.status = status;
    }
    return {
        did,
        eventType: 'account',
        event: (0, common_1.cborEncode)(evt),
        sequencedAt: new Date().toISOString(),
    };
};
exports.formatSeqAccountEvt = formatSeqAccountEvt;
exports.commitEvtOp = zod_1.z.object({
    action: zod_1.z.union([
        zod_1.z.literal('create'),
        zod_1.z.literal('update'),
        zod_1.z.literal('delete'),
    ]),
    path: zod_1.z.string(),
    cid: common_1.schema.cid.nullable(),
    prev: common_1.schema.cid.optional(),
});
exports.commitEvt = zod_1.z.object({
    rebase: zod_1.z.boolean(),
    tooBig: zod_1.z.boolean(),
    repo: zod_1.z.string(),
    commit: common_1.schema.cid,
    rev: zod_1.z.string(),
    since: zod_1.z.string().nullable(),
    blocks: common_1.schema.bytes,
    ops: zod_1.z.array(exports.commitEvtOp),
    blobs: zod_1.z.array(common_1.schema.cid),
    prevData: common_1.schema.cid.optional(),
});
exports.syncEvt = zod_1.z.object({
    did: zod_1.z.string(),
    blocks: common_1.schema.bytes,
    rev: zod_1.z.string(),
});
exports.identityEvt = zod_1.z.object({
    did: zod_1.z.string(),
    handle: zod_1.z.string().optional(),
});
exports.accountEvt = zod_1.z.object({
    did: zod_1.z.string(),
    active: zod_1.z.boolean(),
    status: zod_1.z
        .enum([
        account_manager_1.AccountStatus.Takendown,
        account_manager_1.AccountStatus.Suspended,
        account_manager_1.AccountStatus.Deleted,
        account_manager_1.AccountStatus.Deactivated,
    ])
        .optional(),
});
//# sourceMappingURL=events.js.map