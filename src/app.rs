use axum::{Router, routing::get};
use minijinja::Environment;
use std::sync::Arc;

pub struct AppState {
    pub env: Environment<'static>,
}

pub fn run() -> Router {
    // Create a minijinja environment
    let mut env = Environment::new();

    // Set up template loading from filesystem
    env.set_loader(minijinja::path_loader("templates"));

    // Create app state
    let app_state = Arc::new(AppState { env });

    // Create router with handler
    Router::new()
        .route("/", get(crate::web::index::index_handler))
        .with_state(app_state)
}
