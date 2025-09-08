"""
FastMCP quickstart example.

cd to the `examples/snippets/clients` directory and run:
    uv run server fastmcp_quickstart stdio
"""

from mcp.server.fastmcp import FastMCP

# Create an MCP server
mcp = FastMCP("mcpkg")


@mcp.prompt()
def analyze_product() -> str:
    return """# Analyze Product

Analyze your product's codebase and install Agent OS

Refer to the instructions located in this file:
instruction://analyze-product"""


@mcp.resource("instruction://{name}")
def read_instruction(name: str) -> str:
    with open(f".mcpkg/instructions/{name}.md", "r") as f:
        return f.read()
