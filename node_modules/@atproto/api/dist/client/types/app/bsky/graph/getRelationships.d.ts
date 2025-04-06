/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { HeadersMap, XRPCError } from '@atproto/xrpc';
import { type $Typed } from '../../../../util';
import type * as AppBskyGraphDefs from './defs.js';
export interface QueryParams {
    /** Primary account requesting relationships for. */
    actor: string;
    /** List of 'other' accounts to be related back to the primary. */
    others?: string[];
}
export type InputSchema = undefined;
export interface OutputSchema {
    actor?: string;
    relationships: ($Typed<AppBskyGraphDefs.Relationship> | $Typed<AppBskyGraphDefs.NotFoundActor> | {
        $type: string;
    })[];
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
export declare class ActorNotFoundError extends XRPCError {
    constructor(src: XRPCError);
}
export declare function toKnownErr(e: any): any;
//# sourceMappingURL=getRelationships.d.ts.map