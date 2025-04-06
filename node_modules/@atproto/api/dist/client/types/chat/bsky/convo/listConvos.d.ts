/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { HeadersMap } from '@atproto/xrpc';
import type * as ChatBskyConvoDefs from './defs.js';
export interface QueryParams {
    limit?: number;
    cursor?: string;
    readState?: 'unread' | (string & {});
    status?: 'request' | 'accepted' | (string & {});
}
export type InputSchema = undefined;
export interface OutputSchema {
    cursor?: string;
    convos: ChatBskyConvoDefs.ConvoView[];
}
export interface CallOptions {
    signal?: AbortSignal;
    headers?: HeadersMap;
}
export interface Response {
    success: boolean;
    headers: HeadersMap;
    data: OutputSchema;
}
export declare function toKnownErr(e: any): any;
//# sourceMappingURL=listConvos.d.ts.map