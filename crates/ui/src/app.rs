use crate::components::prompt::{Prompt, PromptData};
use leptos::prelude::*;

#[component]
pub fn App() -> impl IntoView {
    // Create test data for the prompt
    let test_prompt = PromptData {
        title: String::from("Sample Prompt"),
        content: String::from("This is a sample prompt content. It demonstrates how the Prompt component displays information."),
        updated_at: String::from("2025-04-09 15:45 UTC"),
    };

    view! {
        <div class="container mx-auto p-4">
            <Prompt prompt=test_prompt />
        </div>
    }
}
