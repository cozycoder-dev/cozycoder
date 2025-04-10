use leptos::prelude::*;

#[derive(Clone)]
pub struct PromptData {
    pub title: String,
    pub content: String,
    pub updated_at: String,
}

#[component]
pub fn Prompt(prompt: PromptData) -> impl IntoView {
    // Signal for the current title
    let (title, set_title) = signal(prompt.title);
    // Signal for edit state
    let (editing, set_editing) = signal(false);

    // Handler for save button
    let save = move |_| set_editing.set(false);

    // Handler for cancel button
    let cancel = move |_| set_editing.set(false);

    // Handler for input changes
    let handle_input = move |ev| {
        let val = event_target_value(&ev);
        set_title.set(val);
    };

    view! {
        <div class="prompt-container p-4 mb-4">
            <Show
                when=move || editing.get()
                fallback=move || {
                    view! {
                        <div class="w-full flex">
                            <h1
                                class="text-xl font-bold cursor-pointer hover:bg-gray-100 p-1 rounded transition-colors"
                                on:click=move |_| set_editing.set(true)
                            >
                                {title}
                            </h1>
                        </div>
                    }
                }
            >
                <div class="w-full flex">
                    <input
                        type="text"
                        class="text-xl font-bold flex-grow p-1 border rounded"
                        value=title
                        on:input=handle_input
                    />
                    <div class="flex ml-2">
                        <button
                            class="bg-green-500 text-white px-2 py-1 rounded mr-1"
                            on:click=save
                        >
                            "Save"
                        </button>
                        <button class="bg-gray-300 px-2 py-1 rounded" on:click=cancel>
                            "Cancel"
                        </button>
                    </div>
                </div>
            </Show>
            <div class="text-xs text-gray-500 mt-1 mb-3">{"Modified: "}{prompt.updated_at}</div>
            <p class="my-2">{prompt.content}</p>
        </div>
    }
}
