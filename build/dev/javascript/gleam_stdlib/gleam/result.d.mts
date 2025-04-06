import type * as _ from "../gleam.d.mts";

export function is_ok(result: _.Result<any, any>): boolean;

export function is_error(result: _.Result<any, any>): boolean;

export function map<BWU, BWV, BWY>(
  result: _.Result<BWU, BWV>,
  fun: (x0: BWU) => BWY
): _.Result<BWY, BWV>;

export function map_error<BXB, BXC, BXF>(
  result: _.Result<BXB, BXC>,
  fun: (x0: BXC) => BXF
): _.Result<BXB, BXF>;

export function flatten<BXI, BXJ>(result: _.Result<_.Result<BXI, BXJ>, BXJ>): _.Result<
  BXI,
  BXJ
>;

export function try$<BXQ, BXR, BXU>(
  result: _.Result<BXQ, BXR>,
  fun: (x0: BXQ) => _.Result<BXU, BXR>
): _.Result<BXU, BXR>;

export function then$<BXZ, BYA, BYD>(
  result: _.Result<BXZ, BYA>,
  fun: (x0: BXZ) => _.Result<BYD, BYA>
): _.Result<BYD, BYA>;

export function unwrap<BYI>(result: _.Result<BYI, any>, default$: BYI): BYI;

export function lazy_unwrap<BYM>(
  result: _.Result<BYM, any>,
  default$: () => BYM
): BYM;

export function unwrap_error<BYR>(result: _.Result<any, BYR>, default$: BYR): BYR;

export function unwrap_both<BYU>(result: _.Result<BYU, BYU>): BYU;

export function or<BYX, BYY>(
  first: _.Result<BYX, BYY>,
  second: _.Result<BYX, BYY>
): _.Result<BYX, BYY>;

export function lazy_or<BZF, BZG>(
  first: _.Result<BZF, BZG>,
  second: () => _.Result<BZF, BZG>
): _.Result<BZF, BZG>;

export function all<BZN, BZO>(results: _.List<_.Result<BZN, BZO>>): _.Result<
  _.List<BZN>,
  BZO
>;

export function partition<BZV, BZW>(results: _.List<_.Result<BZV, BZW>>): [
  _.List<BZV>,
  _.List<BZW>
];

export function replace<CAL, CAO>(result: _.Result<any, CAL>, value: CAO): _.Result<
  CAO,
  CAL
>;

export function replace_error<CAR, CAV>(result: _.Result<CAR, any>, error: CAV): _.Result<
  CAR,
  CAV
>;

export function values<CAY>(results: _.List<_.Result<CAY, any>>): _.List<CAY>;

export function try_recover<CBE, CBF, CBI>(
  result: _.Result<CBE, CBF>,
  fun: (x0: CBF) => _.Result<CBE, CBI>
): _.Result<CBE, CBI>;
