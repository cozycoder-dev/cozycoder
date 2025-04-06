"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const address_1 = require("@hapi/address");
const disposable_email_domains_js_1 = require("disposable-email-domains-js");
const xrpc_server_1 = require("@atproto/xrpc-server");
const account_1 = require("../../../../account-manager/helpers/account");
const lexicons_1 = require("../../../../lexicon/lexicons");
function default_1(server, ctx) {
    server.com.atproto.server.updateEmail({
        auth: ctx.authVerifier.accessFull({ checkTakedown: true }),
        handler: async ({ auth, input, req }) => {
            const did = auth.credentials.did;
            const { token, email } = input.body;
            if (!(0, address_1.isEmailValid)(email) || (0, disposable_email_domains_js_1.isDisposableEmail)(email)) {
                throw new xrpc_server_1.InvalidRequestError('This email address is not supported, please use a different email.');
            }
            const account = await ctx.accountManager.getAccount(did, {
                includeDeactivated: true,
            });
            if (!account) {
                throw new xrpc_server_1.InvalidRequestError('account not found');
            }
            if (ctx.entrywayAgent) {
                await ctx.entrywayAgent.com.atproto.server.updateEmail(input.body, await ctx.entrywayAuthHeaders(req, auth.credentials.did, lexicons_1.ids.ComAtprotoServerUpdateEmail));
                return;
            }
            // require valid token if account email is confirmed
            if (account.emailConfirmedAt) {
                if (!token) {
                    throw new xrpc_server_1.InvalidRequestError('confirmation token required', 'TokenRequired');
                }
                await ctx.accountManager.assertValidEmailToken(did, 'update_email', token);
            }
            try {
                await ctx.accountManager.updateEmail({ did, email });
            }
            catch (err) {
                if (err instanceof account_1.UserAlreadyExistsError) {
                    throw new xrpc_server_1.InvalidRequestError('This email address is already in use, please use a different email.');
                }
                else {
                    throw err;
                }
            }
        },
    });
}
//# sourceMappingURL=updateEmail.js.map