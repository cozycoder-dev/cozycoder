/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { HeadersMap } from '@atproto/xrpc';
import { type $Typed } from '../../../../util';
import type * as ToolsOzoneModerationDefs from './defs.js';
export interface QueryParams {
    uris: string[];
}
export type InputSchema = undefined;
export interface OutputSchema {
    records: ($Typed<ToolsOzoneModerationDefs.RecordViewDetail> | $Typed<ToolsOzoneModerationDefs.RecordViewNotFound> | {
        $type: string;
    })[];
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
//# sourceMappingURL=getRecords.d.ts.map