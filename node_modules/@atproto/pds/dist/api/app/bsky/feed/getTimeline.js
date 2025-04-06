"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const read_after_write_1 = require("../../../../read-after-write");
function default_1(server, ctx) {
    if (!ctx.bskyAppView)
        return;
    server.app.bsky.feed.getTimeline({
        auth: ctx.authVerifier.accessStandard(),
        handler: async (reqCtx) => {
            return (0, read_after_write_1.pipethroughReadAfterWrite)(ctx, reqCtx, getTimelineMunge);
        },
    });
}
const getTimelineMunge = async (localViewer, original, local) => {
    const feed = await localViewer.formatAndInsertPostsInFeed([...original.feed], local.posts);
    return {
        ...original,
        feed,
    };
};
//# sourceMappingURL=getTimeline.js.map