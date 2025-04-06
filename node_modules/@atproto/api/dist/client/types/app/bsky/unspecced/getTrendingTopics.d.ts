/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { HeadersMap } from '@atproto/xrpc';
import type * as AppBskyUnspeccedDefs from './defs.js';
export interface QueryParams {
    /** DID of the account making the request (not included for public/unauthenticated queries). Used to boost followed accounts in ranking. */
    viewer?: string;
    limit?: number;
}
export type InputSchema = undefined;
export interface OutputSchema {
    topics: AppBskyUnspeccedDefs.TrendingTopic[];
    suggested: AppBskyUnspeccedDefs.TrendingTopic[];
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
//# sourceMappingURL=getTrendingTopics.d.ts.map