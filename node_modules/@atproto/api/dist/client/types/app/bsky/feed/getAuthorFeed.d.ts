/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { HeadersMap, XRPCError } from '@atproto/xrpc';
import type * as AppBskyFeedDefs from './defs.js';
export interface QueryParams {
    actor: string;
    limit?: number;
    cursor?: string;
    /** Combinations of post/repost types to include in response. */
    filter?: 'posts_with_replies' | 'posts_no_replies' | 'posts_with_media' | 'posts_and_author_threads' | 'posts_with_video' | (string & {});
    includePins?: boolean;
}
export type InputSchema = undefined;
export interface OutputSchema {
    cursor?: string;
    feed: AppBskyFeedDefs.FeedViewPost[];
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
export declare class BlockedActorError extends XRPCError {
    constructor(src: XRPCError);
}
export declare class BlockedByActorError extends XRPCError {
    constructor(src: XRPCError);
}
export declare function toKnownErr(e: any): any;
//# sourceMappingURL=getAuthorFeed.d.ts.map