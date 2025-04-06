/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult } from '@atproto/lexicon';
export interface IdentityInfo {
    $type?: 'com.atproto.identity.defs#identityInfo';
    did: string;
    /** The validated handle of the account; or 'handle.invalid' if the handle did not bi-directionally match the DID document. */
    handle: string;
    /** The complete DID document for the identity. */
    didDoc: {
        [_ in string]: unknown;
    };
}
export declare function isIdentityInfo<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.atproto.identity.defs", "identityInfo">;
export declare function validateIdentityInfo<V>(v: V): ValidationResult<IdentityInfo & V>;
//# sourceMappingURL=defs.d.ts.map