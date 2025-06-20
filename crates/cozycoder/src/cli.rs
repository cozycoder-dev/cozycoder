use clap::Parser;

#[derive(Parser)]
#[command(author, version, about, long_about = None,  arg_required_else_help = true)]
struct Cli {}

pub fn run() {
    let _cli = Cli::parse();
}
