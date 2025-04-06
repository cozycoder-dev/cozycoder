/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { HeadersMap } from '@atproto/xrpc';
import type * as ChatBskyConvoDefs from './defs.js';
export interface QueryParams {
}
export interface InputSchema {
    convoId: string;
    messageId: string;
}
export type OutputSchema = ChatBskyConvoDefs.DeletedMessageView;
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
export declare function toKnownErr(e: any): any;
//# sourceMappingURL=deleteMessageForSelf.d.ts.map