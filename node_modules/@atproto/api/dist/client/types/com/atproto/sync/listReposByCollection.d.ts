/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { HeadersMap } from '@atproto/xrpc';
import { type ValidationResult } from '@atproto/lexicon';
export interface QueryParams {
    collection: string;
    /** Maximum size of response set. Recommend setting a large maximum (1000+) when enumerating large DID lists. */
    limit?: number;
    cursor?: string;
}
export type InputSchema = undefined;
export interface OutputSchema {
    cursor?: string;
    repos: Repo[];
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
export interface Repo {
    $type?: 'com.atproto.sync.listReposByCollection#repo';
    did: string;
}
export declare function isRepo<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.atproto.sync.listReposByCollection", "repo">;
export declare function validateRepo<V>(v: V): ValidationResult<Repo & V>;
//# sourceMappingURL=listReposByCollection.d.ts.map