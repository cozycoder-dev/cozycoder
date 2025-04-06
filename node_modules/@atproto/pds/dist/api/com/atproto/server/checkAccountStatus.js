"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const util_1 = require("./util");
function default_1(server, ctx) {
    server.com.atproto.server.checkAccountStatus({
        auth: ctx.authVerifier.accessStandard(),
        handler: async ({ auth }) => {
            const requester = auth.credentials.did;
            const [repoRoot, repoBlocks, indexedRecords, importedBlobs, expectedBlobs,] = await ctx.actorStore.read(requester, async (store) => {
                return await Promise.all([
                    store.repo.storage.getRootDetailed(),
                    store.repo.storage.countBlocks(),
                    store.record.recordCount(),
                    store.repo.blob.blobCount(),
                    store.repo.blob.recordBlobCount(),
                ]);
            });
            const [activated, validDid] = await Promise.all([
                ctx.accountManager.isAccountActivated(requester),
                (0, util_1.isValidDidDocForService)(ctx, requester),
            ]);
            return {
                encoding: 'application/json',
                body: {
                    activated,
                    validDid,
                    repoCommit: repoRoot.cid.toString(),
                    repoRev: repoRoot.rev,
                    repoBlocks,
                    indexedRecords,
                    privateStateValues: 0,
                    expectedBlobs,
                    importedBlobs,
                },
            };
        },
    });
}
//# sourceMappingURL=checkAccountStatus.js.map