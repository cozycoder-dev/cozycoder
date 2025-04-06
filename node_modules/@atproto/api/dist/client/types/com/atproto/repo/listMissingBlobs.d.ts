/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { HeadersMap } from '@atproto/xrpc';
import { type ValidationResult } from '@atproto/lexicon';
export interface QueryParams {
    limit?: number;
    cursor?: string;
}
export type InputSchema = undefined;
export interface OutputSchema {
    cursor?: string;
    blobs: RecordBlob[];
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
export interface RecordBlob {
    $type?: 'com.atproto.repo.listMissingBlobs#recordBlob';
    cid: string;
    recordUri: string;
}
export declare function isRecordBlob<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.atproto.repo.listMissingBlobs", "recordBlob">;
export declare function validateRecordBlob<V>(v: V): ValidationResult<RecordBlob & V>;
//# sourceMappingURL=listMissingBlobs.d.ts.map