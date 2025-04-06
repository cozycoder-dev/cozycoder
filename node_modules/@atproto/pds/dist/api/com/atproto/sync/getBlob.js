"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const cid_1 = require("multiformats/cid");
const repo_1 = require("@atproto/repo");
const xrpc_server_1 = require("@atproto/xrpc-server");
const auth_verifier_1 = require("../../../../auth-verifier");
const util_1 = require("./util");
function default_1(server, ctx) {
    server.com.atproto.sync.getBlob({
        auth: ctx.authVerifier.optionalAccessOrAdminToken({
            additional: [auth_verifier_1.AuthScope.Takendown],
        }),
        handler: async ({ params, res, auth }) => {
            const { did } = params;
            await (0, util_1.assertRepoAvailability)(ctx, did, ctx.authVerifier.isUserOrAdmin(auth, did));
            const cid = cid_1.CID.parse(params.cid);
            const found = await ctx.actorStore.read(params.did, async (store) => {
                try {
                    return await store.repo.blob.getBlob(cid);
                }
                catch (err) {
                    if (err instanceof repo_1.BlobNotFoundError) {
                        throw new xrpc_server_1.InvalidRequestError('Blob not found');
                    }
                    else {
                        throw err;
                    }
                }
            });
            if (!found) {
                throw new xrpc_server_1.InvalidRequestError('Blob not found');
            }
            res.setHeader('content-length', found.size);
            res.setHeader('x-content-type-options', 'nosniff');
            res.setHeader('content-security-policy', `default-src 'none'; sandbox`);
            return {
                // @TODO better codegen for */* mimetype
                encoding: (found.mimeType || 'application/octet-stream'),
                body: found.stream,
            };
        },
    });
}
//# sourceMappingURL=getBlob.js.map