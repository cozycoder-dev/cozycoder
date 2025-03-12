use axum::{extract::State, response::Html};
use minijinja::context;
use std::sync::Arc;

use crate::app::AppState;

pub async fn index_handler(State(state): State<Arc<AppState>>) -> Html<String> {
    let template = state.env.get_template("home.html").unwrap();
    let rendered = template.render(context! {}).unwrap();

    Html(rendered)
}
