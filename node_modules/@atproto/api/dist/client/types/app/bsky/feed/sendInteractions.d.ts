/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { HeadersMap } from '@atproto/xrpc';
import type * as AppBskyFeedDefs from './defs.js';
export interface QueryParams {
}
export interface InputSchema {
    interactions: AppBskyFeedDefs.Interaction[];
}
export interface OutputSchema {
}
export interface CallOptions {
    signal?: AbortSignal;
    headers?: HeadersMap;
    qp?: QueryParams;
    encoding?: 'application/json';
}
export interface Response {
    success: boolean;
    headers: HeadersMap;
    data: OutputSchema;
}
export declare function toKnownErr(e: any): any;
//# sourceMappingURL=sendInteractions.d.ts.map