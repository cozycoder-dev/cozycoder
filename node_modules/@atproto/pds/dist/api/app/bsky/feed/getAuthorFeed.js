"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const defs_1 = require("../../../../lexicon/types/app/bsky/feed/defs");
const read_after_write_1 = require("../../../../read-after-write");
function default_1(server, ctx) {
    if (!ctx.bskyAppView)
        return;
    server.app.bsky.feed.getAuthorFeed({
        auth: ctx.authVerifier.accessStandard(),
        handler: async (reqCtx) => {
            return (0, read_after_write_1.pipethroughReadAfterWrite)(ctx, reqCtx, getAuthorMunge);
        },
    });
}
const getAuthorMunge = async (localViewer, original, local, requester) => {
    const localProf = local.profile;
    // only munge on own feed
    if (!isUsersFeed(original, requester)) {
        return original;
    }
    let feed = original.feed;
    // first update any out of date profile pictures in feed
    if (localProf) {
        feed = feed.map((item) => {
            if (item.post.author.did === requester) {
                return {
                    ...item,
                    post: {
                        ...item.post,
                        author: localViewer.updateProfileViewBasic(item.post.author, localProf.record),
                    },
                };
            }
            else {
                return item;
            }
        });
    }
    feed = await localViewer.formatAndInsertPostsInFeed(feed, local.posts);
    return {
        ...original,
        feed,
    };
};
const isUsersFeed = (feed, requester) => {
    const first = feed.feed.at(0);
    if (!first)
        return false;
    if (!first.reason && first.post.author.did === requester)
        return true;
    if ((0, defs_1.isReasonRepost)(first.reason) && first.reason.by.did === requester)
        return true;
    return false;
};
//# sourceMappingURL=getAuthorFeed.js.map