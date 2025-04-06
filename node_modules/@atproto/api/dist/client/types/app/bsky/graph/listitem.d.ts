/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult } from '@atproto/lexicon';
export interface Record {
    $type: 'app.bsky.graph.listitem';
    /** The account which is included on the list. */
    subject: string;
    /** Reference (AT-URI) to the list record (app.bsky.graph.list). */
    list: string;
    createdAt: string;
    [k: string]: unknown;
}
export declare function isRecord<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.graph.listitem", "main">;
export declare function validateRecord<V>(v: V): ValidationResult<Record & V>;
//# sourceMappingURL=listitem.d.ts.map