"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const xrpc_server_1 = require("@atproto/xrpc-server");
const lexicons_1 = require("../../../../lexicon/lexicons");
const proxy_1 = require("../../../proxy");
function default_1(server, ctx) {
    server.com.atproto.admin.sendEmail({
        auth: ctx.authVerifier.moderator,
        handler: async ({ input, req }) => {
            const { content, recipientDid, subject = 'Message via your PDS', } = input.body;
            const account = await ctx.accountManager.getAccount(recipientDid, {
                includeDeactivated: true,
                includeTakenDown: true,
            });
            if (!account) {
                throw new xrpc_server_1.InvalidRequestError('Recipient not found');
            }
            if (ctx.entrywayAgent) {
                return (0, proxy_1.resultPassthru)(await ctx.entrywayAgent.com.atproto.admin.sendEmail(input.body, await ctx.entrywayAuthHeaders(req, recipientDid, lexicons_1.ids.ComAtprotoAdminSendEmail)));
            }
            if (!account.email) {
                throw new xrpc_server_1.InvalidRequestError('account does not have an email address');
            }
            await ctx.moderationMailer.send({ content }, { subject, to: account.email });
            return {
                encoding: 'application/json',
                body: { sent: true },
            };
        },
    });
}
//# sourceMappingURL=sendEmail.js.map