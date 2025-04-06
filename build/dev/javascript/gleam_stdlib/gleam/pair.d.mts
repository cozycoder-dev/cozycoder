export function first<YA>(pair: [YA, any]): YA;

export function second<YD>(pair: [any, YD]): YD;

export function swap<YE, YF>(pair: [YE, YF]): [YF, YE];

export function map_first<YG, YH, YI>(pair: [YG, YH], fun: (x0: YG) => YI): [
  YI,
  YH
];

export function map_second<YJ, YK, YL>(pair: [YJ, YK], fun: (x0: YK) => YL): [
  YJ,
  YL
];

export function new$<YM, YN>(first: YM, second: YN): [YM, YN];
