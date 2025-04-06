/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { HeadersMap } from '@atproto/xrpc';
import { type ValidationResult } from '@atproto/lexicon';
export interface QueryParams {
}
export type InputSchema = undefined;
export interface OutputSchema {
    did: string;
    feeds: Feed[];
    links?: Links;
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