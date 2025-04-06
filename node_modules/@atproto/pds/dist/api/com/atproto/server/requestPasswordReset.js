"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const common_1 = require("@atproto/common");
const xrpc_server_1 = require("@atproto/xrpc-server");
function default_1(server, ctx) {
    server.com.atproto.server.requestPasswordReset({
        rateLimit: [
            {
                durationMs: common_1.DAY,
                points: 50,
            },
            {
                durationMs: common_1.HOUR,
                points: 15,
            },
        ],
        handler: async ({ input, req }) => {
            const email = input.body.email.toLowerCase();
            const account = await ctx.accountManager.getAccountByEmail(email, {
                includeDeactivated: true,
                includeTakenDown: true,
            });
            if (!account?.email) {
                if (ctx.entrywayAgent) {
                    await ctx.entrywayAgent.com.atproto.server.requestPasswordReset(input.body, ctx.entrywayPassthruHeaders(req));
                    return;
                }
                throw new xrpc_server_1.InvalidRequestError('account does not have an email address');
            }
            const token = await ctx.accountManager.createEmailToken(account.did, 'reset_password');
            await ctx.mailer.sendResetPassword({ handle: account.handle ?? account.email, token }, { to: account.email });
        },
    });
}
//# sourceMappingURL=requestPasswordReset.js.map