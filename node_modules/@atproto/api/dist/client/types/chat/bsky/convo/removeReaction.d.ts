/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { HeadersMap, XRPCError } from '@atproto/xrpc';
import type * as ChatBskyConvoDefs from './defs.js';
export interface QueryParams {
}
export interface InputSchema {
    convoId: string;
    messageId: string;
    value: string;
}
export interface OutputSchema {
    message: ChatBskyConvoDefs.MessageView;
}
export interface CallOptions {
    signal?: AbortSignal;
    headers?: HeadersMap;
    qp?: QueryParams;
    encoding?: 'application/json';
}
export interface Response {
    success: boolean;
    headers: HeadersMap;
    data: OutputSchema;
}
export declare class ReactionMessageDeletedError extends XRPCError {
    constructor(src: XRPCError);
}
export declare class ReactionInvalidValueError extends XRPCError {
    constructor(src: XRPCError);
}
export declare function toKnownErr(e: any): any;
//# sourceMappingURL=removeReaction.d.ts.map