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
    suggestions: Suggestion[];
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
export interface Suggestion {
    $type?: 'app.bsky.unspecced.getTaggedSuggestions#suggestion';
    tag: string;
    subjectType: 'actor' | 'feed' | (string & {});
    subject: string;
}
export declare function isSuggestion<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.unspecced.getTaggedSuggestions", "suggestion">;
export declare function validateSuggestion<V>(v: V): ValidationResult<Suggestion & V>;
//# sourceMappingURL=getTaggedSuggestions.d.ts.map