# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands
- Build: `cargo build`
- Run: `cargo run --bin cozycoder`
- Dev mode: `mise run dev` or `bacon run -- --bin cozycoder`
- Check: `cargo check`
- Lint: `cargo clippy`
- Format: `cargo fmt`
- Test: `cargo test`
- Single test: `cargo test <test_name>`
- Test with output: `cargo test -- --nocapture`

## Code Style Guidelines
- **Formatting**: Use rustfmt with default settings
- **Imports**: Group by standard lib, external crates, then internal modules
- **Naming**: Use snake_case for variables/functions, CamelCase for types/traits
- **Error handling**: Prefer Result types with descriptive errors
- **Documentation**: Document public APIs with rustdoc comments
- **Types**: Use strong typing, avoid `impl Trait` except in return positions
- **Testing**: Write unit tests in the same file as the code being tested
- **Organization**: Keep modules focused on a single responsibility