import { PDS } from "@atproto/pds";
import pkg from "@atproto/pds/package.json" with { type: "json" };

export function pdsVersion() {
  return pkg.version;
}

export function createPds() {
  return PDS.create();
}
