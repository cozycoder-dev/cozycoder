import type * as _ from "../gleam.d.mts";
import type * as $option from "../gleam/option.d.mts";

export type Dict$<KU, KV> = any;

export function size(dict: Dict$<any, any>): number;

export function is_empty(dict: Dict$<any, any>): boolean;

export function to_list<LE, LF>(dict: Dict$<LE, LF>): _.List<[LE, LF]>;

export function new$(): Dict$<any, any>;

export function get<MH, MI>(from: Dict$<MH, MI>, get: MH): _.Result<
  MI,
  undefined
>;

export function has_key<LV>(dict: Dict$<LV, any>, key: LV): boolean;

export function insert<MN, MO>(dict: Dict$<MN, MO>, key: MN, value: MO): Dict$<
  MN,
  MO
>;

export function from_list<LJ, LK>(list: _.List<[LJ, LK]>): Dict$<LJ, LK>;

export function keys<NN>(dict: Dict$<NN, any>): _.List<NN>;

export function values<OC>(dict: Dict$<any, OC>): _.List<OC>;

export function take<OX, OY>(dict: Dict$<OX, OY>, desired_keys: _.List<OX>): Dict$<
  OX,
  OY
>;

export function merge<PU, PV>(dict: Dict$<PU, PV>, new_entries: Dict$<PU, PV>): Dict$<
  PU,
  PV
>;

export function delete$<QP, QQ>(dict: Dict$<QP, QQ>, key: QP): Dict$<QP, QQ>;

export function drop<RB, RC>(dict: Dict$<RB, RC>, disallowed_keys: _.List<RB>): Dict$<
  RB,
  RC
>;

export function upsert<RI, RJ>(
  dict: Dict$<RI, RJ>,
  key: RI,
  fun: (x0: $option.Option$<RJ>) => RJ
): Dict$<RI, RJ>;

export function fold<RP, RQ, RT>(
  dict: Dict$<RP, RQ>,
  initial: RT,
  fun: (x0: RT, x1: RP, x2: RQ) => RT
): RT;

export function map_values<MZ, NA, ND>(
  dict: Dict$<MZ, NA>,
  fun: (x0: MZ, x1: NA) => ND
): Dict$<MZ, ND>;

export function filter<OL, OM>(
  dict: Dict$<OL, OM>,
  predicate: (x0: OL, x1: OM) => boolean
): Dict$<OL, OM>;

export function each<RY, RZ>(dict: Dict$<RY, RZ>, fun: (x0: RY, x1: RZ) => any): undefined;

export function combine<SD, SE>(
  dict: Dict$<SD, SE>,
  other: Dict$<SD, SE>,
  fun: (x0: SE, x1: SE) => SE
): Dict$<SD, SE>;
