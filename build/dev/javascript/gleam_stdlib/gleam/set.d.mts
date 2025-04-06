import type * as _ from "../gleam.d.mts";
import type * as $dict from "../gleam/dict.d.mts";

declare class Set<EDV> extends _.CustomType {
  constructor(dict: $dict.Dict$<any, undefined>);
  
  dict: $dict.Dict$<any, undefined>;
}

export type Set$<EDV> = Set<EDV>;

export function new$(): Set$<any>;

export function size(set: Set$<any>): number;

export function is_empty(set: Set$<any>): boolean;

export function contains<EEF>(set: Set$<EEF>, member: EEF): boolean;

export function delete$<EEH>(set: Set$<EEH>, member: EEH): Set$<EEH>;

export function to_list<EEK>(set: Set$<EEK>): _.List<EEK>;

export function fold<EEQ, EES>(
  set: Set$<EEQ>,
  initial: EES,
  reducer: (x0: EES, x1: EEQ) => EES
): EES;

export function filter<EET>(set: Set$<EET>, predicate: (x0: EET) => boolean): Set$<
  EET
>;

export function drop<EFA>(set: Set$<EFA>, disallowed: _.List<EFA>): Set$<EFA>;

export function take<EFE>(set: Set$<EFE>, desired: _.List<EFE>): Set$<EFE>;

export function intersection<EFR>(first: Set$<EFR>, second: Set$<EFR>): Set$<
  EFR
>;

export function difference<EFV>(first: Set$<EFV>, second: Set$<EFV>): Set$<EFV>;

export function is_subset<EFZ>(first: Set$<EFZ>, second: Set$<EFZ>): boolean;

export function is_disjoint<EGC>(first: Set$<EGC>, second: Set$<EGC>): boolean;

export function each<EGJ>(set: Set$<EGJ>, fun: (x0: EGJ) => any): undefined;

export function insert<EEC>(set: Set$<EEC>, member: EEC): Set$<EEC>;

export function from_list<EEN>(members: _.List<EEN>): Set$<EEN>;

export function map<EEW, EEY>(set: Set$<EEW>, fun: (x0: EEW) => EEY): Set$<EEY>;

export function union<EFI>(first: Set$<EFI>, second: Set$<EFI>): Set$<EFI>;

export function symmetric_difference<EGF>(first: Set$<EGF>, second: Set$<EGF>): Set$<
  EGF
>;
