# Stage 2: Rust build
FROM rust:alpine AS rust_builder

WORKDIR /app

# Install build dependencies
RUN apk add --no-cache musl-dev

# Copy source code and built assets
COPY Cargo.toml Cargo.lock* ./
COPY crates ./crates

# Build the release with static linking
RUN cargo build --bin daemon --release

# Stage 3: Final scratch image
FROM scratch AS daemon

WORKDIR /app

ENTRYPOINT ["/app/cozycoder"]

COPY --from=rust_builder /app/target/release/daemon /app/cozycoder
