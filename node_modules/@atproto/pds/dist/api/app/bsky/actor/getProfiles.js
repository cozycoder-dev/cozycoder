"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const read_after_write_1 = require("../../../../read-after-write");
function default_1(server, ctx) {
    if (!ctx.bskyAppView)
        return;
    server.app.bsky.actor.getProfiles({
        auth: ctx.authVerifier.accessStandard(),
        handler: async (reqCtx) => {
            return (0, read_after_write_1.pipethroughReadAfterWrite)(ctx, reqCtx, getProfilesMunge);
        },
    });
}
const getProfilesMunge = async (localViewer, original, local, requester) => {
    const localProf = local.profile;
    if (!localProf)
        return original;
    const profiles = original.profiles.map((prof) => {
        if (prof.did !== requester)
            return prof;
        return localViewer.updateProfileDetailed(prof, localProf.record);
    });
    return {
        ...original,
        profiles,
    };
};
//# sourceMappingURL=getProfiles.js.map