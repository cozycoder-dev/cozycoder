"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const xrpc_server_1 = require("@atproto/xrpc-server");
function default_1(server, ctx) {
    server.com.atproto.admin.disableInviteCodes({
        auth: ctx.authVerifier.moderator,
        handler: async ({ input }) => {
            if (ctx.cfg.entryway) {
                throw new xrpc_server_1.InvalidRequestError('Account invites are managed by the entryway service');
            }
            const { codes = [], accounts = [] } = input.body;
            if (accounts.includes('admin')) {
                throw new xrpc_server_1.InvalidRequestError('cannot disable admin invite codes');
            }
            await ctx.accountManager.disableInviteCodes({ codes, accounts });
        },
    });
}
//# sourceMappingURL=disableInviteCodes.js.map