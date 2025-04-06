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
    passwords: AppPassword[];
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
    error?: 'AccountTakedown';
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
export interface AppPassword {
    $type?: 'com.atproto.server.listAppPasswords#appPassword';
    name: string;
    createdAt: string;
    privileged?: boolean;
}
export declare function isAppPassword<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.atproto.server.listAppPasswords", "appPassword">;
export declare function validateAppPassword<V>(v: V): ValidationResult<AppPassword & V>;
//# sourceMappingURL=listAppPasswords.d.ts.map