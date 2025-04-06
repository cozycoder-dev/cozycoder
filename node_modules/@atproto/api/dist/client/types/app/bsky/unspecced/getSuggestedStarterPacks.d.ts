/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { HeadersMap } from '@atproto/xrpc';
import type * as AppBskyGraphDefs from '../graph/defs.js';
export interface QueryParams {
    limit?: number;
}
export type InputSchema = undefined;
export interface OutputSchema {
    starterPacks: AppBskyGraphDefs.StarterPackView[];
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
//# sourceMappingURL=getSuggestedStarterPacks.d.ts.map