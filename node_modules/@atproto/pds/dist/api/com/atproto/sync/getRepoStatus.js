"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const account_manager_1 = require("../../../../account-manager/account-manager");
const util_1 = require("./util");
function default_1(server, ctx) {
    server.com.atproto.sync.getRepoStatus({
        handler: async ({ params }) => {
            const { did } = params;
            const account = await (0, util_1.assertRepoAvailability)(ctx, did, true);
            const { active, status } = (0, account_manager_1.formatAccountStatus)(account);
            let rev = undefined;
            if (active) {
                const root = await ctx.actorStore.read(did, (store) => store.repo.storage.getRootDetailed());
                rev = root.rev;
            }
            return {
                encoding: 'application/json',
                body: {
                    did,
                    active,
                    status,
                    rev,
                },
            };
        },
    });
}
//# sourceMappingURL=getRepoStatus.js.map