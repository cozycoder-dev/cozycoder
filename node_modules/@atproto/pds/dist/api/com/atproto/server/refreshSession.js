"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const syntax_1 = require("@atproto/syntax");
const xrpc_server_1 = require("@atproto/xrpc-server");
const account_manager_1 = require("../../../../account-manager/account-manager");
const util_1 = require("../../../../db/util");
const proxy_1 = require("../../../proxy");
const util_2 = require("./util");
function default_1(server, ctx) {
    server.com.atproto.server.refreshSession({
        auth: ctx.authVerifier.refresh,
        handler: async ({ auth, req }) => {
            const did = auth.credentials.did;
            const user = await ctx.accountManager.getAccount(did, {
                includeDeactivated: true,
                includeTakenDown: true,
            });
            if (!user) {
                throw new xrpc_server_1.InvalidRequestError(`Could not find user info for account: ${did}`);
            }
            if ((0, util_1.softDeleted)(user)) {
                throw new xrpc_server_1.AuthRequiredError('Account has been taken down', 'AccountTakedown');
            }
            if (ctx.entrywayAgent) {
                return (0, proxy_1.resultPassthru)(await ctx.entrywayAgent.com.atproto.server.refreshSession(undefined, ctx.entrywayPassthruHeaders(req)));
            }
            const [didDoc, rotated] = await Promise.all([
                (0, util_2.didDocForSession)(ctx, user.did),
                ctx.accountManager.rotateRefreshToken(auth.credentials.tokenId),
            ]);
            if (rotated === null) {
                throw new xrpc_server_1.InvalidRequestError('Token has been revoked', 'ExpiredToken');
            }
            const { status, active } = (0, account_manager_1.formatAccountStatus)(user);
            return {
                encoding: 'application/json',
                body: {
                    did: user.did,
                    didDoc,
                    handle: user.handle ?? syntax_1.INVALID_HANDLE,
                    accessJwt: rotated.accessJwt,
                    refreshJwt: rotated.refreshJwt,
                    active,
                    status,
                },
            };
        },
    });
}
//# sourceMappingURL=refreshSession.js.map