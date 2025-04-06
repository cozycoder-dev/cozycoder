"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const xrpc_server_1 = require("@atproto/xrpc-server");
const util_1 = require("./util");
function default_1(server, ctx) {
    server.com.atproto.server.createInviteCode({
        auth: ctx.authVerifier.adminToken,
        handler: async ({ input }) => {
            if (ctx.cfg.entryway) {
                throw new xrpc_server_1.InvalidRequestError('Account invites are managed by the entryway service');
            }
            const { useCount, forAccount = 'admin' } = input.body;
            const code = (0, util_1.genInvCode)(ctx.cfg);
            await ctx.accountManager.createInviteCodes([{ account: forAccount, codes: [code] }], useCount);
            return {
                encoding: 'application/json',
                body: { code },
            };
        },
    });
}
//# sourceMappingURL=createInviteCode.js.map