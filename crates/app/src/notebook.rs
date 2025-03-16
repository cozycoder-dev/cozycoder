use leptos::prelude::*;
use wasm_bindgen::JsValue;
use web_sys::window;

#[component]
pub fn Notebook(id: String) -> impl IntoView {
    let (title, set_title) = signal("Loading...".to_string());

    // Load notebook data from localStorage
    Effect::new(move |_| {
        if let Some(win) = window() {
            if let Ok(Some(storage)) = win.local_storage() {
                if let Ok(Some(data)) = storage.get_item(&id) {
                    // Parse JSON
                    if let Ok(json) = js_sys::JSON::parse(&data) {
                        if let Ok(title_val) =
                            js_sys::Reflect::get(&json, &JsValue::from_str("title"))
                        {
                            if let Some(title_str) = title_val.as_string() {
                                set_title.set(title_str);
                                return;
                            }
                        }
                    }
                }
            }
        }
        // If loading fails
        set_title.set(format!("Notebook not found: {}", id));
    });

    view! {
        <div class="mt-4 p-4 border rounded-lg shadow-md">
            <h2 class="text-2xl font-bold">{title}</h2>
        </div>
    }
}
