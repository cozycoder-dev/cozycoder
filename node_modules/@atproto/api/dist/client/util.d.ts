/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult } from '@atproto/lexicon';
export type OmitKey<T, K extends keyof T> = {
    [K2 in keyof T as K2 extends K ? never : K2]: T[K2];
};
export type $Typed<V, T extends string = string> = V & {
    $type: T;
};
export type Un$Typed<V extends {
    $type?: string;
}> = OmitKey<V, '$type'>;
export type $Type<Id extends string, Hash extends string> = Hash extends 'main' ? Id : `${Id}#${Hash}`;
export type $TypedObject<V, Id extends string, Hash extends string> = V extends {
    $type: $Type<Id, Hash>;
} ? V : V extends {
    $type?: string;
} ? V extends {
    $type?: infer T extends $Type<Id, Hash>;
} ? V & {
    $type: T;
} : never : V & {
    $type: $Type<Id, Hash>;
};
export declare function is$typed<V, Id extends string, Hash extends string>(v: V, id: Id, hash: Hash): v is $TypedObject<V, Id, Hash>;
export declare function maybe$typed<V, Id extends string, Hash extends string>(v: V, id: Id, hash: Hash): v is V & object & {
    $type?: $Type<Id, Hash>;
};
export type Validator<R = unknown> = (v: unknown) => ValidationResult<R>;
export type ValidatorParam<V extends Validator> = V extends Validator<infer R> ? R : never;
/**
 * Utility function that allows to convert a "validate*" utility function into a
 * type predicate.
 */
export declare function asPredicate<V extends Validator>(validate: V): <T>(v: T) => v is T & ValidatorParam<V>;
//# sourceMappingURL=util.d.ts.map