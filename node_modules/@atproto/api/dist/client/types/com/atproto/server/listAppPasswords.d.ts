/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { HeadersMap, XRPCError } from '@atproto/xrpc';
import { type ValidationResult } from '@atproto/lexicon';
export interface QueryParams {
}
export type InputSchema = undefined;
export interface OutputSchema {
    passwords: AppPassword[];
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
export declare class AccountTakedownError extends XRPCError {
    constructor(src: XRPCError);
}
export declare function toKnownErr(e: any): any;
export interface AppPassword {
    $type?: 'com.atproto.server.listAppPasswords#appPassword';
    name: string;
    createdAt: string;
    privileged?: boolean;
}
export declare function isAppPassword<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.atproto.server.listAppPasswords", "appPassword">;
export declare function validateAppPassword<V>(v: V): ValidationResult<AppPassword & V>;
//# sourceMappingURL=listAppPasswords.d.ts.map