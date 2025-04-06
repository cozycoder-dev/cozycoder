/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult } from '@atproto/lexicon';
export interface Set {
    $type?: 'tools.ozone.set.defs#set';
    name: string;
    description?: string;
}
export declare function isSet<V>(v: V): v is import("../../../../util").$TypedObject<V, "tools.ozone.set.defs", "set">;
export declare function validateSet<V>(v: V): ValidationResult<Set & V>;
export interface SetView {
    $type?: 'tools.ozone.set.defs#setView';
    name: string;
    description?: string;
    setSize: number;
    createdAt: string;
    updatedAt: string;
}
export declare function isSetView<V>(v: V): v is import("../../../../util").$TypedObject<V, "tools.ozone.set.defs", "setView">;
export declare function validateSetView<V>(v: V): ValidationResult<SetView & V>;
//# sourceMappingURL=defs.d.ts.map