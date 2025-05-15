import gleam/javascript/array.{type Array}

type Server

type ServerInfo {
  ServerInfo(name: String, version: String)
}

type ServerOptions {
  ServerOptions(info: ServerInfo, prompts: Array(String))
}

@external(javascript, "./cozycoder_ffi.mjs", "mcpCreateServer")
fn mcp_create_server(options: ServerOptions) -> Server

@external(javascript, "./cozycoder_ffi.mjs", "mcpConnectStdio")
fn mcp_connect_stdio(server: Server) -> Nil

pub fn main() -> Nil {
  let info = ServerInfo(name: "Cozy Coder", version: "0.1.0")
  let prompts = array.from_list(["helloWorld"])
  let server = mcp_create_server(ServerOptions(info, prompts))
  mcp_connect_stdio(server)
}
