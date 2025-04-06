"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const account_manager_1 = require("../../../../account-manager/account-manager");
function default_1(server, ctx) {
    server.com.atproto.admin.deleteAccount({
        auth: ctx.authVerifier.adminToken,
        handler: async ({ input }) => {
            const { did } = input.body;
            await ctx.actorStore.destroy(did);
            await ctx.accountManager.deleteAccount(did);
            const accountSeq = await ctx.sequencer.sequenceAccountEvt(did, account_manager_1.AccountStatus.Deleted);
            await ctx.sequencer.deleteAllForUser(did, [accountSeq]);
        },
    });
}
//# sourceMappingURL=deleteAccount.js.map