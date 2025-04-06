"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const xrpc_server_1 = require("@atproto/xrpc-server");
function default_1(server, ctx) {
    server.com.atproto.admin.updateAccountEmail({
        auth: ctx.authVerifier.adminToken,
        handler: async ({ input, req }) => {
            const account = await ctx.accountManager.getAccount(input.body.account, {
                includeDeactivated: true,
                includeTakenDown: true,
            });
            if (!account) {
                throw new xrpc_server_1.InvalidRequestError(`Account does not exist: ${input.body.account}`);
            }
            if (ctx.entrywayAgent) {
                await ctx.entrywayAgent.com.atproto.admin.updateAccountEmail(input.body, ctx.entrywayPassthruHeaders(req));
                return;
            }
            await ctx.accountManager.updateEmail({
                did: account.did,
                email: input.body.email,
            });
        },
    });
}
//# sourceMappingURL=updateAccountEmail.js.map