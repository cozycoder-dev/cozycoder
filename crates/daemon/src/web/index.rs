use axum::{extract::State, response::Json};
use serde_json::Value;
use std::sync::Arc;

use crate::app::AppState;

pub async fn index_handler(State(_state): State<Arc<AppState>>) -> Json<Value> {
    Json(serde_json::json!({
        "status": "✅"
    }))
}
