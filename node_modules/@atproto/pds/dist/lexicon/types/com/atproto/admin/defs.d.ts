/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult } from '@atproto/lexicon';
import type * as ComAtprotoServerDefs from '../server/defs.js';
export interface StatusAttr {
    $type?: 'com.atproto.admin.defs#statusAttr';
    applied: boolean;
    ref?: string;
}
export declare function isStatusAttr<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.atproto.admin.defs", "statusAttr">;
export declare function validateStatusAttr<V>(v: V): ValidationResult<StatusAttr & V>;
export interface AccountView {
    $type?: 'com.atproto.admin.defs#accountView';
    did: string;
    handle: string;
    email?: string;
    relatedRecords?: {
        [_ in string]: unknown;
    }[];
    indexedAt: string;
    invitedBy?: ComAtprotoServerDefs.InviteCode;
    invites?: ComAtprotoServerDefs.InviteCode[];
    invitesDisabled?: boolean;
    emailConfirmedAt?: string;
    inviteNote?: string;
    deactivatedAt?: string;
    threatSignatures?: ThreatSignature[];
}
export declare function isAccountView<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.atproto.admin.defs", "accountView">;
export declare function validateAccountView<V>(v: V): ValidationResult<AccountView & V>;
export interface RepoRef {
    $type?: 'com.atproto.admin.defs#repoRef';
    did: string;
}
export declare function isRepoRef<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.atproto.admin.defs", "repoRef">;
export declare function validateRepoRef<V>(v: V): ValidationResult<RepoRef & V>;
export interface RepoBlobRef {
    $type?: 'com.atproto.admin.defs#repoBlobRef';
    did: string;
    cid: string;
    recordUri?: string;
}
export declare function isRepoBlobRef<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.atproto.admin.defs", "repoBlobRef">;
export declare function validateRepoBlobRef<V>(v: V): ValidationResult<RepoBlobRef & V>;
export interface ThreatSignature {
    $type?: 'com.atproto.admin.defs#threatSignature';
    property: string;
    value: string;
}
export declare function isThreatSignature<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.atproto.admin.defs", "threatSignature">;
export declare function validateThreatSignature<V>(v: V): ValidationResult<ThreatSignature & V>;
//# sourceMappingURL=defs.d.ts.map