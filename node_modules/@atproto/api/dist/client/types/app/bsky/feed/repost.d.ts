/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult } from '@atproto/lexicon';
import type * as ComAtprotoRepoStrongRef from '../../../com/atproto/repo/strongRef.js';
export interface Record {
    $type: 'app.bsky.feed.repost';
    subject: ComAtprotoRepoStrongRef.Main;
    createdAt: string;
    [k: string]: unknown;
}
export declare function isRecord<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.feed.repost", "main">;
export declare function validateRecord<V>(v: V): ValidationResult<Record & V>;
//# sourceMappingURL=repost.d.ts.map