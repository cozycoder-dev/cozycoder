use crate::notebook::Notebook;
use leptos::prelude::*;
use uuid::Uuid;
use web_sys::window;

// Function to get or create a notebook ID
fn get_or_create_notebook_id() -> String {
    if let Some(win) = window() {
        if let Ok(Some(storage)) = win.local_storage() {
            // Try to get existing ID
            if let Ok(Some(id)) = storage.get_item("current_notebook_id") {
                return id;
            }

            // Create and store a new ID if none exists
            let new_id = Uuid::new_v4().to_string();
            let _ = storage.set_item("current_notebook_id", &new_id);

            return new_id;
        }
    }

    // Fallback
    Uuid::new_v4().to_string()
}

#[component]
pub fn App() -> impl IntoView {
    // Get or create a notebook ID
    let notebook_id = get_or_create_notebook_id();

    view! {
        <div class="container mx-auto p-4">
            <Notebook id=notebook_id />
        </div>
    }
}
