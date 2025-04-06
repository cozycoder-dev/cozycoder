"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const xrpc_server_1 = require("@atproto/xrpc-server");
const lexicons_1 = require("../../../../lexicon/lexicons");
function default_1(server, ctx) {
    server.com.atproto.server.confirmEmail({
        auth: ctx.authVerifier.accessStandard({ checkTakedown: true }),
        handler: async ({ auth, input, req }) => {
            const did = auth.credentials.did;
            const user = await ctx.accountManager.getAccount(did, {
                includeDeactivated: true,
            });
            if (!user) {
                throw new xrpc_server_1.InvalidRequestError('user not found', 'AccountNotFound');
            }
            if (ctx.entrywayAgent) {
                await ctx.entrywayAgent.com.atproto.server.confirmEmail(input.body, await ctx.entrywayAuthHeaders(req, auth.credentials.did, lexicons_1.ids.ComAtprotoServerConfirmEmail));
                return;
            }
            const { token, email } = input.body;
            if (user.email !== email.toLowerCase()) {
                throw new xrpc_server_1.InvalidRequestError('invalid email', 'InvalidEmail');
            }
            await ctx.accountManager.confirmEmail({ did, token });
        },
    });
}
//# sourceMappingURL=confirmEmail.js.map