/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { HeadersMap } from '@atproto/xrpc';
import { type ValidationResult } from '@atproto/lexicon';
export interface QueryParams {
    actor: string;
}
export type InputSchema = undefined;
export interface OutputSchema {
    day: Metadata;
    month: Metadata;
    all: Metadata;
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
export interface Metadata {
    $type?: 'chat.bsky.moderation.getActorMetadata#metadata';
    messagesSent: number;
    messagesReceived: number;
    convos: number;
    convosStarted: number;
}
export declare function isMetadata<V>(v: V): v is import("../../../../util").$TypedObject<V, "chat.bsky.moderation.getActorMetadata", "metadata">;
export declare function validateMetadata<V>(v: V): ValidationResult<Metadata & V>;
//# sourceMappingURL=getActorMetadata.d.ts.map