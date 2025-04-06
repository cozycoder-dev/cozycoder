/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { HeadersMap } from '@atproto/xrpc';
export interface QueryParams {
    /** DID of the account making the request (not included for public/unauthenticated queries). */
    viewer?: string;
    /** Category of users to get suggestions for. */
    category?: string;
    limit?: number;
}
export type InputSchema = undefined;
export interface OutputSchema {
    dids: string[];
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
//# sourceMappingURL=getSuggestedUsersSkeleton.d.ts.map