/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult } from '@atproto/lexicon';
import { type $Typed } from '../../../../util';
export interface Record {
    $type: 'app.bsky.feed.threadgate';
    /** Reference (AT-URI) to the post record. */
    post: string;
    /** List of rules defining who can reply to this post. If value is an empty array, no one can reply. If value is undefined, anyone can reply. */
    allow?: ($Typed<MentionRule> | $Typed<FollowerRule> | $Typed<FollowingRule> | $Typed<ListRule> | {
        $type: string;
    })[];
    createdAt: string;
    /** List of hidden reply URIs. */
    hiddenReplies?: string[];
    [k: string]: unknown;
}
export declare function isRecord<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.feed.threadgate", "main">;
export declare function validateRecord<V>(v: V): ValidationResult<Record & V>;
/** Allow replies from actors mentioned in your post. */
export interface MentionRule {
    $type?: 'app.bsky.feed.threadgate#mentionRule';
}
export declare function isMentionRule<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.feed.threadgate", "mentionRule">;
export declare function validateMentionRule<V>(v: V): ValidationResult<MentionRule & V>;
/** Allow replies from actors who follow you. */
export interface FollowerRule {
    $type?: 'app.bsky.feed.threadgate#followerRule';
}
export declare function isFollowerRule<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.feed.threadgate", "followerRule">;
export declare function validateFollowerRule<V>(v: V): ValidationResult<FollowerRule & V>;
/** Allow replies from actors you follow. */
export interface FollowingRule {
    $type?: 'app.bsky.feed.threadgate#followingRule';
}
export declare function isFollowingRule<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.feed.threadgate", "followingRule">;
export declare function validateFollowingRule<V>(v: V): ValidationResult<FollowingRule & V>;
/** Allow replies from actors on a list. */
export interface ListRule {
    $type?: 'app.bsky.feed.threadgate#listRule';
    list: string;
}
export declare function isListRule<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.feed.threadgate", "listRule">;
export declare function validateListRule<V>(v: V): ValidationResult<ListRule & V>;
//# sourceMappingURL=threadgate.d.ts.map