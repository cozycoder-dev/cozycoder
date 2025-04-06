/**
 * GENERATED CODE - DO NOT MODIFY
 */
import express from 'express';
import { type ValidationResult } from '@atproto/lexicon';
import { HandlerAuth, HandlerPipeThrough } from '@atproto/xrpc-server';
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
export type HandlerInput = undefined;
export interface HandlerSuccess {
    encoding: 'application/json';
    body: OutputSchema;
    headers?: {
        [key: string]: string;
    };
}
export interface HandlerError {
    status: number;
    message?: string;
}
export type HandlerOutput = HandlerError | HandlerSuccess | HandlerPipeThrough;
export type HandlerReqCtx<HA extends HandlerAuth = never> = {
    auth: HA;
    params: QueryParams;
    input: HandlerInput;
    req: express.Request;
    res: express.Response;
    resetRouteRateLimits: () => Promise<void>;
};
export type Handler<HA extends HandlerAuth = never> = (ctx: HandlerReqCtx<HA>) => Promise<HandlerOutput> | HandlerOutput;
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