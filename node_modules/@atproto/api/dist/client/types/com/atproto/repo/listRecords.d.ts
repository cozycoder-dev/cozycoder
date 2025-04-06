/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { HeadersMap } from '@atproto/xrpc';
import { type ValidationResult } from '@atproto/lexicon';
export interface QueryParams {
    /** The handle or DID of the repo. */
    repo: string;
    /** The NSID of the record type. */
    collection: string;
    /** The number of records to return. */
    limit?: number;
    cursor?: string;
    /** Flag to reverse the order of the returned records. */
    reverse?: boolean;
}
export type InputSchema = undefined;
export interface OutputSchema {
    cursor?: string;
    records: Record[];
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
export interface Record {
    $type?: 'com.atproto.repo.listRecords#record';
    uri: string;
    cid: string;
    value: {
        [_ in string]: unknown;
    };
}
export declare function isRecord<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.atproto.repo.listRecords", "record">;
export declare function validateRecord<V>(v: V): ValidationResult<Record & V>;
//# sourceMappingURL=listRecords.d.ts.map