"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const xrpc_server_1 = require("@atproto/xrpc-server");
const util_1 = require("./util");
function default_1(server, ctx) {
    server.com.atproto.sync.getLatestCommit({
        auth: ctx.authVerifier.optionalAccessOrAdminToken(),
        handler: async ({ params, auth }) => {
            const { did } = params;
            await (0, util_1.assertRepoAvailability)(ctx, did, ctx.authVerifier.isUserOrAdmin(auth, did));
            const root = await ctx.actorStore.read(did, (store) => store.repo.storage.getRootDetailed());
            if (root === null) {
                throw new xrpc_server_1.InvalidRequestError(`Could not find root for DID: ${did}`, 'RepoNotFound');
            }
            return {
                encoding: 'application/json',
                body: { cid: root.cid.toString(), rev: root.rev },
            };
        },
    });
}
//# sourceMappingURL=getLatestCommit.js.map