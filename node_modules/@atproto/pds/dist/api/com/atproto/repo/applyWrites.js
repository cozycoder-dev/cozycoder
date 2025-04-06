"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const cid_1 = require("multiformats/cid");
const repo_1 = require("@atproto/repo");
const xrpc_server_1 = require("@atproto/xrpc-server");
const applyWrites_1 = require("../../../../lexicon/types/com/atproto/repo/applyWrites");
const logger_1 = require("../../../../logger");
const repo_2 = require("../../../../repo");
const ratelimitPoints = ({ input }) => {
    let points = 0;
    for (const op of input.body.writes) {
        if ((0, applyWrites_1.isCreate)(op)) {
            points += 3;
        }
        else if ((0, applyWrites_1.isUpdate)(op)) {
            points += 2;
        }
        else {
            points += 1;
        }
    }
    return points;
};
function default_1(server, ctx) {
    server.com.atproto.repo.applyWrites({
        auth: ctx.authVerifier.accessStandard({
            checkTakedown: true,
            checkDeactivated: true,
        }),
        rateLimit: [
            {
                name: 'repo-write-hour',
                calcKey: ({ auth }) => auth.credentials.did,
                calcPoints: ratelimitPoints,
            },
            {
                name: 'repo-write-day',
                calcKey: ({ auth }) => auth.credentials.did,
                calcPoints: ratelimitPoints,
            },
        ],
        handler: async ({ input, auth }) => {
            const tx = input.body;
            const { repo, validate, swapCommit } = tx;
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
            if (tx.writes.length > 200) {
                throw new xrpc_server_1.InvalidRequestError('Too many writes. Max: 200');
            }
            // @NOTE should preserve order of ts.writes for final use in response
            let writes;
            try {
                writes = await Promise.all(tx.writes.map((write) => {
                    if ((0, applyWrites_1.isCreate)(write)) {
                        return (0, repo_2.prepareCreate)({
                            did,
                            collection: write.collection,
                            record: write.value,
                            rkey: write.rkey,
                            validate,
                        });
                    }
                    else if ((0, applyWrites_1.isUpdate)(write)) {
                        return (0, repo_2.prepareUpdate)({
                            did,
                            collection: write.collection,
                            record: write.value,
                            rkey: write.rkey,
                            validate,
                        });
                    }
                    else if ((0, applyWrites_1.isDelete)(write)) {
                        return (0, repo_2.prepareDelete)({
                            did,
                            collection: write.collection,
                            rkey: write.rkey,
                        });
                    }
                    else {
                        throw new xrpc_server_1.InvalidRequestError(`Action not supported: ${write['$type']}`);
                    }
                }));
            }
            catch (err) {
                if (err instanceof repo_2.InvalidRecordError) {
                    throw new xrpc_server_1.InvalidRequestError(err.message);
                }
                throw err;
            }
            const swapCommitCid = swapCommit ? cid_1.CID.parse(swapCommit) : undefined;
            const commit = await ctx.actorStore.transact(did, async (actorTxn) => {
                const commit = await actorTxn.repo
                    .processWrites(writes, swapCommitCid)
                    .catch((err) => {
                    if (err instanceof repo_2.BadCommitSwapError) {
                        throw new xrpc_server_1.InvalidRequestError(err.message, 'InvalidSwap');
                    }
                    else {
                        throw err;
                    }
                });
                await ctx.sequencer.sequenceCommit(did, commit);
                return commit;
            });
            await ctx.accountManager
                .updateRepoRoot(did, commit.cid, commit.rev)
                .catch((err) => {
                logger_1.dbLogger.error({ err, did, cid: commit.cid, rev: commit.rev }, 'failed to update account root');
            });
            return {
                encoding: 'application/json',
                body: {
                    commit: {
                        cid: commit.cid.toString(),
                        rev: commit.rev,
                    },
                    results: writes.map(writeToOutputResult),
                },
            };
        },
    });
}
const writeToOutputResult = (write) => {
    switch (write.action) {
        case repo_1.WriteOpAction.Create:
            return {
                $type: 'com.atproto.repo.applyWrites#createResult',
                cid: write.cid.toString(),
                uri: write.uri.toString(),
                validationStatus: write.validationStatus,
            };
        case repo_1.WriteOpAction.Update:
            return {
                $type: 'com.atproto.repo.applyWrites#updateResult',
                cid: write.cid.toString(),
                uri: write.uri.toString(),
                validationStatus: write.validationStatus,
            };
        case repo_1.WriteOpAction.Delete:
            return {
                $type: 'com.atproto.repo.applyWrites#deleteResult',
            };
        default:
            throw new Error(`Unrecognized action: ${write}`);
    }
};
//# sourceMappingURL=applyWrites.js.map