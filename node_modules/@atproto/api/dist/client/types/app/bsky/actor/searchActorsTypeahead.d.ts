/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { HeadersMap } from '@atproto/xrpc';
import type * as AppBskyActorDefs from './defs.js';
export interface QueryParams {
    /** DEPRECATED: use 'q' instead. */
    term?: string;
    /** Search query prefix; not a full query string. */
    q?: string;
    limit?: number;
}
export type InputSchema = undefined;
export interface OutputSchema {
    actors: AppBskyActorDefs.ProfileViewBasic[];
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
//# sourceMappingURL=searchActorsTypeahead.d.ts.map