/**
 * GENERATED CODE - DO NOT MODIFY
 */
import express from 'express';
import { type ValidationResult } from '@atproto/lexicon';
import { HandlerAuth, HandlerPipeThrough } from '@atproto/xrpc-server';
import type * as ChatBskyConvoDefs from './defs.js';
export interface QueryParams {
}
export interface InputSchema {
    items: BatchItem[];
}
export interface OutputSchema {
    items: ChatBskyConvoDefs.MessageView[];
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
export interface BatchItem {
    $type?: 'chat.bsky.convo.sendMessageBatch#batchItem';
    convoId: string;
    message: ChatBskyConvoDefs.MessageInput;
}
export declare function isBatchItem<V>(v: V): v is import("../../../../util").$TypedObject<V, "chat.bsky.convo.sendMessageBatch", "batchItem">;
export declare function validateBatchItem<V>(v: V): ValidationResult<BatchItem & V>;
//# sourceMappingURL=sendMessageBatch.d.ts.map