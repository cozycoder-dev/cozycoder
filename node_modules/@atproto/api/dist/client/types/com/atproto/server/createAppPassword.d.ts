/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { HeadersMap, XRPCError } from '@atproto/xrpc';
import { type ValidationResult } from '@atproto/lexicon';
export interface QueryParams {
}
export interface InputSchema {
    /** A short name for the App Password, to help distinguish them. */
    name: string;
    /** If an app password has 'privileged' access to possibly sensitive account state. Meant for use with trusted clients. */
    privileged?: boolean;
}
export type OutputSchema = AppPassword;
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
export declare class AccountTakedownError extends XRPCError {
    constructor(src: XRPCError);
}
export declare function toKnownErr(e: any): any;
export interface AppPassword {
    $type?: 'com.atproto.server.createAppPassword#appPassword';
    name: string;
    password: string;
    createdAt: string;
    privileged?: boolean;
}
export declare function isAppPassword<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.atproto.server.createAppPassword", "appPassword">;
export declare function validateAppPassword<V>(v: V): ValidationResult<AppPassword & V>;
//# sourceMappingURL=createAppPassword.d.ts.map