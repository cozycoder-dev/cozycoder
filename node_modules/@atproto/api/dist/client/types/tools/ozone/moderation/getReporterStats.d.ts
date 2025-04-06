/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { HeadersMap } from '@atproto/xrpc';
import type * as ToolsOzoneModerationDefs from './defs.js';
export interface QueryParams {
    dids: string[];
}
export type InputSchema = undefined;
export interface OutputSchema {
    stats: ToolsOzoneModerationDefs.ReporterStats[];
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
//# sourceMappingURL=getReporterStats.d.ts.map