/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult } from '@atproto/lexicon';
import { type $Typed } from '../../../../util';
import type * as ComAtprotoLabelDefs from '../../../com/atproto/label/defs.js';
import type * as AppBskyGraphDefs from '../graph/defs.js';
import type * as ComAtprotoRepoStrongRef from '../../../com/atproto/repo/strongRef.js';
import type * as AppBskyFeedThreadgate from '../feed/threadgate.js';
import type * as AppBskyFeedPostgate from '../feed/postgate.js';
export interface ProfileViewBasic {
    $type?: 'app.bsky.actor.defs#profileViewBasic';
    did: string;
    handle: string;
    displayName?: string;
    avatar?: string;
    associated?: ProfileAssociated;
    viewer?: ViewerState;
    labels?: ComAtprotoLabelDefs.Label[];
    createdAt?: string;
}
export declare function isProfileViewBasic<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.actor.defs", "profileViewBasic">;
export declare function validateProfileViewBasic<V>(v: V): ValidationResult<ProfileViewBasic & V>;
export interface ProfileView {
    $type?: 'app.bsky.actor.defs#profileView';
    did: string;
    handle: string;
    displayName?: string;
    description?: string;
    avatar?: string;
    associated?: ProfileAssociated;
    indexedAt?: string;
    createdAt?: string;
    viewer?: ViewerState;
    labels?: ComAtprotoLabelDefs.Label[];
}
export declare function isProfileView<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.actor.defs", "profileView">;
export declare function validateProfileView<V>(v: V): ValidationResult<ProfileView & V>;
export interface ProfileViewDetailed {
    $type?: 'app.bsky.actor.defs#profileViewDetailed';
    did: string;
    handle: string;
    displayName?: string;
    description?: string;
    avatar?: string;
    banner?: string;
    followersCount?: number;
    followsCount?: number;
    postsCount?: number;
    associated?: ProfileAssociated;
    joinedViaStarterPack?: AppBskyGraphDefs.StarterPackViewBasic;
    indexedAt?: string;
    createdAt?: string;
    viewer?: ViewerState;
    labels?: ComAtprotoLabelDefs.Label[];
    pinnedPost?: ComAtprotoRepoStrongRef.Main;
}
export declare function isProfileViewDetailed<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.actor.defs", "profileViewDetailed">;
export declare function validateProfileViewDetailed<V>(v: V): ValidationResult<ProfileViewDetailed & V>;
export interface ProfileAssociated {
    $type?: 'app.bsky.actor.defs#profileAssociated';
    lists?: number;
    feedgens?: number;
    starterPacks?: number;
    labeler?: boolean;
    chat?: ProfileAssociatedChat;
}
export declare function isProfileAssociated<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.actor.defs", "profileAssociated">;
export declare function validateProfileAssociated<V>(v: V): ValidationResult<ProfileAssociated & V>;
export interface ProfileAssociatedChat {
    $type?: 'app.bsky.actor.defs#profileAssociatedChat';
    allowIncoming: 'all' | 'none' | 'following' | (string & {});
}
export declare function isProfileAssociatedChat<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.actor.defs", "profileAssociatedChat">;
export declare function validateProfileAssociatedChat<V>(v: V): ValidationResult<ProfileAssociatedChat & V>;
/** Metadata about the requesting account's relationship with the subject account. Only has meaningful content for authed requests. */
export interface ViewerState {
    $type?: 'app.bsky.actor.defs#viewerState';
    muted?: boolean;
    mutedByList?: AppBskyGraphDefs.ListViewBasic;
    blockedBy?: boolean;
    blocking?: string;
    blockingByList?: AppBskyGraphDefs.ListViewBasic;
    following?: string;
    followedBy?: string;
    knownFollowers?: KnownFollowers;
}
export declare function isViewerState<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.actor.defs", "viewerState">;
export declare function validateViewerState<V>(v: V): ValidationResult<ViewerState & V>;
/** The subject's followers whom you also follow */
export interface KnownFollowers {
    $type?: 'app.bsky.actor.defs#knownFollowers';
    count: number;
    followers: ProfileViewBasic[];
}
export declare function isKnownFollowers<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.actor.defs", "knownFollowers">;
export declare function validateKnownFollowers<V>(v: V): ValidationResult<KnownFollowers & V>;
export type Preferences = ($Typed<AdultContentPref> | $Typed<ContentLabelPref> | $Typed<SavedFeedsPref> | $Typed<SavedFeedsPrefV2> | $Typed<PersonalDetailsPref> | $Typed<FeedViewPref> | $Typed<ThreadViewPref> | $Typed<InterestsPref> | $Typed<MutedWordsPref> | $Typed<HiddenPostsPref> | $Typed<BskyAppStatePref> | $Typed<LabelersPref> | $Typed<PostInteractionSettingsPref> | {
    $type: string;
})[];
export interface AdultContentPref {
    $type?: 'app.bsky.actor.defs#adultContentPref';
    enabled: boolean;
}
export declare function isAdultContentPref<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.actor.defs", "adultContentPref">;
export declare function validateAdultContentPref<V>(v: V): ValidationResult<AdultContentPref & V>;
export interface ContentLabelPref {
    $type?: 'app.bsky.actor.defs#contentLabelPref';
    /** Which labeler does this preference apply to? If undefined, applies globally. */
    labelerDid?: string;
    label: string;
    visibility: 'ignore' | 'show' | 'warn' | 'hide' | (string & {});
}
export declare function isContentLabelPref<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.actor.defs", "contentLabelPref">;
export declare function validateContentLabelPref<V>(v: V): ValidationResult<ContentLabelPref & V>;
export interface SavedFeed {
    $type?: 'app.bsky.actor.defs#savedFeed';
    id: string;
    type: 'feed' | 'list' | 'timeline' | (string & {});
    value: string;
    pinned: boolean;
}
export declare function isSavedFeed<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.actor.defs", "savedFeed">;
export declare function validateSavedFeed<V>(v: V): ValidationResult<SavedFeed & V>;
export interface SavedFeedsPrefV2 {
    $type?: 'app.bsky.actor.defs#savedFeedsPrefV2';
    items: SavedFeed[];
}
export declare function isSavedFeedsPrefV2<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.actor.defs", "savedFeedsPrefV2">;
export declare function validateSavedFeedsPrefV2<V>(v: V): ValidationResult<SavedFeedsPrefV2 & V>;
export interface SavedFeedsPref {
    $type?: 'app.bsky.actor.defs#savedFeedsPref';
    pinned: string[];
    saved: string[];
    timelineIndex?: number;
}
export declare function isSavedFeedsPref<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.actor.defs", "savedFeedsPref">;
export declare function validateSavedFeedsPref<V>(v: V): ValidationResult<SavedFeedsPref & V>;
export interface PersonalDetailsPref {
    $type?: 'app.bsky.actor.defs#personalDetailsPref';
    /** The birth date of account owner. */
    birthDate?: string;
}
export declare function isPersonalDetailsPref<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.actor.defs", "personalDetailsPref">;
export declare function validatePersonalDetailsPref<V>(v: V): ValidationResult<PersonalDetailsPref & V>;
export interface FeedViewPref {
    $type?: 'app.bsky.actor.defs#feedViewPref';
    /** The URI of the feed, or an identifier which describes the feed. */
    feed: string;
    /** Hide replies in the feed. */
    hideReplies?: boolean;
    /** Hide replies in the feed if they are not by followed users. */
    hideRepliesByUnfollowed: boolean;
    /** Hide replies in the feed if they do not have this number of likes. */
    hideRepliesByLikeCount?: number;
    /** Hide reposts in the feed. */
    hideReposts?: boolean;
    /** Hide quote posts in the feed. */
    hideQuotePosts?: boolean;
}
export declare function isFeedViewPref<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.actor.defs", "feedViewPref">;
export declare function validateFeedViewPref<V>(v: V): ValidationResult<FeedViewPref & V>;
export interface ThreadViewPref {
    $type?: 'app.bsky.actor.defs#threadViewPref';
    /** Sorting mode for threads. */
    sort?: 'oldest' | 'newest' | 'most-likes' | 'random' | 'hotness' | (string & {});
    /** Show followed users at the top of all replies. */
    prioritizeFollowedUsers?: boolean;
}
export declare function isThreadViewPref<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.actor.defs", "threadViewPref">;
export declare function validateThreadViewPref<V>(v: V): ValidationResult<ThreadViewPref & V>;
export interface InterestsPref {
    $type?: 'app.bsky.actor.defs#interestsPref';
    /** A list of tags which describe the account owner's interests gathered during onboarding. */
    tags: string[];
}
export declare function isInterestsPref<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.actor.defs", "interestsPref">;
export declare function validateInterestsPref<V>(v: V): ValidationResult<InterestsPref & V>;
export type MutedWordTarget = 'content' | 'tag' | (string & {});
/** A word that the account owner has muted. */
export interface MutedWord {
    $type?: 'app.bsky.actor.defs#mutedWord';
    id?: string;
    /** The muted word itself. */
    value: string;
    /** The intended targets of the muted word. */
    targets: MutedWordTarget[];
    /** Groups of users to apply the muted word to. If undefined, applies to all users. */
    actorTarget: 'all' | 'exclude-following' | (string & {});
    /** The date and time at which the muted word will expire and no longer be applied. */
    expiresAt?: string;
}
export declare function isMutedWord<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.actor.defs", "mutedWord">;
export declare function validateMutedWord<V>(v: V): ValidationResult<MutedWord & V>;
export interface MutedWordsPref {
    $type?: 'app.bsky.actor.defs#mutedWordsPref';
    /** A list of words the account owner has muted. */
    items: MutedWord[];
}
export declare function isMutedWordsPref<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.actor.defs", "mutedWordsPref">;
export declare function validateMutedWordsPref<V>(v: V): ValidationResult<MutedWordsPref & V>;
export interface HiddenPostsPref {
    $type?: 'app.bsky.actor.defs#hiddenPostsPref';
    /** A list of URIs of posts the account owner has hidden. */
    items: string[];
}
export declare function isHiddenPostsPref<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.actor.defs", "hiddenPostsPref">;
export declare function validateHiddenPostsPref<V>(v: V): ValidationResult<HiddenPostsPref & V>;
export interface LabelersPref {
    $type?: 'app.bsky.actor.defs#labelersPref';
    labelers: LabelerPrefItem[];
}
export declare function isLabelersPref<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.actor.defs", "labelersPref">;
export declare function validateLabelersPref<V>(v: V): ValidationResult<LabelersPref & V>;
export interface LabelerPrefItem {
    $type?: 'app.bsky.actor.defs#labelerPrefItem';
    did: string;
}
export declare function isLabelerPrefItem<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.actor.defs", "labelerPrefItem">;
export declare function validateLabelerPrefItem<V>(v: V): ValidationResult<LabelerPrefItem & V>;
/** A grab bag of state that's specific to the bsky.app program. Third-party apps shouldn't use this. */
export interface BskyAppStatePref {
    $type?: 'app.bsky.actor.defs#bskyAppStatePref';
    activeProgressGuide?: BskyAppProgressGuide;
    /** An array of tokens which identify nudges (modals, popups, tours, highlight dots) that should be shown to the user. */
    queuedNudges?: string[];
    /** Storage for NUXs the user has encountered. */
    nuxs?: Nux[];
}
export declare function isBskyAppStatePref<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.actor.defs", "bskyAppStatePref">;
export declare function validateBskyAppStatePref<V>(v: V): ValidationResult<BskyAppStatePref & V>;
/** If set, an active progress guide. Once completed, can be set to undefined. Should have unspecced fields tracking progress. */
export interface BskyAppProgressGuide {
    $type?: 'app.bsky.actor.defs#bskyAppProgressGuide';
    guide: string;
}
export declare function isBskyAppProgressGuide<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.actor.defs", "bskyAppProgressGuide">;
export declare function validateBskyAppProgressGuide<V>(v: V): ValidationResult<BskyAppProgressGuide & V>;
/** A new user experiences (NUX) storage object */
export interface Nux {
    $type?: 'app.bsky.actor.defs#nux';
    id: string;
    completed: boolean;
    /** Arbitrary data for the NUX. The structure is defined by the NUX itself. Limited to 300 characters. */
    data?: string;
    /** The date and time at which the NUX will expire and should be considered completed. */
    expiresAt?: string;
}
export declare function isNux<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.actor.defs", "nux">;
export declare function validateNux<V>(v: V): ValidationResult<Nux & V>;
/** Default post interaction settings for the account. These values should be applied as default values when creating new posts. These refs should mirror the threadgate and postgate records exactly. */
export interface PostInteractionSettingsPref {
    $type?: 'app.bsky.actor.defs#postInteractionSettingsPref';
    /** Matches threadgate record. List of rules defining who can reply to this users posts. If value is an empty array, no one can reply. If value is undefined, anyone can reply. */
    threadgateAllowRules?: ($Typed<AppBskyFeedThreadgate.MentionRule> | $Typed<AppBskyFeedThreadgate.FollowerRule> | $Typed<AppBskyFeedThreadgate.FollowingRule> | $Typed<AppBskyFeedThreadgate.ListRule> | {
        $type: string;
    })[];
    /** Matches postgate record. List of rules defining who can embed this users posts. If value is an empty array or is undefined, no particular rules apply and anyone can embed. */
    postgateEmbeddingRules?: ($Typed<AppBskyFeedPostgate.DisableRule> | {
        $type: string;
    })[];
}
export declare function isPostInteractionSettingsPref<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.actor.defs", "postInteractionSettingsPref">;
export declare function validatePostInteractionSettingsPref<V>(v: V): ValidationResult<PostInteractionSettingsPref & V>;
//# sourceMappingURL=defs.d.ts.map