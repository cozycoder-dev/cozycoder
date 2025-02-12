import { createResource, createSignal, Match, Show, Switch } from "solid-js";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";

function App() {
  async function sendMsg(userMsg: string): Promise<string> {
    return await invoke("prompt", { userMsg });
  }

  const [input, setInput] = createSignal<HTMLInputElement>();
  const [userMsg, setUserMsg] = createSignal("");
  const [assistantMsg] = createResource(userMsg, sendMsg)

  return (
    <main class="container">
      <p>User: {userMsg()}</p>
      <Show when={assistantMsg.loading}>
        <p>Loading...</p>
      </Show>
      <Switch>
        <Match when={assistantMsg.error}>
          <span>Error: {assistantMsg.error}</span>
        </Match>
        <Match when={assistantMsg()}>
          <p>Assistant: {assistantMsg()}</p>
        </Match>
      </Switch>

      <input
        id="chat-input"
        ref={setInput}
        placeholder="Enter a message..."
      />
      <button
        onClick={() => {
          setUserMsg(input()?.value ?? "");
        }}
      >
        Send
      </button>
    </main>
  );
}

export default App;
