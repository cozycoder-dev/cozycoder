/**
 * GENERATED CODE - DO NOT MODIFY
 */
import express from 'express';
import { HandlerAuth, HandlerPipeThrough } from '@atproto/xrpc-server';
import type * as ToolsOzoneSetDefs from './defs.js';
export interface QueryParams {
    limit: number;
    cursor?: string;
    namePrefix?: string;
    sortBy: 'name' | 'createdAt' | 'updatedAt';
    /** Defaults to ascending order of name field. */
    sortDirection: 'asc' | 'desc';
}
export type InputSchema = undefined;
export interface OutputSchema {
    sets: ToolsOzoneSetDefs.SetView[];
    cursor?: string;
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
//# sourceMappingURL=querySets.d.ts.map