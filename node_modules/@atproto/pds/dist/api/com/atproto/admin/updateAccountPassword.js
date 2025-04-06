"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
function default_1(server, ctx) {
    server.com.atproto.admin.updateAccountPassword({
        auth: ctx.authVerifier.adminToken,
        handler: async ({ input, req }) => {
            if (ctx.entrywayAgent) {
                await ctx.entrywayAgent.com.atproto.admin.updateAccountPassword(input.body, ctx.entrywayPassthruHeaders(req));
                return;
            }
            const { did, password } = input.body;
            await ctx.accountManager.updateAccountPassword({ did, password });
        },
    });
}
//# sourceMappingURL=updateAccountPassword.js.map