"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const xrpc_server_1 = require("@atproto/xrpc-server");
function default_1(server, ctx) {
    if (!ctx.bskyAppView)
        return;
    server.app.bsky.actor.putPreferences({
        auth: ctx.authVerifier.accessStandard({ checkTakedown: true }),
        handler: async ({ auth, input }) => {
            const { preferences } = input.body;
            const requester = auth.credentials.did;
            const checkedPreferences = [];
            for (const pref of preferences) {
                if (typeof pref.$type === 'string') {
                    checkedPreferences.push(pref);
                }
                else {
                    throw new xrpc_server_1.InvalidRequestError('Preference is missing a $type');
                }
            }
            await ctx.actorStore.transact(requester, async (actorTxn) => {
                await actorTxn.pref.putPreferences(checkedPreferences, 'app.bsky', auth.credentials.scope);
            });
        },
    });
}
//# sourceMappingURL=putPreferences.js.map