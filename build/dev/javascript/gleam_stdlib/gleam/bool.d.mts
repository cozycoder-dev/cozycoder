export function and(a: boolean, b: boolean): boolean;

export function or(a: boolean, b: boolean): boolean;

export function negate(bool: boolean): boolean;

export function nor(a: boolean, b: boolean): boolean;

export function nand(a: boolean, b: boolean): boolean;

export function exclusive_or(a: boolean, b: boolean): boolean;

export function exclusive_nor(a: boolean, b: boolean): boolean;

export function to_string(bool: boolean): string;

export function guard<BUW>(
  requirement: boolean,
  consequence: BUW,
  alternative: () => BUW
): BUW;

export function lazy_guard<BUX>(
  requirement: boolean,
  consequence: () => BUX,
  alternative: () => BUX
): BUX;
