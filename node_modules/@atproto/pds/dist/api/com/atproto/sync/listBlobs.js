"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const auth_verifier_1 = require("../../../../auth-verifier");
const util_1 = require("./util");
function default_1(server, ctx) {
    server.com.atproto.sync.listBlobs({
        auth: ctx.authVerifier.optionalAccessOrAdminToken({
            additional: [auth_verifier_1.AuthScope.Takendown],
        }),
        handler: async ({ params, auth }) => {
            const { did, since, limit, cursor } = params;
            await (0, util_1.assertRepoAvailability)(ctx, did, ctx.authVerifier.isUserOrAdmin(auth, did));
            const blobCids = await ctx.actorStore.read(did, (store) => store.repo.blob.listBlobs({ since, limit, cursor }));
            return {
                encoding: 'application/json',
                body: {
                    cursor: blobCids.at(-1),
                    cids: blobCids,
                },
            };
        },
    });
}
//# sourceMappingURL=listBlobs.js.map