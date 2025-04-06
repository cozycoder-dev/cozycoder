/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { HeadersMap } from '@atproto/xrpc';
import { type ValidationResult } from '@atproto/lexicon';
import type * as ChatBskyConvoDefs from './defs.js';
export interface QueryParams {
}
export interface InputSchema {
    items: BatchItem[];
}
export interface OutputSchema {
    items: ChatBskyConvoDefs.MessageView[];
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
export declare function toKnownErr(e: any): any;
export interface BatchItem {
    $type?: 'chat.bsky.convo.sendMessageBatch#batchItem';
    convoId: string;
    message: ChatBskyConvoDefs.MessageInput;
}
export declare function isBatchItem<V>(v: V): v is import("../../../../util").$TypedObject<V, "chat.bsky.convo.sendMessageBatch", "batchItem">;
export declare function validateBatchItem<V>(v: V): ValidationResult<BatchItem & V>;
//# sourceMappingURL=sendMessageBatch.d.ts.map