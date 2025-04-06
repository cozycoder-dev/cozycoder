/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { HeadersMap } from '@atproto/xrpc';
export interface QueryParams {
}
export interface InputSchema {
    /** A token received through com.atproto.identity.requestPlcOperationSignature */
    token?: string;
    rotationKeys?: string[];
    alsoKnownAs?: string[];
    verificationMethods?: {
        [_ in string]: unknown;
    };
    services?: {
        [_ in string]: unknown;
    };
}
export interface OutputSchema {
    /** A signed DID PLC operation. */
    operation: {
        [_ in string]: unknown;
    };
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
//# sourceMappingURL=signPlcOperation.d.ts.map