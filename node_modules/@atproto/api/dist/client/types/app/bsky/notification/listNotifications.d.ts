/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { HeadersMap } from '@atproto/xrpc';
import { type ValidationResult } from '@atproto/lexicon';
import type * as AppBskyActorDefs from '../actor/defs.js';
import type * as ComAtprotoLabelDefs from '../../../com/atproto/label/defs.js';
export interface QueryParams {
    /** Notification reasons to include in response. */
    reasons?: string[];
    limit?: number;
    priority?: boolean;
    cursor?: string;
    seenAt?: string;
}
export type InputSchema = undefined;
export interface OutputSchema {
    cursor?: string;
    notifications: Notification[];
    priority?: boolean;
    seenAt?: string;
}
export interface CallOptions {
    signal?: AbortSignal;
    headers?: HeadersMap;
}
export interface Response {
    success: boolean;
    headers: HeadersMap;
    data: OutputSchema;
}
export declare function toKnownErr(e: any): any;
export interface Notification {
    $type?: 'app.bsky.notification.listNotifications#notification';
    uri: string;
    cid: string;
    author: AppBskyActorDefs.ProfileView;
    /** Expected values are 'like', 'repost', 'follow', 'mention', 'reply', 'quote', and 'starterpack-joined'. */
    reason: 'like' | 'repost' | 'follow' | 'mention' | 'reply' | 'quote' | 'starterpack-joined' | (string & {});
    reasonSubject?: string;
    record: {
        [_ in string]: unknown;
    };
    isRead: boolean;
    indexedAt: string;
    labels?: ComAtprotoLabelDefs.Label[];
}
export declare function isNotification<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.notification.listNotifications", "notification">;
export declare function validateNotification<V>(v: V): ValidationResult<Notification & V>;
//# sourceMappingURL=listNotifications.d.ts.map