/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult } from '@atproto/lexicon';
export interface CommitMeta {
    $type?: 'com.atproto.repo.defs#commitMeta';
    cid: string;
    rev: string;
}
export declare function isCommitMeta<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.atproto.repo.defs", "commitMeta">;
export declare function validateCommitMeta<V>(v: V): ValidationResult<CommitMeta & V>;
//# sourceMappingURL=defs.d.ts.map