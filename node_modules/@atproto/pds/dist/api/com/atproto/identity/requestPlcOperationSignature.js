"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const xrpc_server_1 = require("@atproto/xrpc-server");
const auth_verifier_1 = require("../../../../auth-verifier");
const lexicons_1 = require("../../../../lexicon/lexicons");
function default_1(server, ctx) {
    server.com.atproto.identity.requestPlcOperationSignature({
        auth: ctx.authVerifier.accessFull({ additional: [auth_verifier_1.AuthScope.Takendown] }),
        handler: async ({ auth, req }) => {
            if (ctx.entrywayAgent) {
                await ctx.entrywayAgent.com.atproto.identity.requestPlcOperationSignature(undefined, await ctx.entrywayAuthHeaders(req, auth.credentials.did, lexicons_1.ids.ComAtprotoIdentityRequestPlcOperationSignature));
                return;
            }
            const did = auth.credentials.did;
            const account = await ctx.accountManager.getAccount(did, {
                includeDeactivated: true,
                includeTakenDown: true,
            });
            if (!account) {
                throw new xrpc_server_1.InvalidRequestError('account not found');
            }
            else if (!account.email) {
                throw new xrpc_server_1.InvalidRequestError('account does not have an email address');
            }
            const token = await ctx.accountManager.createEmailToken(did, 'plc_operation');
            await ctx.mailer.sendPlcOperation({ token }, { to: account.email });
        },
    });
}
//# sourceMappingURL=requestPlcOperationSignature.js.map