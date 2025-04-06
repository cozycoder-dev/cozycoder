/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { HeadersMap } from '@atproto/xrpc';
import type * as AppBskyUnspeccedDefs from './defs.js';
export interface QueryParams {
    /** DID of the account making the request (not included for public/unauthenticated queries). */
    viewer?: string;
    limit?: number;
}
export type InputSchema = undefined;
export interface OutputSchema {
    trends: AppBskyUnspeccedDefs.SkeletonTrend[];
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
//# sourceMappingURL=getTrendsSkeleton.d.ts.map