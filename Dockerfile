# Stage 1: Node.js for assets
FROM node:lts-alpine AS node_builder

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY assets/ ./assets/
COPY src/ ./src/

RUN mkdir -p public && \
  cp node_modules/htmx.org/dist/htmx.min.js public/ && \
  npx @tailwindcss/cli -i ./assets/styles.css -o ./public/styles.css

# Stage 2: Rust build
FROM rust:alpine AS rust_builder

WORKDIR /app
# Install build dependencies
RUN apk add --no-cache musl-dev

# Copy Cargo files for dependency caching
COPY Cargo.toml Cargo.lock* ./
RUN mkdir -p src && \
  echo "fn main() {}" > src/main.rs && \
  cargo build --release && \
  rm -rf src/

# Copy source code and built assets
COPY src/ ./src/
COPY --from=node_builder /app/public/ ./public/

# Build the release with static linking
RUN cargo build --release

# Stage 3: Final scratch image
FROM scratch

WORKDIR /app

ENTRYPOINT ["/app/cozycoder"]

COPY --from=rust_builder /app/target/release/cozycoder /app/cozycoder
COPY --from=rust_builder /app/public/ /app/public/

