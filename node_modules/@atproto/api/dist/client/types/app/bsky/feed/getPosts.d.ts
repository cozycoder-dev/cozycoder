/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { HeadersMap } from '@atproto/xrpc';
import type * as AppBskyFeedDefs from './defs.js';
export interface QueryParams {
    /** List of post AT-URIs to return hydrated views for. */
    uris: string[];
}
export type InputSchema = undefined;
export interface OutputSchema {
    posts: AppBskyFeedDefs.PostView[];
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
//# sourceMappingURL=getPosts.d.ts.map