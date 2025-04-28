use clap::{Parser, Subcommand};
use cozycoder_mcp_server::run_mcp_server;

#[derive(Parser)]
#[command(author, version, about, long_about = None, arg_required_else_help = true)]
struct Cli {
    #[command(subcommand)]
    command: Option<Commands>,
}

#[derive(Subcommand)]
enum Commands {
    Mcp,
}

pub async fn run() {
    let cli = Cli::parse();

    if let Some(command) = &cli.command {
        match command {
            Commands::Mcp => {
                let _ = run_mcp_server().await;
            }
        }
    }
}
