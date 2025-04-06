/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { HeadersMap, XRPCError } from '@atproto/xrpc';
import type * as ComAtprotoIdentityDefs from './defs.js';
export interface QueryParams {
    /** Handle or DID to resolve. */
    identifier: string;
}
export type InputSchema = undefined;
export type OutputSchema = ComAtprotoIdentityDefs.IdentityInfo;
export interface CallOptions {
    signal?: AbortSignal;
    headers?: HeadersMap;
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
//# sourceMappingURL=resolveIdentity.d.ts.map