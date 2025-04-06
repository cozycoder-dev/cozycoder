/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { HeadersMap } from '@atproto/xrpc';
import { type ValidationResult } from '@atproto/lexicon';
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
export interface CallOptions {
    signal?: AbortSignal;
    headers?: HeadersMap;
}
export interface Response {
    success: boolean;
    headers: HeadersMap;
    data: OutputSchema;
}
export declare function toKnownErr(e: any): any;
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