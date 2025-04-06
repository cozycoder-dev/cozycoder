/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult } from '@atproto/lexicon';
export interface Record {
    $type: 'chat.bsky.actor.declaration';
    allowIncoming: 'all' | 'none' | 'following' | (string & {});
    [k: string]: unknown;
}
export declare function isRecord<V>(v: V): v is import("../../../../util").$TypedObject<V, "chat.bsky.actor.declaration", "main">;
export declare function validateRecord<V>(v: V): ValidationResult<Record & V>;
//# sourceMappingURL=declaration.d.ts.map