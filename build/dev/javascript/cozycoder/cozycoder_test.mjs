/// <reference types="./cozycoder_test.d.mts" />
import * as $gleeunit from "../gleeunit/gleeunit.mjs";
import * as $should from "../gleeunit/gleeunit/should.mjs";

export function main() {
  return $gleeunit.main();
}

export function hello_world_test() {
  let _pipe = 1;
  return $should.equal(_pipe, 1);
}
