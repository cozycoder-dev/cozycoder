/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult } from '@atproto/lexicon';
import { type $Typed } from '../../../../util';
import type * as AppBskyActorDefs from '../actor/defs.js';
import type * as AppBskyEmbedImages from '../embed/images.js';
import type * as AppBskyEmbedVideo from '../embed/video.js';
import type * as AppBskyEmbedExternal from '../embed/external.js';
import type * as AppBskyEmbedRecord from '../embed/record.js';
import type * as AppBskyEmbedRecordWithMedia from '../embed/recordWithMedia.js';
import type * as ComAtprotoLabelDefs from '../../../com/atproto/label/defs.js';
import type * as AppBskyRichtextFacet from '../richtext/facet.js';
import type * as AppBskyGraphDefs from '../graph/defs.js';
export interface PostView {
    $type?: 'app.bsky.feed.defs#postView';
    uri: string;
    cid: string;
    author: AppBskyActorDefs.ProfileViewBasic;
    record: {
        [_ in string]: unknown;
    };
    embed?: $Typed<AppBskyEmbedImages.View> | $Typed<AppBskyEmbedVideo.View> | $Typed<AppBskyEmbedExternal.View> | $Typed<AppBskyEmbedRecord.View> | $Typed<AppBskyEmbedRecordWithMedia.View> | {
        $type: string;
    };
    replyCount?: number;
    repostCount?: number;
    likeCount?: number;
    quoteCount?: number;
    indexedAt: string;
    viewer?: ViewerState;
    labels?: ComAtprotoLabelDefs.Label[];
    threadgate?: ThreadgateView;
}
export declare function isPostView<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.feed.defs", "postView">;
export declare function validatePostView<V>(v: V): ValidationResult<PostView & V>;
/** Metadata about the requesting account's relationship with the subject content. Only has meaningful content for authed requests. */
export interface ViewerState {
    $type?: 'app.bsky.feed.defs#viewerState';
    repost?: string;
    like?: string;
    threadMuted?: boolean;
    replyDisabled?: boolean;
    embeddingDisabled?: boolean;
    pinned?: boolean;
}
export declare function isViewerState<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.feed.defs", "viewerState">;
export declare function validateViewerState<V>(v: V): ValidationResult<ViewerState & V>;
/** Metadata about this post within the context of the thread it is in. */
export interface ThreadContext {
    $type?: 'app.bsky.feed.defs#threadContext';
    rootAuthorLike?: string;
}
export declare function isThreadContext<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.feed.defs", "threadContext">;
export declare function validateThreadContext<V>(v: V): ValidationResult<ThreadContext & V>;
export interface FeedViewPost {
    $type?: 'app.bsky.feed.defs#feedViewPost';
    post: PostView;
    reply?: ReplyRef;
    reason?: $Typed<ReasonRepost> | $Typed<ReasonPin> | {
        $type: string;
    };
    /** Context provided by feed generator that may be passed back alongside interactions. */
    feedContext?: string;
}
export declare function isFeedViewPost<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.feed.defs", "feedViewPost">;
export declare function validateFeedViewPost<V>(v: V): ValidationResult<FeedViewPost & V>;
export interface ReplyRef {
    $type?: 'app.bsky.feed.defs#replyRef';
    root: $Typed<PostView> | $Typed<NotFoundPost> | $Typed<BlockedPost> | {
        $type: string;
    };
    parent: $Typed<PostView> | $Typed<NotFoundPost> | $Typed<BlockedPost> | {
        $type: string;
    };
    grandparentAuthor?: AppBskyActorDefs.ProfileViewBasic;
}
export declare function isReplyRef<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.feed.defs", "replyRef">;
export declare function validateReplyRef<V>(v: V): ValidationResult<ReplyRef & V>;
export interface ReasonRepost {
    $type?: 'app.bsky.feed.defs#reasonRepost';
    by: AppBskyActorDefs.ProfileViewBasic;
    indexedAt: string;
}
export declare function isReasonRepost<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.feed.defs", "reasonRepost">;
export declare function validateReasonRepost<V>(v: V): ValidationResult<ReasonRepost & V>;
export interface ReasonPin {
    $type?: 'app.bsky.feed.defs#reasonPin';
}
export declare function isReasonPin<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.feed.defs", "reasonPin">;
export declare function validateReasonPin<V>(v: V): ValidationResult<ReasonPin & V>;
export interface ThreadViewPost {
    $type?: 'app.bsky.feed.defs#threadViewPost';
    post: PostView;
    parent?: $Typed<ThreadViewPost> | $Typed<NotFoundPost> | $Typed<BlockedPost> | {
        $type: string;
    };
    replies?: ($Typed<ThreadViewPost> | $Typed<NotFoundPost> | $Typed<BlockedPost> | {
        $type: string;
    })[];
    threadContext?: ThreadContext;
}
export declare function isThreadViewPost<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.feed.defs", "threadViewPost">;
export declare function validateThreadViewPost<V>(v: V): ValidationResult<ThreadViewPost & V>;
export interface NotFoundPost {
    $type?: 'app.bsky.feed.defs#notFoundPost';
    uri: string;
    notFound: true;
}
export declare function isNotFoundPost<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.feed.defs", "notFoundPost">;
export declare function validateNotFoundPost<V>(v: V): ValidationResult<NotFoundPost & V>;
export interface BlockedPost {
    $type?: 'app.bsky.feed.defs#blockedPost';
    uri: string;
    blocked: true;
    author: BlockedAuthor;
}
export declare function isBlockedPost<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.feed.defs", "blockedPost">;
export declare function validateBlockedPost<V>(v: V): ValidationResult<BlockedPost & V>;
export interface BlockedAuthor {
    $type?: 'app.bsky.feed.defs#blockedAuthor';
    did: string;
    viewer?: AppBskyActorDefs.ViewerState;
}
export declare function isBlockedAuthor<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.feed.defs", "blockedAuthor">;
export declare function validateBlockedAuthor<V>(v: V): ValidationResult<BlockedAuthor & V>;
export interface GeneratorView {
    $type?: 'app.bsky.feed.defs#generatorView';
    uri: string;
    cid: string;
    did: string;
    creator: AppBskyActorDefs.ProfileView;
    displayName: string;
    description?: string;
    descriptionFacets?: AppBskyRichtextFacet.Main[];
    avatar?: string;
    likeCount?: number;
    acceptsInteractions?: boolean;
    labels?: ComAtprotoLabelDefs.Label[];
    viewer?: GeneratorViewerState;
    contentMode?: 'app.bsky.feed.defs#contentModeUnspecified' | 'app.bsky.feed.defs#contentModeVideo' | (string & {});
    indexedAt: string;
}
export declare function isGeneratorView<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.feed.defs", "generatorView">;
export declare function validateGeneratorView<V>(v: V): ValidationResult<GeneratorView & V>;
export interface GeneratorViewerState {
    $type?: 'app.bsky.feed.defs#generatorViewerState';
    like?: string;
}
export declare function isGeneratorViewerState<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.feed.defs", "generatorViewerState">;
export declare function validateGeneratorViewerState<V>(v: V): ValidationResult<GeneratorViewerState & V>;
export interface SkeletonFeedPost {
    $type?: 'app.bsky.feed.defs#skeletonFeedPost';
    post: string;
    reason?: $Typed<SkeletonReasonRepost> | $Typed<SkeletonReasonPin> | {
        $type: string;
    };
    /** Context that will be passed through to client and may be passed to feed generator back alongside interactions. */
    feedContext?: string;
}
export declare function isSkeletonFeedPost<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.feed.defs", "skeletonFeedPost">;
export declare function validateSkeletonFeedPost<V>(v: V): ValidationResult<SkeletonFeedPost & V>;
export interface SkeletonReasonRepost {
    $type?: 'app.bsky.feed.defs#skeletonReasonRepost';
    repost: string;
}
export declare function isSkeletonReasonRepost<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.feed.defs", "skeletonReasonRepost">;
export declare function validateSkeletonReasonRepost<V>(v: V): ValidationResult<SkeletonReasonRepost & V>;
export interface SkeletonReasonPin {
    $type?: 'app.bsky.feed.defs#skeletonReasonPin';
}
export declare function isSkeletonReasonPin<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.feed.defs", "skeletonReasonPin">;
export declare function validateSkeletonReasonPin<V>(v: V): ValidationResult<SkeletonReasonPin & V>;
export interface ThreadgateView {
    $type?: 'app.bsky.feed.defs#threadgateView';
    uri?: string;
    cid?: string;
    record?: {
        [_ in string]: unknown;
    };
    lists?: AppBskyGraphDefs.ListViewBasic[];
}
export declare function isThreadgateView<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.feed.defs", "threadgateView">;
export declare function validateThreadgateView<V>(v: V): ValidationResult<ThreadgateView & V>;
export interface Interaction {
    $type?: 'app.bsky.feed.defs#interaction';
    item?: string;
    event?: 'app.bsky.feed.defs#requestLess' | 'app.bsky.feed.defs#requestMore' | 'app.bsky.feed.defs#clickthroughItem' | 'app.bsky.feed.defs#clickthroughAuthor' | 'app.bsky.feed.defs#clickthroughReposter' | 'app.bsky.feed.defs#clickthroughEmbed' | 'app.bsky.feed.defs#interactionSeen' | 'app.bsky.feed.defs#interactionLike' | 'app.bsky.feed.defs#interactionRepost' | 'app.bsky.feed.defs#interactionReply' | 'app.bsky.feed.defs#interactionQuote' | 'app.bsky.feed.defs#interactionShare' | (string & {});
    /** Context on a feed item that was originally supplied by the feed generator on getFeedSkeleton. */
    feedContext?: string;
}
export declare function isInteraction<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.feed.defs", "interaction">;
export declare function validateInteraction<V>(v: V): ValidationResult<Interaction & V>;
/** Request that less content like the given feed item be shown in the feed */
export declare const REQUESTLESS = "app.bsky.feed.defs#requestLess";
/** Request that more content like the given feed item be shown in the feed */
export declare const REQUESTMORE = "app.bsky.feed.defs#requestMore";
/** User clicked through to the feed item */
export declare const CLICKTHROUGHITEM = "app.bsky.feed.defs#clickthroughItem";
/** User clicked through to the author of the feed item */
export declare const CLICKTHROUGHAUTHOR = "app.bsky.feed.defs#clickthroughAuthor";
/** User clicked through to the reposter of the feed item */
export declare const CLICKTHROUGHREPOSTER = "app.bsky.feed.defs#clickthroughReposter";
/** User clicked through to the embedded content of the feed item */
export declare const CLICKTHROUGHEMBED = "app.bsky.feed.defs#clickthroughEmbed";
/** Declares the feed generator returns any types of posts. */
export declare const CONTENTMODEUNSPECIFIED = "app.bsky.feed.defs#contentModeUnspecified";
/** Declares the feed generator returns posts containing app.bsky.embed.video embeds. */
export declare const CONTENTMODEVIDEO = "app.bsky.feed.defs#contentModeVideo";
/** Feed item was seen by user */
export declare const INTERACTIONSEEN = "app.bsky.feed.defs#interactionSeen";
/** User liked the feed item */
export declare const INTERACTIONLIKE = "app.bsky.feed.defs#interactionLike";
/** User reposted the feed item */
export declare const INTERACTIONREPOST = "app.bsky.feed.defs#interactionRepost";
/** User replied to the feed item */
export declare const INTERACTIONREPLY = "app.bsky.feed.defs#interactionReply";
/** User quoted the feed item */
export declare const INTERACTIONQUOTE = "app.bsky.feed.defs#interactionQuote";
/** User shared the feed item */
export declare const INTERACTIONSHARE = "app.bsky.feed.defs#interactionShare";
//# sourceMappingURL=defs.d.ts.map