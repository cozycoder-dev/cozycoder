"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const cid_1 = require("multiformats/cid");
const lexicon_1 = require("@atproto/lexicon");
const syntax_1 = require("@atproto/syntax");
const xrpc_server_1 = require("@atproto/xrpc-server");
const lexicons_1 = require("../../../../lexicon/lexicons");
const logger_1 = require("../../../../logger");
const repo_1 = require("../../../../repo");
function default_1(server, ctx) {
    server.com.atproto.repo.putRecord({
        auth: ctx.authVerifier.accessStandard({
            checkTakedown: true,
            checkDeactivated: true,
        }),
        rateLimit: [
            {
                name: 'repo-write-hour',
                calcKey: ({ auth }) => auth.credentials.did,
                calcPoints: () => 2,
            },
            {
                name: 'repo-write-day',
                calcKey: ({ auth }) => auth.credentials.did,
                calcPoints: () => 2,
            },
        ],
        handler: async ({ auth, input }) => {
            const { repo, collection, rkey, record, validate, swapCommit, swapRecord, } = input.body;
            const account = await ctx.accountManager.getAccount(repo, {
                includeDeactivated: true,
            });
            if (!account) {
                throw new xrpc_server_1.InvalidRequestError(`Could not find repo: ${repo}`);
            }
            else if (account.deactivatedAt) {
                throw new xrpc_server_1.InvalidRequestError('Account is deactivated');
            }
            const did = account.did;
            if (did !== auth.credentials.did) {
                throw new xrpc_server_1.AuthRequiredError();
            }
            const uri = syntax_1.AtUri.make(did, collection, rkey);
            const swapCommitCid = swapCommit ? cid_1.CID.parse(swapCommit) : undefined;
            const swapRecordCid = typeof swapRecord === 'string' ? cid_1.CID.parse(swapRecord) : swapRecord;
            const { commit, write } = await ctx.actorStore.transact(did, async (actorTxn) => {
                const current = await actorTxn.record.getRecord(uri, null, true);
                const isUpdate = current !== null;
                // @TODO temporaray hack for legacy blob refs in profiles - remove after migrating legacy blobs
                if (isUpdate && collection === lexicons_1.ids.AppBskyActorProfile) {
                    await updateProfileLegacyBlobRef(actorTxn, record);
                }
                const writeInfo = {
                    did,
                    collection,
                    rkey,
                    record,
                    swapCid: swapRecordCid,
                    validate,
                };
                let write;
                try {
                    write = isUpdate
                        ? await (0, repo_1.prepareUpdate)(writeInfo)
                        : await (0, repo_1.prepareCreate)(writeInfo);
                }
                catch (err) {
                    if (err instanceof repo_1.InvalidRecordError) {
                        throw new xrpc_server_1.InvalidRequestError(err.message);
                    }
                    throw err;
                }
                // no-op
                if (current && current.cid === write.cid.toString()) {
                    return {
                        commit: null,
                        write,
                    };
                }
                const commit = await actorTxn.repo
                    .processWrites([write], swapCommitCid)
                    .catch((err) => {
                    if (err instanceof repo_1.BadCommitSwapError ||
                        err instanceof repo_1.BadRecordSwapError) {
                        throw new xrpc_server_1.InvalidRequestError(err.message, 'InvalidSwap');
                    }
                    else {
                        throw err;
                    }
                });
                await ctx.sequencer.sequenceCommit(did, commit);
                return { commit, write };
            });
            if (commit !== null) {
                await ctx.accountManager
                    .updateRepoRoot(did, commit.cid, commit.rev)
                    .catch((err) => {
                    logger_1.dbLogger.error({ err, did, cid: commit.cid, rev: commit.rev }, 'failed to update account root');
                });
            }
            return {
                encoding: 'application/json',
                body: {
                    uri: write.uri.toString(),
                    cid: write.cid.toString(),
                    commit: commit
                        ? {
                            cid: commit.cid.toString(),
                            rev: commit.rev,
                        }
                        : undefined,
                    validationStatus: write.validationStatus,
                },
            };
        },
    });
}
// WARNING: mutates object
const updateProfileLegacyBlobRef = async (actorStore, record) => {
    if (record.avatar && !record.avatar.original['$type']) {
        const blob = await actorStore.repo.blob.getBlobMetadata(record.avatar.ref);
        record.avatar = new lexicon_1.BlobRef(record.avatar.ref, record.avatar.mimeType, blob.size);
    }
    if (record.banner && !record.banner.original['$type']) {
        const blob = await actorStore.repo.blob.getBlobMetadata(record.banner.ref);
        record.banner = new lexicon_1.BlobRef(record.banner.ref, record.banner.mimeType, blob.size);
    }
};
//# sourceMappingURL=putRecord.js.map