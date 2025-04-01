use color_eyre::eyre::Result;
use crossterm::event::{self, Event};
use ratatui::{DefaultTerminal, Frame};

pub(crate) fn run_chat() -> Result<()> {
    color_eyre::install()?;
    let terminal = ratatui::init();
    let result = show(terminal);
    ratatui::restore();
    result
}

fn show(mut terminal: DefaultTerminal) -> Result<()> {
    loop {
        terminal.draw(render)?;
        if matches!(event::read()?, Event::Key(_)) {
            break Ok(());
        }
    }
}

fn render(frame: &mut Frame) {
    frame.render_widget("hello world", frame.area());
}
