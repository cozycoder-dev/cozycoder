/// <reference types="./function.d.mts" />
export function identity(x) {
  return x;
}

export function tap(arg, effect) {
  effect(arg);
  return arg;
}
