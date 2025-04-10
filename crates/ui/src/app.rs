use leptos::prelude::*;

#[component]
pub fn App() -> impl IntoView {
    let (count, set_count) = signal(0);

    view! {
        <h1 class="text-3xl font-bold underline">Hello world!</h1>
        <button on:click=move |_| set_count.set(3)>"Click me: " {count}</button>
        <p>"Double count: " {move || count.get() * 2}</p>
    }
}
