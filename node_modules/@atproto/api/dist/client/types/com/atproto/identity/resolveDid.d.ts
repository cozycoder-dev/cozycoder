/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { HeadersMap, XRPCError } from '@atproto/xrpc';
export interface QueryParams {
    /** DID to resolve. */
    did: string;
}
export type InputSchema = undefined;
export interface OutputSchema {
    /** The complete DID document for the identity. */
    didDoc: {
        [_ in string]: unknown;
    };
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
export declare class DidNotFoundError extends XRPCError {
    constructor(src: XRPCError);
}
export declare class DidDeactivatedError extends XRPCError {
    constructor(src: XRPCError);
}
export declare function toKnownErr(e: any): any;
//# sourceMappingURL=resolveDid.d.ts.map