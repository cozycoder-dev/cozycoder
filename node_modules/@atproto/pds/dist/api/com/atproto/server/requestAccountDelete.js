"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const common_1 = require("@atproto/common");
const xrpc_server_1 = require("@atproto/xrpc-server");
const lexicons_1 = require("../../../../lexicon/lexicons");
function default_1(server, ctx) {
    server.com.atproto.server.requestAccountDelete({
        rateLimit: [
            {
                durationMs: common_1.DAY,
                points: 15,
                calcKey: ({ auth }) => auth.credentials.did,
            },
            {
                durationMs: common_1.HOUR,
                points: 5,
                calcKey: ({ auth }) => auth.credentials.did,
            },
        ],
        auth: ctx.authVerifier.accessFull({ checkTakedown: true }),
        handler: async ({ auth, req }) => {
            const did = auth.credentials.did;
            const account = await ctx.accountManager.getAccount(did, {
                includeDeactivated: true,
                includeTakenDown: true,
            });
            if (!account) {
                throw new xrpc_server_1.InvalidRequestError('account not found');
            }
            if (ctx.entrywayAgent) {
                await ctx.entrywayAgent.com.atproto.server.requestAccountDelete(undefined, await ctx.entrywayAuthHeaders(req, auth.credentials.did, lexicons_1.ids.ComAtprotoServerRequestAccountDelete));
                return;
            }
            if (!account.email) {
                throw new xrpc_server_1.InvalidRequestError('account does not have an email address');
            }
            const token = await ctx.accountManager.createEmailToken(did, 'delete_account');
            await ctx.mailer.sendAccountDelete({ token }, { to: account.email });
        },
    });
}
//# sourceMappingURL=requestAccountDelete.js.map