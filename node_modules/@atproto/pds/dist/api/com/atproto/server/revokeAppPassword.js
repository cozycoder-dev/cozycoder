"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const lexicons_1 = require("../../../../lexicon/lexicons");
function default_1(server, ctx) {
    server.com.atproto.server.revokeAppPassword({
        auth: ctx.authVerifier.accessStandard(),
        handler: async ({ auth, input, req }) => {
            if (ctx.entrywayAgent) {
                await ctx.entrywayAgent.com.atproto.server.revokeAppPassword(input.body, await ctx.entrywayAuthHeaders(req, auth.credentials.did, lexicons_1.ids.ComAtprotoServerRevokeAppPassword));
                return;
            }
            const requester = auth.credentials.did;
            const { name } = input.body;
            await ctx.accountManager.revokeAppPassword(requester, name);
        },
    });
}
//# sourceMappingURL=revokeAppPassword.js.map