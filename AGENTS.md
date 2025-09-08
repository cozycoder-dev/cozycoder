# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Rust CLI application called `mcpkg` built with the Clap library for command-line argument parsing. The project is configured for the 2024 Rust edition and implements both CLI functionality and an MCP (Model Context Protocol) server using the `rmcp` library.

## Common Commands

### Building and Running

```bash
cargo build
cargo run
cargo run -- init
cargo run -- mcp
```

### Development Commands

```bash
cargo check      # Fast compilation check
cargo test        # Run tests
cargo clippy      # Linting
cargo fmt         # Code formatting
```

## Architecture

The project follows a modular structure:

- `src/main.rs`: Entry point with async main that delegates to the CLI module
- `src/cli.rs`: CLI implementation using Clap derive macros with subcommand architecture
- `src/mcp.rs`: MCP server implementation using rmcp library with stdio transport

### CLI Structure
- Main `Cli` struct with optional subcommands using `arg_required_else_help = true`
- `Commands` enum with `Init` and `Mcp` subcommands
- Uses Clap 4.x with derive features for argument parsing

### MCP Server Structure
- `Server` struct implements both `ServerHandler` and prompt routing via `#[prompt_router]`
- Supports prompts capability with example prompt implementation
- Supports resources capability with example resource at `instruction://insights`
- Uses stdio transport for communication
- Built with rmcp 0.6.3 with transport-io features

The application is designed to work as both a CLI tool and an MCP server, with the MCP functionality providing prompts and resources to MCP clients.