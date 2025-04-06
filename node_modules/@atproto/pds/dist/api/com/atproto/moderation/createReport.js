"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const api_1 = require("@atproto/api");
const auth_verifier_1 = require("../../../../auth-verifier");
const lexicons_1 = require("../../../../lexicon/lexicons");
const pipethrough_1 = require("../../../../pipethrough");
function default_1(server, ctx) {
    server.com.atproto.moderation.createReport({
        auth: ctx.authVerifier.accessStandard({
            additional: [auth_verifier_1.AuthScope.Takendown],
        }),
        handler: async ({ auth, input, req }) => {
            const { url, did: aud } = await (0, pipethrough_1.parseProxyInfo)(ctx, req, lexicons_1.ids.ComAtprotoModerationCreateReport);
            const agent = new api_1.AtpAgent({ service: url });
            const serviceAuth = await ctx.serviceAuthHeaders(auth.credentials.did, aud, lexicons_1.ids.ComAtprotoModerationCreateReport);
            const res = await agent.com.atproto.moderation.createReport(input.body, {
                ...serviceAuth,
                encoding: 'application/json',
            });
            return {
                encoding: 'application/json',
                body: res.data,
            };
        },
    });
}
//# sourceMappingURL=createReport.js.map