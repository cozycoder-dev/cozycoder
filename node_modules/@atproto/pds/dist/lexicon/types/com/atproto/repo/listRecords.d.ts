/**
 * GENERATED CODE - DO NOT MODIFY
 */
import express from 'express';
import { type ValidationResult } from '@atproto/lexicon';
import { HandlerAuth, HandlerPipeThrough } from '@atproto/xrpc-server';
export interface QueryParams {
    /** The handle or DID of the repo. */
    repo: string;
    /** The NSID of the record type. */
    collection: string;
    /** The number of records to return. */
    limit: number;
    cursor?: string;
    /** Flag to reverse the order of the returned records. */
    reverse?: boolean;
}
export type InputSchema = undefined;
export interface OutputSchema {
    cursor?: string;
    records: Record[];
}
export type HandlerInput = undefined;
export interface HandlerSuccess {
    encoding: 'application/json';
    body: OutputSchema;
    headers?: {
        [key: string]: string;
    };
}
export interface HandlerError {
    status: number;
    message?: string;
}
export type HandlerOutput = HandlerError | HandlerSuccess | HandlerPipeThrough;
export type HandlerReqCtx<HA extends HandlerAuth = never> = {
    auth: HA;
    params: QueryParams;
    input: HandlerInput;
    req: express.Request;
    res: express.Response;
    resetRouteRateLimits: () => Promise<void>;
};
export type Handler<HA extends HandlerAuth = never> = (ctx: HandlerReqCtx<HA>) => Promise<HandlerOutput> | HandlerOutput;
export interface Record {
    $type?: 'com.atproto.repo.listRecords#record';
    uri: string;
    cid: string;
    value: {
        [_ in string]: unknown;
    };
}
export declare function isRecord<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.atproto.repo.listRecords", "record">;
export declare function validateRecord<V>(v: V): ValidationResult<Record & V>;
//# sourceMappingURL=listRecords.d.ts.map