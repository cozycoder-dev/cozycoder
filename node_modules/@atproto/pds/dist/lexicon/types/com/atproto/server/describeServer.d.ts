/**
 * GENERATED CODE - DO NOT MODIFY
 */
import express from 'express';
import { type ValidationResult } from '@atproto/lexicon';
import { HandlerAuth, HandlerPipeThrough } from '@atproto/xrpc-server';
export interface QueryParams {
}
export type InputSchema = undefined;
export interface OutputSchema {
    /** If true, an invite code must be supplied to create an account on this instance. */
    inviteCodeRequired?: boolean;
    /** If true, a phone verification token must be supplied to create an account on this instance. */
    phoneVerificationRequired?: boolean;
    /** List of domain suffixes that can be used in account handles. */
    availableUserDomains: string[];
    links?: Links;
    contact?: Contact;
    did: string;
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
export interface Links {
    $type?: 'com.atproto.server.describeServer#links';
    privacyPolicy?: string;
    termsOfService?: string;
}
export declare function isLinks<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.atproto.server.describeServer", "links">;
export declare function validateLinks<V>(v: V): ValidationResult<Links & V>;
export interface Contact {
    $type?: 'com.atproto.server.describeServer#contact';
    email?: string;
}
export declare function isContact<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.atproto.server.describeServer", "contact">;
export declare function validateContact<V>(v: V): ValidationResult<Contact & V>;
//# sourceMappingURL=describeServer.d.ts.map