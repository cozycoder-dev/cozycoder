"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const oauth_provider_1 = require("@atproto/oauth-provider");
const syntax_1 = require("@atproto/syntax");
const lexicons_1 = require("../../../../lexicon/lexicons");
const pipethrough_1 = require("../../../../pipethrough");
function default_1(server, ctx) {
    const { bskyAppView } = ctx;
    if (!bskyAppView)
        return;
    server.app.bsky.feed.getFeed({
        auth: ctx.authVerifier.accessStandard(),
        handler: async ({ params, auth, req }) => {
            const requester = auth.credentials.did;
            const feedUrl = new syntax_1.AtUri(params.feed);
            const { data } = await bskyAppView.agent.com.atproto.repo.getRecord({
                repo: feedUrl.hostname,
                collection: feedUrl.collection,
                rkey: feedUrl.rkey,
            });
            const feedDid = data.value['did'];
            if (typeof feedDid !== 'string') {
                throw new oauth_provider_1.InvalidRequestError('could not resolve feed did', 'UnknownFeed');
            }
            return (0, pipethrough_1.pipethrough)(ctx, req, {
                iss: requester,
                aud: feedDid,
                lxm: lexicons_1.ids.AppBskyFeedGetFeedSkeleton,
            });
        },
    });
}
//# sourceMappingURL=getFeed.js.map