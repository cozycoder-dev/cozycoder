/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { HeadersMap } from '@atproto/xrpc';
import type * as AppBskyVideoDefs from './defs.js';
export interface QueryParams {
    jobId: string;
}
export type InputSchema = undefined;
export interface OutputSchema {
    jobStatus: AppBskyVideoDefs.JobStatus;
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
//# sourceMappingURL=getJobStatus.d.ts.map