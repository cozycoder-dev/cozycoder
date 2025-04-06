/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { HeadersMap } from '@atproto/xrpc';
import type * as ToolsOzoneCommunicationDefs from './defs.js';
export interface QueryParams {
}
export type InputSchema = undefined;
export interface OutputSchema {
    communicationTemplates: ToolsOzoneCommunicationDefs.TemplateView[];
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
//# sourceMappingURL=listTemplates.d.ts.map