"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const common_1 = require("@atproto/common");
const xrpc_server_1 = require("@atproto/xrpc-server");
const account_manager_1 = require("../../../../account-manager/account-manager");
function default_1(server, ctx) {
    server.com.atproto.server.deleteAccount({
        rateLimit: {
            durationMs: 5 * common_1.MINUTE,
            points: 50,
        },
        handler: async ({ input, req }) => {
            const { did, password, token } = input.body;
            const account = await ctx.accountManager.getAccount(did, {
                includeDeactivated: true,
                includeTakenDown: true,
            });
            if (!account) {
                throw new xrpc_server_1.InvalidRequestError('account not found');
            }
            if (ctx.entrywayAgent) {
                await ctx.entrywayAgent.com.atproto.server.deleteAccount(input.body, ctx.entrywayPassthruHeaders(req));
                return;
            }
            const validPass = await ctx.accountManager.verifyAccountPassword(did, password);
            if (!validPass) {
                throw new xrpc_server_1.AuthRequiredError('Invalid did or password');
            }
            await ctx.accountManager.assertValidEmailToken(did, 'delete_account', token);
            await ctx.actorStore.destroy(did);
            await ctx.accountManager.deleteAccount(did);
            const accountSeq = await ctx.sequencer.sequenceAccountEvt(did, account_manager_1.AccountStatus.Deleted);
            await ctx.sequencer.deleteAllForUser(did, [accountSeq]);
        },
    });
}
//# sourceMappingURL=deleteAccount.js.map