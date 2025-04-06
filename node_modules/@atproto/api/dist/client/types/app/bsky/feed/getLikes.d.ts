/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { HeadersMap } from '@atproto/xrpc';
import { type ValidationResult } from '@atproto/lexicon';
import type * as AppBskyActorDefs from '../actor/defs.js';
export interface QueryParams {
    /** AT-URI of the subject (eg, a post record). */
    uri: string;
    /** CID of the subject record (aka, specific version of record), to filter likes. */
    cid?: string;
    limit?: number;
    cursor?: string;
}
export type InputSchema = undefined;
export interface OutputSchema {
    uri: string;
    cid?: string;
    cursor?: string;
    likes: Like[];
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
export interface Like {
    $type?: 'app.bsky.feed.getLikes#like';
    indexedAt: string;
    createdAt: string;
    actor: AppBskyActorDefs.ProfileView;
}
export declare function isLike<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.feed.getLikes", "like">;
export declare function validateLike<V>(v: V): ValidationResult<Like & V>;
//# sourceMappingURL=getLikes.d.ts.map