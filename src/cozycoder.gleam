import gleam/io
import gleam/string

pub type Pds

@external(javascript, "./cozycoder_ffi.mjs", "createPds")
pub fn create_pds() -> Pds

@external(javascript, "./cozycoder_ffi.mjs", "pdsVersion")
pub fn pds_version() -> String

pub fn main() {
  io.println(string.append("Hello, PDS version : ", pds_version()))
}
