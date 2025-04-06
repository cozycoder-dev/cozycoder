"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const node_assert_1 = __importDefault(require("node:assert"));
const syntax_1 = require("@atproto/syntax");
const xrpc_1 = require("@atproto/xrpc");
const lexicons_1 = require("../../../../lexicon/lexicons");
const defs_1 = require("../../../../lexicon/types/app/bsky/feed/defs");
const read_after_write_1 = require("../../../../read-after-write");
function default_1(server, ctx) {
    if (!ctx.bskyAppView)
        return;
    server.app.bsky.feed.getPostThread({
        auth: ctx.authVerifier.accessStandard(),
        handler: async (reqCtx) => {
            try {
                return await (0, read_after_write_1.pipethroughReadAfterWrite)(ctx, reqCtx, getPostThreadMunge);
            }
            catch (err) {
                if (err instanceof xrpc_1.XRPCError && err.error === 'NotFound') {
                    const { auth, params } = reqCtx;
                    const requester = auth.credentials.did;
                    const rev = err.headers && (0, read_after_write_1.getRepoRev)(err.headers);
                    if (!rev)
                        throw err;
                    const uri = new syntax_1.AtUri(params.uri);
                    if (!uri.hostname.startsWith('did:')) {
                        const account = await ctx.accountManager.getAccount(uri.hostname);
                        if (account) {
                            uri.hostname = account.did;
                        }
                    }
                    if (uri.hostname !== requester)
                        throw err;
                    const local = await ctx.actorStore.read(requester, (store) => {
                        const localViewer = ctx.localViewer(store);
                        return readAfterWriteNotFound(ctx, localViewer, params, requester, rev, uri);
                    });
                    if (local === null) {
                        throw err;
                    }
                    else {
                        return (0, read_after_write_1.formatMungedResponse)(local.data, local.lag);
                    }
                }
                else {
                    throw err;
                }
            }
        },
    });
}
// READ AFTER WRITE
// ----------------
const getPostThreadMunge = async (localViewer, original, local) => {
    // @TODO if is NotFoundPost, handle similarly to error
    // @NOTE not necessary right now as we never return those for the requested uri
    if (!(0, defs_1.isThreadViewPost)(original.thread)) {
        return original;
    }
    const thread = await addPostsToThread(localViewer, original.thread, local.posts);
    return {
        ...original,
        thread,
    };
};
const addPostsToThread = async (localViewer, original, posts) => {
    const inThread = findPostsInThread(original, posts);
    if (inThread.length === 0)
        return original;
    let thread = original;
    for (const record of inThread) {
        thread = await insertIntoThreadReplies(localViewer, thread, record);
    }
    return thread;
};
const findPostsInThread = (thread, posts) => {
    return posts.filter((post) => {
        const rootUri = post.record.reply?.root.uri;
        if (!rootUri)
            return false;
        if (rootUri === thread.post.uri)
            return true;
        return thread.post.record.reply?.root.uri === rootUri;
    });
};
const insertIntoThreadReplies = async (localViewer, view, descript) => {
    if (descript.record.reply?.parent.uri === view.post.uri) {
        const postView = await threadPostView(localViewer, descript);
        if (!postView)
            return view;
        const replies = [postView, ...(view.replies ?? [])];
        return {
            ...view,
            replies,
        };
    }
    if (!view.replies)
        return view;
    const replies = await Promise.all(view.replies.map(async (reply) => (0, defs_1.isThreadViewPost)(reply)
        ? await insertIntoThreadReplies(localViewer, reply, descript)
        : reply));
    return {
        ...view,
        replies,
    };
};
const threadPostView = async (localViewer, descript) => {
    const postView = await localViewer.getPost(descript);
    if (!postView)
        return null;
    return {
        $type: 'app.bsky.feed.defs#threadViewPost',
        post: postView,
    };
};
// Read after write on error
// ---------------------
const readAfterWriteNotFound = async (ctx, localViewer, params, requester, rev, resolvedUri) => {
    if (resolvedUri.hostname !== requester) {
        return null;
    }
    const local = await localViewer.getRecordsSinceRev(rev);
    const found = local.posts.find((p) => p.uri.toString() === resolvedUri.toString());
    if (!found)
        return null;
    let thread = await threadPostView(localViewer, found);
    if (!thread)
        return null;
    const rest = local.posts.filter((p) => p.uri.toString() !== resolvedUri.toString());
    thread = await addPostsToThread(localViewer, thread, rest);
    const highestParent = getHighestParent(thread);
    if (highestParent) {
        try {
            (0, node_assert_1.default)(ctx.bskyAppView);
            const parentsRes = await ctx.bskyAppView.agent.app.bsky.feed.getPostThread({ uri: highestParent, parentHeight: params.parentHeight, depth: 0 }, await ctx.appviewAuthHeaders(requester, lexicons_1.ids.AppBskyFeedGetPostThread));
            thread.parent = parentsRes.data.thread;
        }
        catch (err) {
            // do nothing
        }
    }
    return {
        data: {
            thread,
        },
        lag: (0, read_after_write_1.getLocalLag)(local),
    };
};
const getHighestParent = (thread) => {
    if ((0, defs_1.isThreadViewPost)(thread.parent)) {
        return getHighestParent(thread.parent);
    }
    else {
        return thread.post.record.reply?.parent.uri;
    }
};
//# sourceMappingURL=getPostThread.js.map