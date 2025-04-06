/// <reference types="./cozycoder.d.mts" />
import * as $io from "../gleam_stdlib/gleam/io.mjs";
import * as $string from "../gleam_stdlib/gleam/string.mjs";
import { createPds as create_pds, pdsVersion as pds_version } from "./cozycoder_ffi.mjs";

export { create_pds, pds_version };

export function main() {
  return $io.println($string.append("Hello, PDS version : ", pds_version()));
}
