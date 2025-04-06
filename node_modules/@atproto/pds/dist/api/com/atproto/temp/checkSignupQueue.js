"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const auth_verifier_1 = require("../../../../auth-verifier");
const proxy_1 = require("../../../proxy");
// THIS IS A TEMPORARY UNSPECCED ROUTE
function default_1(server, ctx) {
    server.com.atproto.temp.checkSignupQueue({
        auth: ctx.authVerifier.accessStandard({
            additional: [auth_verifier_1.AuthScope.SignupQueued],
        }),
        handler: async ({ req }) => {
            if (!ctx.entrywayAgent) {
                return {
                    encoding: 'application/json',
                    body: {
                        activated: true,
                    },
                };
            }
            return (0, proxy_1.resultPassthru)(await ctx.entrywayAgent.com.atproto.temp.checkSignupQueue(undefined, ctx.entrywayPassthruHeaders(req)));
        },
    });
}
//# sourceMappingURL=checkSignupQueue.js.map