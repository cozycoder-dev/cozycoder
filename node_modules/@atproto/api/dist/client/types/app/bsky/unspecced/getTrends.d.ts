/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { HeadersMap } from '@atproto/xrpc';
import type * as AppBskyUnspeccedDefs from './defs.js';
export interface QueryParams {
    limit?: number;
}
export type InputSchema = undefined;
export interface OutputSchema {
    trends: AppBskyUnspeccedDefs.TrendView[];
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
//# sourceMappingURL=getTrends.d.ts.map