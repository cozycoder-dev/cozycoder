/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { HeadersMap } from '@atproto/xrpc';
import { type $Typed } from '../../../../util';
import type * as AppBskyLabelerDefs from './defs.js';
export interface QueryParams {
    dids: string[];
    detailed?: boolean;
}
export type InputSchema = undefined;
export interface OutputSchema {
    views: ($Typed<AppBskyLabelerDefs.LabelerView> | $Typed<AppBskyLabelerDefs.LabelerViewDetailed> | {
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
//# sourceMappingURL=getServices.d.ts.map