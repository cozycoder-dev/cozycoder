"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const read_after_write_1 = require("../../../../read-after-write");
function default_1(server, ctx) {
    if (!ctx.bskyAppView)
        return;
    server.app.bsky.actor.getProfile({
        auth: ctx.authVerifier.accessStandard(),
        handler: async (reqCtx) => {
            return (0, read_after_write_1.pipethroughReadAfterWrite)(ctx, reqCtx, getProfileMunge);
        },
    });
}
const getProfileMunge = async (localViewer, original, local, requester) => {
    if (!local.profile)
        return original;
    if (original.did !== requester)
        return original;
    return localViewer.updateProfileDetailed(original, local.profile.record);
};
//# sourceMappingURL=getProfile.js.map