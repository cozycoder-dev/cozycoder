/**
 * GENERATED CODE - DO NOT MODIFY
 */
import express from 'express';
import { type ValidationResult } from '@atproto/lexicon';
import { HandlerAuth, HandlerPipeThrough } from '@atproto/xrpc-server';
export interface QueryParams {
}
export interface InputSchema {
    codeCount: number;
    useCount: number;
    forAccounts?: string[];
}
export interface OutputSchema {
    codes: AccountCodes[];
}
export interface HandlerInput {
    encoding: 'application/json';
    body: InputSchema;
}
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
export interface AccountCodes {
    $type?: 'com.atproto.server.createInviteCodes#accountCodes';
    account: string;
    codes: string[];
}
export declare function isAccountCodes<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.atproto.server.createInviteCodes", "accountCodes">;
export declare function validateAccountCodes<V>(v: V): ValidationResult<AccountCodes & V>;
//# sourceMappingURL=createInviteCodes.d.ts.map