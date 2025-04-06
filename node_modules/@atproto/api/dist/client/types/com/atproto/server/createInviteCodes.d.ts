/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { HeadersMap } from '@atproto/xrpc';
import { type ValidationResult } from '@atproto/lexicon';
export interface QueryParams {
}
export interface InputSchema {
    codeCount: number;
    useCount: number;
    forAccounts?: string[];
}
export interface OutputSchema {
    codes: AccountCodes[];
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
export declare function toKnownErr(e: any): any;
export interface AccountCodes {
    $type?: 'com.atproto.server.createInviteCodes#accountCodes';
    account: string;
    codes: string[];
}
export declare function isAccountCodes<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.atproto.server.createInviteCodes", "accountCodes">;
export declare function validateAccountCodes<V>(v: V): ValidationResult<AccountCodes & V>;
//# sourceMappingURL=createInviteCodes.d.ts.map