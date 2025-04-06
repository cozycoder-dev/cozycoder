/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { HeadersMap } from '@atproto/xrpc';
import { type $Typed } from '../../../../util';
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
//# sourceMappingURL=getLog.d.ts.map