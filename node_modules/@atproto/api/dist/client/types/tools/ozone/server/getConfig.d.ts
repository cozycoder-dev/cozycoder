/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { HeadersMap } from '@atproto/xrpc';
import { type ValidationResult } from '@atproto/lexicon';
export interface QueryParams {
}
export type InputSchema = undefined;
export interface OutputSchema {
    appview?: ServiceConfig;
    pds?: ServiceConfig;
    blobDivert?: ServiceConfig;
    chat?: ServiceConfig;
    viewer?: ViewerConfig;
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
export interface ServiceConfig {
    $type?: 'tools.ozone.server.getConfig#serviceConfig';
    url?: string;
}
export declare function isServiceConfig<V>(v: V): v is import("../../../../util").$TypedObject<V, "tools.ozone.server.getConfig", "serviceConfig">;
export declare function validateServiceConfig<V>(v: V): ValidationResult<ServiceConfig & V>;
export interface ViewerConfig {
    $type?: 'tools.ozone.server.getConfig#viewerConfig';
    role?: 'tools.ozone.team.defs#roleAdmin' | 'tools.ozone.team.defs#roleModerator' | 'tools.ozone.team.defs#roleTriage' | (string & {});
}
export declare function isViewerConfig<V>(v: V): v is import("../../../../util").$TypedObject<V, "tools.ozone.server.getConfig", "viewerConfig">;
export declare function validateViewerConfig<V>(v: V): ValidationResult<ViewerConfig & V>;
//# sourceMappingURL=getConfig.d.ts.map