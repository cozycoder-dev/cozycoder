import type * as _ from "../gleam.d.mts";

export class Some<GA> extends _.CustomType {
  constructor(argument$0: GA);
  
  0: GA;
}

export class None extends _.CustomType {}

export type Option$<GA> = Some<GA> | None;

export function all<GB>(list: _.List<Option$<GB>>): Option$<_.List<GB>>;

export function is_some(option: Option$<any>): boolean;

export function is_none(option: Option$<any>): boolean;

export function to_result<GQ, GT>(option: Option$<GQ>, e: GT): _.Result<GQ, GT>;

export function from_result<GW>(result: _.Result<GW, any>): Option$<GW>;

export function unwrap<HB>(option: Option$<HB>, default$: HB): HB;

export function lazy_unwrap<HD>(option: Option$<HD>, default$: () => HD): HD;

export function map<HF, HH>(option: Option$<HF>, fun: (x0: HF) => HH): Option$<
  HH
>;

export function flatten<HJ>(option: Option$<Option$<HJ>>): Option$<HJ>;

export function then$<HN, HP>(option: Option$<HN>, fun: (x0: HN) => Option$<HP>): Option$<
  HP
>;

export function or<HS>(first: Option$<HS>, second: Option$<HS>): Option$<HS>;

export function lazy_or<HW>(first: Option$<HW>, second: () => Option$<HW>): Option$<
  HW
>;

export function values<IA>(options: _.List<Option$<IA>>): _.List<IA>;
