/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult } from '@atproto/lexicon';
/** width:height represents an aspect ratio. It may be approximate, and may not correspond to absolute dimensions in any given unit. */
export interface AspectRatio {
    $type?: 'app.bsky.embed.defs#aspectRatio';
    width: number;
    height: number;
}
export declare function isAspectRatio<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.embed.defs", "aspectRatio">;
export declare function validateAspectRatio<V>(v: V): ValidationResult<AspectRatio & V>;
//# sourceMappingURL=defs.d.ts.map