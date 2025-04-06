"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const syntax_1 = require("@atproto/syntax");
const xrpc_server_1 = require("@atproto/xrpc-server");
const account_manager_1 = require("../../../../account-manager/account-manager");
const auth_verifier_1 = require("../../../../auth-verifier");
const proxy_1 = require("../../../proxy");
const util_1 = require("./util");
function default_1(server, ctx) {
    server.com.atproto.server.getSession({
        auth: ctx.authVerifier.accessStandard({
            additional: [auth_verifier_1.AuthScope.SignupQueued],
        }),
        handler: async ({ auth, req }) => {
            if (ctx.entrywayAgent) {
                return (0, proxy_1.resultPassthru)(await ctx.entrywayAgent.com.atproto.server.getSession(undefined, ctx.entrywayPassthruHeaders(req)));
            }
            const did = auth.credentials.did;
            const [user, didDoc] = await Promise.all([
                ctx.accountManager.getAccount(did, { includeDeactivated: true }),
                (0, util_1.didDocForSession)(ctx, did),
            ]);
            if (!user) {
                throw new xrpc_server_1.InvalidRequestError(`Could not find user info for account: ${did}`);
            }
            const { status, active } = (0, account_manager_1.formatAccountStatus)(user);
            return {
                encoding: 'application/json',
                body: {
                    handle: user.handle ?? syntax_1.INVALID_HANDLE,
                    did: user.did,
                    email: user.email ?? undefined,
                    didDoc,
                    emailConfirmed: !!user.emailConfirmedAt,
                    active,
                    status,
                },
            };
        },
    });
}
//# sourceMappingURL=getSession.js.map