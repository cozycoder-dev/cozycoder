/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { HeadersMap } from '@atproto/xrpc';
import type * as ToolsOzoneModerationDefs from './defs.js';
export interface QueryParams {
    subjects: string[];
}
export type InputSchema = undefined;
export interface OutputSchema {
    subjects: ToolsOzoneModerationDefs.SubjectView[];
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
//# sourceMappingURL=getSubjects.d.ts.map