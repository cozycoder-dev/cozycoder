import type * as _ from "../gleam.d.mts";
import type * as $dict from "../gleam/dict.d.mts";
import type * as $option from "../gleam/option.d.mts";

export type Dynamic$ = any;

export class DecodeError extends _.CustomType {
  constructor(expected: string, found: string, path: _.List<string>);
  
  expected: string;
  found: string;
  path: _.List<string>;
}

export type DecodeError$ = DecodeError;

declare type UnknownTuple$ = any;

export type DecodeErrors = _.List<DecodeError$>;

export type Decoder = (x0: Dynamic$) => _.Result<any, _.List<DecodeError$>>;

export function classify(data: Dynamic$): string;

export function from(a: any): Dynamic$;

export function dynamic(value: Dynamic$): _.Result<
  Dynamic$,
  _.List<DecodeError$>
>;

export function bit_array(data: Dynamic$): _.Result<
  _.BitArray,
  _.List<DecodeError$>
>;

export function string(data: Dynamic$): _.Result<string, _.List<DecodeError$>>;

export function int(data: Dynamic$): _.Result<number, _.List<DecodeError$>>;

export function float(data: Dynamic$): _.Result<number, _.List<DecodeError$>>;

export function bool(data: Dynamic$): _.Result<boolean, _.List<DecodeError$>>;

export function shallow_list(value: Dynamic$): _.Result<
  _.List<Dynamic$>,
  _.List<DecodeError$>
>;

export function optional<CII>(
  decode: (x0: Dynamic$) => _.Result<CII, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<$option.Option$<CII>, _.List<DecodeError$>>;

export function result<CHQ, CHS>(
  decode_ok: (x0: Dynamic$) => _.Result<CHQ, _.List<DecodeError$>>,
  decode_error: (x0: Dynamic$) => _.Result<CHS, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<_.Result<CHQ, CHS>, _.List<DecodeError$>>;

export function list<CID>(
  decoder_type: (x0: Dynamic$) => _.Result<CID, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<_.List<CID>, _.List<DecodeError$>>;

export function field<CIS>(
  name: any,
  inner_type: (x0: Dynamic$) => _.Result<CIS, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<CIS, _.List<DecodeError$>>;

export function optional_field<CIW>(
  name: any,
  inner_type: (x0: Dynamic$) => _.Result<CIW, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<$option.Option$<CIW>, _.List<DecodeError$>>;

export function element<CJE>(
  index: number,
  inner_type: (x0: Dynamic$) => _.Result<CJE, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<CJE, _.List<DecodeError$>>;

export function tuple2<CKE, CKG>(
  decode1: (x0: Dynamic$) => _.Result<CKE, _.List<DecodeError$>>,
  decode2: (x0: Dynamic$) => _.Result<CKG, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<[CKE, CKG], _.List<DecodeError$>>;

export function tuple3<CKJ, CKL, CKN>(
  decode1: (x0: Dynamic$) => _.Result<CKJ, _.List<DecodeError$>>,
  decode2: (x0: Dynamic$) => _.Result<CKL, _.List<DecodeError$>>,
  decode3: (x0: Dynamic$) => _.Result<CKN, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<[CKJ, CKL, CKN], _.List<DecodeError$>>;

export function tuple4<CKQ, CKS, CKU, CKW>(
  decode1: (x0: Dynamic$) => _.Result<CKQ, _.List<DecodeError$>>,
  decode2: (x0: Dynamic$) => _.Result<CKS, _.List<DecodeError$>>,
  decode3: (x0: Dynamic$) => _.Result<CKU, _.List<DecodeError$>>,
  decode4: (x0: Dynamic$) => _.Result<CKW, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<[CKQ, CKS, CKU, CKW], _.List<DecodeError$>>;

export function tuple5<CKZ, CLB, CLD, CLF, CLH>(
  decode1: (x0: Dynamic$) => _.Result<CKZ, _.List<DecodeError$>>,
  decode2: (x0: Dynamic$) => _.Result<CLB, _.List<DecodeError$>>,
  decode3: (x0: Dynamic$) => _.Result<CLD, _.List<DecodeError$>>,
  decode4: (x0: Dynamic$) => _.Result<CLF, _.List<DecodeError$>>,
  decode5: (x0: Dynamic$) => _.Result<CLH, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<[CKZ, CLB, CLD, CLF, CLH], _.List<DecodeError$>>;

export function tuple6<CLK, CLM, CLO, CLQ, CLS, CLU>(
  decode1: (x0: Dynamic$) => _.Result<CLK, _.List<DecodeError$>>,
  decode2: (x0: Dynamic$) => _.Result<CLM, _.List<DecodeError$>>,
  decode3: (x0: Dynamic$) => _.Result<CLO, _.List<DecodeError$>>,
  decode4: (x0: Dynamic$) => _.Result<CLQ, _.List<DecodeError$>>,
  decode5: (x0: Dynamic$) => _.Result<CLS, _.List<DecodeError$>>,
  decode6: (x0: Dynamic$) => _.Result<CLU, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<
  [CLK, CLM, CLO, CLQ, CLS, CLU],
  _.List<DecodeError$>
>;

export function dict<CLX, CLZ>(
  key_type: (x0: Dynamic$) => _.Result<CLX, _.List<DecodeError$>>,
  value_type: (x0: Dynamic$) => _.Result<CLZ, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<$dict.Dict$<CLX, CLZ>, _.List<DecodeError$>>;

export function any<CMI>(
  decoders: _.List<(x0: Dynamic$) => _.Result<CMI, _.List<DecodeError$>>>
): (x0: Dynamic$) => _.Result<CMI, _.List<DecodeError$>>;

export function decode1<CMQ, CMR>(
  constructor: (x0: CMQ) => CMR,
  t1: (x0: Dynamic$) => _.Result<CMQ, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<CMR, _.List<DecodeError$>>;

export function decode2<CMU, CMV, CMW>(
  constructor: (x0: CMU, x1: CMV) => CMW,
  t1: (x0: Dynamic$) => _.Result<CMU, _.List<DecodeError$>>,
  t2: (x0: Dynamic$) => _.Result<CMV, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<CMW, _.List<DecodeError$>>;

export function decode3<CNA, CNB, CNC, CND>(
  constructor: (x0: CNA, x1: CNB, x2: CNC) => CND,
  t1: (x0: Dynamic$) => _.Result<CNA, _.List<DecodeError$>>,
  t2: (x0: Dynamic$) => _.Result<CNB, _.List<DecodeError$>>,
  t3: (x0: Dynamic$) => _.Result<CNC, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<CND, _.List<DecodeError$>>;

export function decode4<CNI, CNJ, CNK, CNL, CNM>(
  constructor: (x0: CNI, x1: CNJ, x2: CNK, x3: CNL) => CNM,
  t1: (x0: Dynamic$) => _.Result<CNI, _.List<DecodeError$>>,
  t2: (x0: Dynamic$) => _.Result<CNJ, _.List<DecodeError$>>,
  t3: (x0: Dynamic$) => _.Result<CNK, _.List<DecodeError$>>,
  t4: (x0: Dynamic$) => _.Result<CNL, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<CNM, _.List<DecodeError$>>;

export function decode5<CNS, CNT, CNU, CNV, CNW, CNX>(
  constructor: (x0: CNS, x1: CNT, x2: CNU, x3: CNV, x4: CNW) => CNX,
  t1: (x0: Dynamic$) => _.Result<CNS, _.List<DecodeError$>>,
  t2: (x0: Dynamic$) => _.Result<CNT, _.List<DecodeError$>>,
  t3: (x0: Dynamic$) => _.Result<CNU, _.List<DecodeError$>>,
  t4: (x0: Dynamic$) => _.Result<CNV, _.List<DecodeError$>>,
  t5: (x0: Dynamic$) => _.Result<CNW, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<CNX, _.List<DecodeError$>>;

export function decode6<COE, COF, COG, COH, COI, COJ, COK>(
  constructor: (x0: COE, x1: COF, x2: COG, x3: COH, x4: COI, x5: COJ) => COK,
  t1: (x0: Dynamic$) => _.Result<COE, _.List<DecodeError$>>,
  t2: (x0: Dynamic$) => _.Result<COF, _.List<DecodeError$>>,
  t3: (x0: Dynamic$) => _.Result<COG, _.List<DecodeError$>>,
  t4: (x0: Dynamic$) => _.Result<COH, _.List<DecodeError$>>,
  t5: (x0: Dynamic$) => _.Result<COI, _.List<DecodeError$>>,
  t6: (x0: Dynamic$) => _.Result<COJ, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<COK, _.List<DecodeError$>>;

export function decode7<COS, COT, COU, COV, COW, COX, COY, COZ>(
  constructor: (x0: COS, x1: COT, x2: COU, x3: COV, x4: COW, x5: COX, x6: COY) => COZ,
  t1: (x0: Dynamic$) => _.Result<COS, _.List<DecodeError$>>,
  t2: (x0: Dynamic$) => _.Result<COT, _.List<DecodeError$>>,
  t3: (x0: Dynamic$) => _.Result<COU, _.List<DecodeError$>>,
  t4: (x0: Dynamic$) => _.Result<COV, _.List<DecodeError$>>,
  t5: (x0: Dynamic$) => _.Result<COW, _.List<DecodeError$>>,
  t6: (x0: Dynamic$) => _.Result<COX, _.List<DecodeError$>>,
  t7: (x0: Dynamic$) => _.Result<COY, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<COZ, _.List<DecodeError$>>;

export function decode8<CPI, CPJ, CPK, CPL, CPM, CPN, CPO, CPP, CPQ>(
  constructor: (
    x0: CPI,
    x1: CPJ,
    x2: CPK,
    x3: CPL,
    x4: CPM,
    x5: CPN,
    x6: CPO,
    x7: CPP
  ) => CPQ,
  t1: (x0: Dynamic$) => _.Result<CPI, _.List<DecodeError$>>,
  t2: (x0: Dynamic$) => _.Result<CPJ, _.List<DecodeError$>>,
  t3: (x0: Dynamic$) => _.Result<CPK, _.List<DecodeError$>>,
  t4: (x0: Dynamic$) => _.Result<CPL, _.List<DecodeError$>>,
  t5: (x0: Dynamic$) => _.Result<CPM, _.List<DecodeError$>>,
  t6: (x0: Dynamic$) => _.Result<CPN, _.List<DecodeError$>>,
  t7: (x0: Dynamic$) => _.Result<CPO, _.List<DecodeError$>>,
  t8: (x0: Dynamic$) => _.Result<CPP, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<CPQ, _.List<DecodeError$>>;

export function decode9<CQA, CQB, CQC, CQD, CQE, CQF, CQG, CQH, CQI, CQJ>(
  constructor: (
    x0: CQA,
    x1: CQB,
    x2: CQC,
    x3: CQD,
    x4: CQE,
    x5: CQF,
    x6: CQG,
    x7: CQH,
    x8: CQI
  ) => CQJ,
  t1: (x0: Dynamic$) => _.Result<CQA, _.List<DecodeError$>>,
  t2: (x0: Dynamic$) => _.Result<CQB, _.List<DecodeError$>>,
  t3: (x0: Dynamic$) => _.Result<CQC, _.List<DecodeError$>>,
  t4: (x0: Dynamic$) => _.Result<CQD, _.List<DecodeError$>>,
  t5: (x0: Dynamic$) => _.Result<CQE, _.List<DecodeError$>>,
  t6: (x0: Dynamic$) => _.Result<CQF, _.List<DecodeError$>>,
  t7: (x0: Dynamic$) => _.Result<CQG, _.List<DecodeError$>>,
  t8: (x0: Dynamic$) => _.Result<CQH, _.List<DecodeError$>>,
  t9: (x0: Dynamic$) => _.Result<CQI, _.List<DecodeError$>>
): (x0: Dynamic$) => _.Result<CQJ, _.List<DecodeError$>>;
