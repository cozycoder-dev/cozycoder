use clap::{Parser, Subcommand};
use color_eyre::eyre::{Ok, Result};

use crate::tui;

#[derive(Parser)]
#[command(version, about, long_about = None, arg_required_else_help = true)]
struct Cli {
    #[command(subcommand)]
    command: Option<Commands>,
}

#[derive(Subcommand)]
enum Commands {
    Chat,
}

pub fn run() -> Result<()> {
    let cli = Cli::parse();
    match &cli.command {
        Some(Commands::Chat) => tui::run_chat(),
        None => Ok(()),
    }
}
