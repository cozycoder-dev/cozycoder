/**
 * GENERATED CODE - DO NOT MODIFY
 */
import express from 'express';
import { type ValidationResult } from '@atproto/lexicon';
import { HandlerAuth, HandlerPipeThrough } from '@atproto/xrpc-server';
import type * as ComAtprotoAdminDefs from '../../../com/atproto/admin/defs.js';
import type * as ToolsOzoneSignatureDefs from './defs.js';
export interface QueryParams {
    did: string;
    cursor?: string;
    limit: number;
}
export type InputSchema = undefined;
export interface OutputSchema {
    cursor?: string;
    accounts: RelatedAccount[];
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
export interface RelatedAccount {
    $type?: 'tools.ozone.signature.findRelatedAccounts#relatedAccount';
    account: ComAtprotoAdminDefs.AccountView;
    similarities?: ToolsOzoneSignatureDefs.SigDetail[];
}
export declare function isRelatedAccount<V>(v: V): v is import("../../../../util").$TypedObject<V, "tools.ozone.signature.findRelatedAccounts", "relatedAccount">;
export declare function validateRelatedAccount<V>(v: V): ValidationResult<RelatedAccount & V>;
//# sourceMappingURL=findRelatedAccounts.d.ts.map