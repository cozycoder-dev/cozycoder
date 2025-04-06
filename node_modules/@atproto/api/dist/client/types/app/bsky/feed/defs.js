"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.INTERACTIONSHARE = exports.INTERACTIONQUOTE = exports.INTERACTIONREPLY = exports.INTERACTIONREPOST = exports.INTERACTIONLIKE = exports.INTERACTIONSEEN = exports.CONTENTMODEVIDEO = exports.CONTENTMODEUNSPECIFIED = exports.CLICKTHROUGHEMBED = exports.CLICKTHROUGHREPOSTER = exports.CLICKTHROUGHAUTHOR = exports.CLICKTHROUGHITEM = exports.REQUESTMORE = exports.REQUESTLESS = void 0;
exports.isPostView = isPostView;
exports.validatePostView = validatePostView;
exports.isViewerState = isViewerState;
exports.validateViewerState = validateViewerState;
exports.isThreadContext = isThreadContext;
exports.validateThreadContext = validateThreadContext;
exports.isFeedViewPost = isFeedViewPost;
exports.validateFeedViewPost = validateFeedViewPost;
exports.isReplyRef = isReplyRef;
exports.validateReplyRef = validateReplyRef;
exports.isReasonRepost = isReasonRepost;
exports.validateReasonRepost = validateReasonRepost;
exports.isReasonPin = isReasonPin;
exports.validateReasonPin = validateReasonPin;
exports.isThreadViewPost = isThreadViewPost;
exports.validateThreadViewPost = validateThreadViewPost;
exports.isNotFoundPost = isNotFoundPost;
exports.validateNotFoundPost = validateNotFoundPost;
exports.isBlockedPost = isBlockedPost;
exports.validateBlockedPost = validateBlockedPost;
exports.isBlockedAuthor = isBlockedAuthor;
exports.validateBlockedAuthor = validateBlockedAuthor;
exports.isGeneratorView = isGeneratorView;
exports.validateGeneratorView = validateGeneratorView;
exports.isGeneratorViewerState = isGeneratorViewerState;
exports.validateGeneratorViewerState = validateGeneratorViewerState;
exports.isSkeletonFeedPost = isSkeletonFeedPost;
exports.validateSkeletonFeedPost = validateSkeletonFeedPost;
exports.isSkeletonReasonRepost = isSkeletonReasonRepost;
exports.validateSkeletonReasonRepost = validateSkeletonReasonRepost;
exports.isSkeletonReasonPin = isSkeletonReasonPin;
exports.validateSkeletonReasonPin = validateSkeletonReasonPin;
exports.isThreadgateView = isThreadgateView;
exports.validateThreadgateView = validateThreadgateView;
exports.isInteraction = isInteraction;
exports.validateInteraction = validateInteraction;
const lexicons_1 = require("../../../../lexicons");
const util_1 = require("../../../../util");
const is$typed = util_1.is$typed, validate = lexicons_1.validate;
const id = 'app.bsky.feed.defs';
const hashPostView = 'postView';
function isPostView(v) {
    return is$typed(v, id, hashPostView);
}
function validatePostView(v) {
    return validate(v, id, hashPostView);
}
const hashViewerState = 'viewerState';
function isViewerState(v) {
    return is$typed(v, id, hashViewerState);
}
function validateViewerState(v) {
    return validate(v, id, hashViewerState);
}
const hashThreadContext = 'threadContext';
function isThreadContext(v) {
    return is$typed(v, id, hashThreadContext);
}
function validateThreadContext(v) {
    return validate(v, id, hashThreadContext);
}
const hashFeedViewPost = 'feedViewPost';
function isFeedViewPost(v) {
    return is$typed(v, id, hashFeedViewPost);
}
function validateFeedViewPost(v) {
    return validate(v, id, hashFeedViewPost);
}
const hashReplyRef = 'replyRef';
function isReplyRef(v) {
    return is$typed(v, id, hashReplyRef);
}
function validateReplyRef(v) {
    return validate(v, id, hashReplyRef);
}
const hashReasonRepost = 'reasonRepost';
function isReasonRepost(v) {
    return is$typed(v, id, hashReasonRepost);
}
function validateReasonRepost(v) {
    return validate(v, id, hashReasonRepost);
}
const hashReasonPin = 'reasonPin';
function isReasonPin(v) {
    return is$typed(v, id, hashReasonPin);
}
function validateReasonPin(v) {
    return validate(v, id, hashReasonPin);
}
const hashThreadViewPost = 'threadViewPost';
function isThreadViewPost(v) {
    return is$typed(v, id, hashThreadViewPost);
}
function validateThreadViewPost(v) {
    return validate(v, id, hashThreadViewPost);
}
const hashNotFoundPost = 'notFoundPost';
function isNotFoundPost(v) {
    return is$typed(v, id, hashNotFoundPost);
}
function validateNotFoundPost(v) {
    return validate(v, id, hashNotFoundPost);
}
const hashBlockedPost = 'blockedPost';
function isBlockedPost(v) {
    return is$typed(v, id, hashBlockedPost);
}
function validateBlockedPost(v) {
    return validate(v, id, hashBlockedPost);
}
const hashBlockedAuthor = 'blockedAuthor';
function isBlockedAuthor(v) {
    return is$typed(v, id, hashBlockedAuthor);
}
function validateBlockedAuthor(v) {
    return validate(v, id, hashBlockedAuthor);
}
const hashGeneratorView = 'generatorView';
function isGeneratorView(v) {
    return is$typed(v, id, hashGeneratorView);
}
function validateGeneratorView(v) {
    return validate(v, id, hashGeneratorView);
}
const hashGeneratorViewerState = 'generatorViewerState';
function isGeneratorViewerState(v) {
    return is$typed(v, id, hashGeneratorViewerState);
}
function validateGeneratorViewerState(v) {
    return validate(v, id, hashGeneratorViewerState);
}
const hashSkeletonFeedPost = 'skeletonFeedPost';
function isSkeletonFeedPost(v) {
    return is$typed(v, id, hashSkeletonFeedPost);
}
function validateSkeletonFeedPost(v) {
    return validate(v, id, hashSkeletonFeedPost);
}
const hashSkeletonReasonRepost = 'skeletonReasonRepost';
function isSkeletonReasonRepost(v) {
    return is$typed(v, id, hashSkeletonReasonRepost);
}
function validateSkeletonReasonRepost(v) {
    return validate(v, id, hashSkeletonReasonRepost);
}
const hashSkeletonReasonPin = 'skeletonReasonPin';
function isSkeletonReasonPin(v) {
    return is$typed(v, id, hashSkeletonReasonPin);
}
function validateSkeletonReasonPin(v) {
    return validate(v, id, hashSkeletonReasonPin);
}
const hashThreadgateView = 'threadgateView';
function isThreadgateView(v) {
    return is$typed(v, id, hashThreadgateView);
}
function validateThreadgateView(v) {
    return validate(v, id, hashThreadgateView);
}
const hashInteraction = 'interaction';
function isInteraction(v) {
    return is$typed(v, id, hashInteraction);
}
function validateInteraction(v) {
    return validate(v, id, hashInteraction);
}
/** Request that less content like the given feed item be shown in the feed */
exports.REQUESTLESS = `${id}#requestLess`;
/** Request that more content like the given feed item be shown in the feed */
exports.REQUESTMORE = `${id}#requestMore`;
/** User clicked through to the feed item */
exports.CLICKTHROUGHITEM = `${id}#clickthroughItem`;
/** User clicked through to the author of the feed item */
exports.CLICKTHROUGHAUTHOR = `${id}#clickthroughAuthor`;
/** User clicked through to the reposter of the feed item */
exports.CLICKTHROUGHREPOSTER = `${id}#clickthroughReposter`;
/** User clicked through to the embedded content of the feed item */
exports.CLICKTHROUGHEMBED = `${id}#clickthroughEmbed`;
/** Declares the feed generator returns any types of posts. */
exports.CONTENTMODEUNSPECIFIED = `${id}#contentModeUnspecified`;
/** Declares the feed generator returns posts containing app.bsky.embed.video embeds. */
exports.CONTENTMODEVIDEO = `${id}#contentModeVideo`;
/** Feed item was seen by user */
exports.INTERACTIONSEEN = `${id}#interactionSeen`;
/** User liked the feed item */
exports.INTERACTIONLIKE = `${id}#interactionLike`;
/** User reposted the feed item */
exports.INTERACTIONREPOST = `${id}#interactionRepost`;
/** User replied to the feed item */
exports.INTERACTIONREPLY = `${id}#interactionReply`;
/** User quoted the feed item */
exports.INTERACTIONQUOTE = `${id}#interactionQuote`;
/** User shared the feed item */
exports.INTERACTIONSHARE = `${id}#interactionShare`;
//# sourceMappingURL=defs.js.map