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
    did: string;
    feeds: Feed[];
    links?: Links;
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
export interface Feed {
    $type?: 'app.bsky.feed.describeFeedGenerator#feed';
    uri: string;
}
export declare function isFeed<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.feed.describeFeedGenerator", "feed">;
export declare function validateFeed<V>(v: V): ValidationResult<Feed & V>;
export interface Links {
    $type?: 'app.bsky.feed.describeFeedGenerator#links';
    privacyPolicy?: string;
    termsOfService?: string;
}
export declare function isLinks<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.feed.describeFeedGenerator", "links">;
export declare function validateLinks<V>(v: V): ValidationResult<Links & V>;
//# sourceMappingURL=describeFeedGenerator.d.ts.map