use leptos::prelude::*;

#[derive(Clone)]
pub struct PromptData {
    pub title: String,
    pub content: String,
    pub updated_at: String,
}

#[component]
pub fn Prompt(prompt: PromptData) -> impl IntoView {
    view! {
        <div class="prompt-container p-4 mb-4">
            <h1 class="text-xl font-bold">{prompt.title}</h1>
            <div class="text-xs text-gray-500 mt-1 mb-3">{"Modified: "}{prompt.updated_at}</div>
            <p class="my-2">{prompt.content}</p>
        </div>
    }
}
