/**
 * GENERATED CODE - DO NOT MODIFY
 */
import express from 'express';
import { type $Typed } from '../../../../util';
import { HandlerAuth, HandlerPipeThrough } from '@atproto/xrpc-server';
import type * as ChatBskyConvoDefs from './defs.js';
export interface QueryParams {
    cursor?: string;
}
export type InputSchema = undefined;
export interface OutputSchema {
    cursor?: string;
    logs: ($Typed<ChatBskyConvoDefs.LogBeginConvo> | $Typed<ChatBskyConvoDefs.LogAcceptConvo> | $Typed<ChatBskyConvoDefs.LogLeaveConvo> | $Typed<ChatBskyConvoDefs.LogMuteConvo> | $Typed<ChatBskyConvoDefs.LogUnmuteConvo> | $Typed<ChatBskyConvoDefs.LogCreateMessage> | $Typed<ChatBskyConvoDefs.LogDeleteMessage> | $Typed<ChatBskyConvoDefs.LogReadMessage> | $Typed<ChatBskyConvoDefs.LogAddReaction> | $Typed<ChatBskyConvoDefs.LogRemoveReaction> | {
        $type: string;
    })[];
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
//# sourceMappingURL=getLog.d.ts.map