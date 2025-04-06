import type * as _ from "../../gleam.d.mts";
import type * as $dict from "../../gleam/dict.d.mts";
import type * as $dynamic from "../../gleam/dynamic.d.mts";
import type * as $option from "../../gleam/option.d.mts";

export class DecodeError extends _.CustomType {
  constructor(expected: string, found: string, path: _.List<string>);
  
  expected: string;
  found: string;
  path: _.List<string>;
}

export type DecodeError$ = DecodeError;

declare class Decoder<DMS> extends _.CustomType {
  constructor(function$: (x0: $dynamic.Dynamic$) => [any, _.List<DecodeError$>]);
  
  function$: (x0: $dynamic.Dynamic$) => [any, _.List<DecodeError$>];
}

export type Decoder$<DMS> = Decoder<DMS>;

export type Dynamic = $dynamic.Dynamic$;

export function run<DNA>(data: $dynamic.Dynamic$, decoder: Decoder$<DNA>): _.Result<
  DNA,
  _.List<DecodeError$>
>;

export function success<DOB>(data: DOB): Decoder$<DOB>;

export function map<DQY, DRA>(
  decoder: Decoder$<DQY>,
  transformer: (x0: DQY) => DRA
): Decoder$<DRA>;

export function map_errors<DRC>(
  decoder: Decoder$<DRC>,
  transformer: (x0: _.List<DecodeError$>) => _.List<DecodeError$>
): Decoder$<DRC>;

export function then$<DRK, DRM>(
  decoder: Decoder$<DRK>,
  next: (x0: DRK) => Decoder$<DRM>
): Decoder$<DRM>;

export function one_of<DRP>(
  first: Decoder$<DRP>,
  alternatives: _.List<Decoder$<DRP>>
): Decoder$<DRP>;

export function recursive<DSF>(inner: () => Decoder$<DSF>): Decoder$<DSF>;

export function optional<DQU>(inner: Decoder$<DQU>): Decoder$<
  $option.Option$<DQU>
>;

export const dynamic: Decoder$<$dynamic.Dynamic$>;

export function decode_error(expected: string, found: $dynamic.Dynamic$): _.List<
  DecodeError$
>;

export function collapse_errors<DRH>(decoder: Decoder$<DRH>, name: string): Decoder$<
  DRH
>;

export function failure<DRZ>(zero: DRZ, expected: string): Decoder$<DRZ>;

export function new_primitive_decoder<DSB>(
  name: string,
  decoding_function: (x0: $dynamic.Dynamic$) => _.Result<DSB, DSB>
): Decoder$<DSB>;

export const bool: Decoder$<boolean>;

export const int: Decoder$<number>;

export const float: Decoder$<number>;

export const bit_array: Decoder$<_.BitArray>;

export const string: Decoder$<string>;

export function dict<DPZ, DQB>(key: Decoder$<DPZ>, value: Decoder$<DQB>): Decoder$<
  $dict.Dict$<DPZ, DQB>
>;

export function list<DPN>(inner: Decoder$<DPN>): Decoder$<_.List<DPN>>;

export function subfield<DMV, DMX>(
  field_path: _.List<any>,
  field_decoder: Decoder$<DMV>,
  next: (x0: DMV) => Decoder$<DMX>
): Decoder$<DMX>;

export function at<DNH>(path: _.List<any>, inner: Decoder$<DNH>): Decoder$<DNH>;

export function field<DOF, DOH>(
  field_name: any,
  field_decoder: Decoder$<DOF>,
  next: (x0: DOF) => Decoder$<DOH>
): Decoder$<DOH>;

export function optional_field<DOL, DON>(
  key: any,
  default$: DOL,
  field_decoder: Decoder$<DOL>,
  next: (x0: DOL) => Decoder$<DON>
): Decoder$<DON>;

export function optionally_at<DOS>(
  path: _.List<any>,
  default$: DOS,
  inner: Decoder$<DOS>
): Decoder$<DOS>;
