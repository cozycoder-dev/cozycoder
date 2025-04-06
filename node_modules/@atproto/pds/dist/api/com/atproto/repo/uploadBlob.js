"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const common_1 = require("@atproto/common");
const xrpc_server_1 = require("@atproto/xrpc-server");
function default_1(server, ctx) {
    server.com.atproto.repo.uploadBlob({
        auth: ctx.authVerifier.accessOrUserServiceAuth({
            checkTakedown: true,
        }),
        rateLimit: {
            durationMs: common_1.DAY,
            points: 1000,
        },
        handler: async ({ auth, input }) => {
            const requester = auth.credentials.did;
            const blob = await ctx.actorStore.writeNoTransaction(requester, async (store) => {
                let metadata;
                try {
                    metadata = await store.repo.blob.uploadBlobAndGetMetadata(input.encoding, input.body);
                }
                catch (err) {
                    if (err?.['name'] === 'AbortError') {
                        throw new xrpc_server_1.UpstreamTimeoutError('Upload timed out, please try again.');
                    }
                    throw err;
                }
                return store.transact(async (actorTxn) => {
                    const blobRef = await actorTxn.repo.blob.trackUntetheredBlob(metadata);
                    // make the blob permanent if an associated record is already indexed
                    const recordsForBlob = await actorTxn.repo.blob.getRecordsForBlob(blobRef.ref);
                    if (recordsForBlob.length > 0) {
                        await actorTxn.repo.blob.verifyBlobAndMakePermanent({
                            cid: blobRef.ref,
                            mimeType: blobRef.mimeType,
                            size: blobRef.size,
                            constraints: {},
                        });
                    }
                    return blobRef;
                });
            });
            return {
                encoding: 'application/json',
                body: {
                    blob,
                },
            };
        },
    });
}
//# sourceMappingURL=uploadBlob.js.map