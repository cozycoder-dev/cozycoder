# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a minimal Python project called `mcpkg` configured with modern Python packaging using `pyproject.toml`. The project currently contains a simple "Hello World" script as a starting point.

## Development Setup

- **Python Version**: 3.13 (specified in `.python-version`)
- **Package Configuration**: Uses `pyproject.toml` for project metadata and tool configuration
- **Type Checking**: Configured with Pyright (settings in `pyproject.toml`)

## Common Commands

### Running the Application

```bash
uv run main.py
```

### Package Management

This project uses standard Python packaging with `pyproject.toml`. `uv` is used as a package manager. New dependencies can be added via:

```bash
uv add <dependency>
```

## Architecture

Currently a single-file Python project with:

- `main.py`: Entry point with basic hello world functionality
- `pyproject.toml`: Project configuration and metadata
- Standard Python `.gitignore` for build artifacts and virtual environments

The project is set up for expansion into a proper Python package structure as needed.

