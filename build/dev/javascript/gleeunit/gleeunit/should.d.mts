import type * as $option from "../../gleam_stdlib/gleam/option.d.mts";
import type * as _ from "../gleam.d.mts";

export function equal<EUS>(a: EUS, b: EUS): undefined;

export function not_equal<EUT>(a: EUT, b: EUT): undefined;

export function be_ok<EUU>(a: _.Result<EUU, any>): EUU;

export function be_error<EUZ>(a: _.Result<any, EUZ>): EUZ;

export function be_some<EVC>(a: $option.Option$<EVC>): EVC;

export function be_none(a: $option.Option$<any>): undefined;

export function be_true(actual: boolean): undefined;

export function be_false(actual: boolean): undefined;

export function fail(): undefined;
