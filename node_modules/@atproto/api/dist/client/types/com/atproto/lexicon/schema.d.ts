/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult } from '@atproto/lexicon';
export interface Record {
    $type: 'com.atproto.lexicon.schema';
    /** Indicates the 'version' of the Lexicon language. Must be '1' for the current atproto/Lexicon schema system. */
    lexicon: number;
    [k: string]: unknown;
}
export declare function isRecord<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.atproto.lexicon.schema", "main">;
export declare function validateRecord<V>(v: V): ValidationResult<Record & V>;
//# sourceMappingURL=schema.d.ts.map