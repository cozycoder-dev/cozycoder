/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { HeadersMap, XRPCError } from '@atproto/xrpc';
import type * as ComAtprotoIdentityDefs from './defs.js';
export interface QueryParams {
}
export interface InputSchema {
    identifier: string;
}
export type OutputSchema = ComAtprotoIdentityDefs.IdentityInfo;
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
export declare class HandleNotFoundError extends XRPCError {
    constructor(src: XRPCError);
}
export declare class DidNotFoundError extends XRPCError {
    constructor(src: XRPCError);
}
export declare class DidDeactivatedError extends XRPCError {
    constructor(src: XRPCError);
}
export declare function toKnownErr(e: any): any;
//# sourceMappingURL=refreshIdentity.d.ts.map