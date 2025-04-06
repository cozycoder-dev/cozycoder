/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { HeadersMap } from '@atproto/xrpc';
import { type ValidationResult } from '@atproto/lexicon';
export interface QueryParams {
}
export type InputSchema = undefined;
export interface OutputSchema {
    suggestions: Suggestion[];
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
export interface Suggestion {
    $type?: 'app.bsky.unspecced.getTaggedSuggestions#suggestion';
    tag: string;
    subjectType: 'actor' | 'feed' | (string & {});
    subject: string;
}
export declare function isSuggestion<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.unspecced.getTaggedSuggestions", "suggestion">;
export declare function validateSuggestion<V>(v: V): ValidationResult<Suggestion & V>;
//# sourceMappingURL=getTaggedSuggestions.d.ts.map