"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
function default_1(server, ctx) {
    const { entrywayAgent } = ctx;
    if (entrywayAgent) {
        server.com.atproto.server.deleteSession(async ({ req }) => {
            await entrywayAgent.com.atproto.server.deleteSession(undefined, ctx.entrywayPassthruHeaders(req));
        });
    }
    else {
        server.com.atproto.server.deleteSession({
            auth: ctx.authVerifier.refreshExpired,
            handler: async ({ auth }) => {
                await ctx.accountManager.revokeRefreshToken(auth.credentials.tokenId);
            },
        });
    }
}
//# sourceMappingURL=deleteSession.js.map