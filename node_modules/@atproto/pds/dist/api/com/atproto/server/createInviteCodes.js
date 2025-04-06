"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const xrpc_server_1 = require("@atproto/xrpc-server");
const util_1 = require("./util");
function default_1(server, ctx) {
    server.com.atproto.server.createInviteCodes({
        auth: ctx.authVerifier.adminToken,
        handler: async ({ input }) => {
            if (ctx.cfg.entryway) {
                throw new xrpc_server_1.InvalidRequestError('Account invites are managed by the entryway service');
            }
            const { codeCount, useCount } = input.body;
            const forAccounts = input.body.forAccounts ?? ['admin'];
            const accountCodes = [];
            for (const account of forAccounts) {
                const codes = (0, util_1.genInvCodes)(ctx.cfg, codeCount);
                accountCodes.push({ account, codes });
            }
            await ctx.accountManager.createInviteCodes(accountCodes, useCount);
            return {
                encoding: 'application/json',
                body: { codes: accountCodes },
            };
        },
    });
}
//# sourceMappingURL=createInviteCodes.js.map