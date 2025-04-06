/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult } from '@atproto/lexicon';
import type * as ComAtprotoRepoStrongRef from '../../../com/atproto/repo/strongRef.js';
export interface Record {
    $type: 'app.bsky.feed.like';
    subject: ComAtprotoRepoStrongRef.Main;
    createdAt: string;
    [k: string]: unknown;
}
export declare function isRecord<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.feed.like", "main">;
export declare function validateRecord<V>(v: V): ValidationResult<Record & V>;
//# sourceMappingURL=like.d.ts.map