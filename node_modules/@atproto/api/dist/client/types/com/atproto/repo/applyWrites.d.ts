/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { HeadersMap, XRPCError } from '@atproto/xrpc';
import { type ValidationResult } from '@atproto/lexicon';
import { type $Typed } from '../../../../util';
import type * as ComAtprotoRepoDefs from './defs.js';
export interface QueryParams {
}
export interface InputSchema {
    /** The handle or DID of the repo (aka, current account). */
    repo: string;
    /** Can be set to 'false' to skip Lexicon schema validation of record data across all operations, 'true' to require it, or leave unset to validate only for known Lexicons. */
    validate?: boolean;
    writes: ($Typed<Create> | $Typed<Update> | $Typed<Delete>)[];
    /** If provided, the entire operation will fail if the current repo commit CID does not match this value. Used to prevent conflicting repo mutations. */
    swapCommit?: string;
}
export interface OutputSchema {
    commit?: ComAtprotoRepoDefs.CommitMeta;
    results?: ($Typed<CreateResult> | $Typed<UpdateResult> | $Typed<DeleteResult>)[];
}
export interface CallOptions {
    signal?: AbortSignal;
    headers?: HeadersMap;
    qp?: QueryParams;
    encoding?: 'application/json';
}
export interface Response {
    success: boolean;
    headers: HeadersMap;
    data: OutputSchema;
}
export declare class InvalidSwapError extends XRPCError {
    constructor(src: XRPCError);
}
export declare function toKnownErr(e: any): any;
/** Operation which creates a new record. */
export interface Create {
    $type?: 'com.atproto.repo.applyWrites#create';
    collection: string;
    /** NOTE: maxLength is redundant with record-key format. Keeping it temporarily to ensure backwards compatibility. */
    rkey?: string;
    value: {
        [_ in string]: unknown;
    };
}
export declare function isCreate<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.atproto.repo.applyWrites", "create">;
export declare function validateCreate<V>(v: V): ValidationResult<Create & V>;
/** Operation which updates an existing record. */
export interface Update {
    $type?: 'com.atproto.repo.applyWrites#update';
    collection: string;
    rkey: string;
    value: {
        [_ in string]: unknown;
    };
}
export declare function isUpdate<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.atproto.repo.applyWrites", "update">;
export declare function validateUpdate<V>(v: V): ValidationResult<Update & V>;
/** Operation which deletes an existing record. */
export interface Delete {
    $type?: 'com.atproto.repo.applyWrites#delete';
    collection: string;
    rkey: string;
}
export declare function isDelete<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.atproto.repo.applyWrites", "delete">;
export declare function validateDelete<V>(v: V): ValidationResult<Delete & V>;
export interface CreateResult {
    $type?: 'com.atproto.repo.applyWrites#createResult';
    uri: string;
    cid: string;
    validationStatus?: 'valid' | 'unknown' | (string & {});
}
export declare function isCreateResult<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.atproto.repo.applyWrites", "createResult">;
export declare function validateCreateResult<V>(v: V): ValidationResult<CreateResult & V>;
export interface UpdateResult {
    $type?: 'com.atproto.repo.applyWrites#updateResult';
    uri: string;
    cid: string;
    validationStatus?: 'valid' | 'unknown' | (string & {});
}
export declare function isUpdateResult<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.atproto.repo.applyWrites", "updateResult">;
export declare function validateUpdateResult<V>(v: V): ValidationResult<UpdateResult & V>;
export interface DeleteResult {
    $type?: 'com.atproto.repo.applyWrites#deleteResult';
}
export declare function isDeleteResult<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.atproto.repo.applyWrites", "deleteResult">;
export declare function validateDeleteResult<V>(v: V): ValidationResult<DeleteResult & V>;
//# sourceMappingURL=applyWrites.d.ts.map