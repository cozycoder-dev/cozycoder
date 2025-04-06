"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const auth_verifier_1 = require("../../../../auth-verifier");
function default_1(server, ctx) {
    if (!ctx.bskyAppView)
        return;
    server.app.bsky.actor.getPreferences({
        auth: ctx.authVerifier.accessStandard({
            additional: [auth_verifier_1.AuthScope.Takendown],
        }),
        handler: async ({ auth }) => {
            const requester = auth.credentials.did;
            const preferences = await ctx.actorStore.read(requester, (store) => store.pref.getPreferences('app.bsky', auth.credentials.scope));
            return {
                encoding: 'application/json',
                body: { preferences },
            };
        },
    });
}
//# sourceMappingURL=getPreferences.js.map