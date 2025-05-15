import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

export function mcpCreateServer({ info, prompts }) {
  const enabledPrompts = {};
  prompts.forEach((name) => {
    enabledPrompts[name] = true;
  });
  return new Server(info, { capabilities: { prompts: enabledPrompts } });
}

export async function mcpConnectStdio(server) {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}
