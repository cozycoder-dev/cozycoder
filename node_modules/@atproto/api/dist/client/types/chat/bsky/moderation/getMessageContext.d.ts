/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { HeadersMap } from '@atproto/xrpc';
import { type $Typed } from '../../../../util';
import type * as ChatBskyConvoDefs from '../convo/defs.js';
export interface QueryParams {
    /** Conversation that the message is from. NOTE: this field will eventually be required. */
    convoId?: string;
    messageId: string;
    before?: number;
    after?: number;
}
export type InputSchema = undefined;
export interface OutputSchema {
    messages: ($Typed<ChatBskyConvoDefs.MessageView> | $Typed<ChatBskyConvoDefs.DeletedMessageView> | {
        $type: string;
    })[];
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
//# sourceMappingURL=getMessageContext.d.ts.map