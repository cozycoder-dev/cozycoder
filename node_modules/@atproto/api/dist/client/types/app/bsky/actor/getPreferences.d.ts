/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { HeadersMap } from '@atproto/xrpc';
import type * as AppBskyActorDefs from './defs.js';
export interface QueryParams {
}
export type InputSchema = undefined;
export interface OutputSchema {
    preferences: AppBskyActorDefs.Preferences;
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
//# sourceMappingURL=getPreferences.d.ts.map