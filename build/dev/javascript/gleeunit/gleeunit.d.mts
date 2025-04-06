import type * as _ from "./gleam.d.mts";

declare type Atom$ = any;

declare class Utf8 extends _.CustomType {}

declare type Encoding$ = Utf8;

declare class GleeunitProgress extends _.CustomType {}

declare type ReportModuleName$ = GleeunitProgress;

declare class Colored extends _.CustomType {
  constructor(argument$0: boolean);
  
  0: boolean;
}

declare type GleeunitProgressOption$ = Colored;

declare class Verbose extends _.CustomType {}

declare class NoTty extends _.CustomType {}

declare class Report extends _.CustomType {
  constructor(argument$0: [ReportModuleName$, _.List<GleeunitProgressOption$>]);
  
  0: [ReportModuleName$, _.List<GleeunitProgressOption$>];
}

declare type EunitOption$ = Verbose | NoTty | Report;

export function main(): undefined;
