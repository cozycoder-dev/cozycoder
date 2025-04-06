/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult } from '@atproto/lexicon';
export interface InviteCode {
    $type?: 'com.atproto.server.defs#inviteCode';
    code: string;
    available: number;
    disabled: boolean;
    forAccount: string;
    createdBy: string;
    createdAt: string;
    uses: InviteCodeUse[];
}
export declare function isInviteCode<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.atproto.server.defs", "inviteCode">;
export declare function validateInviteCode<V>(v: V): ValidationResult<InviteCode & V>;
export interface InviteCodeUse {
    $type?: 'com.atproto.server.defs#inviteCodeUse';
    usedBy: string;
    usedAt: string;
}
export declare function isInviteCodeUse<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.atproto.server.defs", "inviteCodeUse">;
export declare function validateInviteCodeUse<V>(v: V): ValidationResult<InviteCodeUse & V>;
//# sourceMappingURL=defs.d.ts.map