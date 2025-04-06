"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const util_1 = require("./util");
function default_1(server, ctx) {
    server.com.atproto.admin.getAccountInfos({
        auth: ctx.authVerifier.moderator,
        handler: async ({ params }) => {
            const [accounts, invites, invitedBy] = await Promise.all([
                ctx.accountManager.getAccounts(params.dids, {
                    includeDeactivated: true,
                    includeTakenDown: true,
                }),
                ctx.accountManager.getAccountsInvitesCodes(params.dids),
                ctx.accountManager.getInvitedByForAccounts(params.dids),
            ]);
            const managesOwnInvites = !ctx.cfg.entryway;
            const infos = Array.from(accounts.values()).map((account) => {
                return (0, util_1.formatAccountInfo)(account, {
                    managesOwnInvites,
                    invitedBy,
                    invites,
                });
            });
            return {
                encoding: 'application/json',
                body: { infos },
            };
        },
    });
}
//# sourceMappingURL=getAccountInfos.js.map