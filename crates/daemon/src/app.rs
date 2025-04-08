use axum::{Router, routing::get};
use std::sync::Arc;

pub struct AppState {
    // Empty struct, but we'll keep it for future use
}

pub fn run() -> Router {
    // Create app state
    let app_state = Arc::new(AppState {});

    // Create router with handler
    Router::new()
        .route("/", get(crate::web::index::index_handler))
        .with_state(app_state)
}
