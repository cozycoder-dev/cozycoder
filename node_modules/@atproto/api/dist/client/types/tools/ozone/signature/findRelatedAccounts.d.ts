/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { HeadersMap } from '@atproto/xrpc';
import { type ValidationResult } from '@atproto/lexicon';
import type * as ComAtprotoAdminDefs from '../../../com/atproto/admin/defs.js';
import type * as ToolsOzoneSignatureDefs from './defs.js';
export interface QueryParams {
    did: string;
    cursor?: string;
    limit?: number;
}
export type InputSchema = undefined;
export interface OutputSchema {
    cursor?: string;
    accounts: RelatedAccount[];
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
export interface RelatedAccount {
    $type?: 'tools.ozone.signature.findRelatedAccounts#relatedAccount';
    account: ComAtprotoAdminDefs.AccountView;
    similarities?: ToolsOzoneSignatureDefs.SigDetail[];
}
export declare function isRelatedAccount<V>(v: V): v is import("../../../../util").$TypedObject<V, "tools.ozone.signature.findRelatedAccounts", "relatedAccount">;
export declare function validateRelatedAccount<V>(v: V): ValidationResult<RelatedAccount & V>;
//# sourceMappingURL=findRelatedAccounts.d.ts.map