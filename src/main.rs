mod cli;
mod mcp;

#[tokio::main]
async fn main() {
    cli::run().await;
}
