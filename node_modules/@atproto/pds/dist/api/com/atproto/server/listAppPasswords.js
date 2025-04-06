"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const lexicons_1 = require("../../../../lexicon/lexicons");
const proxy_1 = require("../../../proxy");
function default_1(server, ctx) {
    server.com.atproto.server.listAppPasswords({
        auth: ctx.authVerifier.accessStandard(),
        handler: async ({ auth, req }) => {
            if (ctx.entrywayAgent) {
                return (0, proxy_1.resultPassthru)(await ctx.entrywayAgent.com.atproto.server.listAppPasswords(undefined, await ctx.entrywayAuthHeaders(req, auth.credentials.did, lexicons_1.ids.ComAtprotoServerListAppPasswords)));
            }
            const passwords = await ctx.accountManager.listAppPasswords(auth.credentials.did);
            return {
                encoding: 'application/json',
                body: { passwords },
            };
        },
    });
}
//# sourceMappingURL=listAppPasswords.js.map