# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Environment

This is a Phoenix application built with Elixir that provides tools for AI coding agents. Use `mise` for environment management.

### Setup Commands
```bash
mise install                    # Install required tools
mix ecto.create                # Create database
mix setup                      # Install deps and setup database
```

### Common Commands
```bash
mix phx.server                 # Start development server
mix test                       # Run all tests  
mix ecto.migrate              # Run database migrations
mix ecto.reset                # Drop and recreate database
```

## Architecture

- **Phoenix Framework**: Web framework with JSON API endpoints
- **Database**: SQLite with Ecto ORM
- **Structure**: Standard Phoenix app layout with `lib/cozycoder/` for business logic and `lib/cozycoder_web/` for web layer
- **Configuration**: Uses binary IDs and UTC timestamps by default
- **Supervision Tree**: Standard Phoenix setup with Repo, PubSub, Telemetry, and Endpoint

### Key Components
- `CozyCoder.Application`: OTP application with auto-migration support
- `CozyCoderWeb.Router`: API-only routes under `/api` scope
- `CozyCoder.Repo`: Ecto repository for SQLite database
- LiveDashboard available at `/dev/dashboard` in development

The application is containerized with Docker and includes automatic database migrations in release mode.