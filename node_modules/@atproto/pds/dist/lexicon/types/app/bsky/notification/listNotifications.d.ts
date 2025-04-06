/**
 * GENERATED CODE - DO NOT MODIFY
 */
import express from 'express';
import { type ValidationResult } from '@atproto/lexicon';
import { HandlerAuth, HandlerPipeThrough } from '@atproto/xrpc-server';
import type * as AppBskyActorDefs from '../actor/defs.js';
import type * as ComAtprotoLabelDefs from '../../../com/atproto/label/defs.js';
export interface QueryParams {
    /** Notification reasons to include in response. */
    reasons?: string[];
    limit: number;
    priority?: boolean;
    cursor?: string;
    seenAt?: string;
}
export type InputSchema = undefined;
export interface OutputSchema {
    cursor?: string;
    notifications: Notification[];
    priority?: boolean;
    seenAt?: string;
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
export interface Notification {
    $type?: 'app.bsky.notification.listNotifications#notification';
    uri: string;
    cid: string;
    author: AppBskyActorDefs.ProfileView;
    /** Expected values are 'like', 'repost', 'follow', 'mention', 'reply', 'quote', and 'starterpack-joined'. */
    reason: 'like' | 'repost' | 'follow' | 'mention' | 'reply' | 'quote' | 'starterpack-joined' | (string & {});
    reasonSubject?: string;
    record: {
        [_ in string]: unknown;
    };
    isRead: boolean;
    indexedAt: string;
    labels?: ComAtprotoLabelDefs.Label[];
}
export declare function isNotification<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.notification.listNotifications", "notification">;
export declare function validateNotification<V>(v: V): ValidationResult<Notification & V>;
//# sourceMappingURL=listNotifications.d.ts.map