import {
  createResource,
  createSignal,
  For,
  Match,
  Show,
  Switch,
} from "solid-js";
import { fetchChatHistory, sendMessage } from "./actions";
import "./App.css";

function App() {
  const [inputValue, setInputValue] = createSignal("");
  const [history, { mutate }] = createResource(fetchChatHistory, {
    initialValue: [],
  });

  const handleSendMessage = async () => {
    const content = inputValue();
    mutate((messages) => [...messages, { role: "user", content }]);
    const assistantMessage = await sendMessage(content);
    mutate((messages) => [
      ...messages,
      { role: "assistant", content: assistantMessage },
    ]);
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <main class="container">
      <div class="chat-container">
        {/* Chat history display */}
        <div class="messages-container">
          <Show when={history.loading}>
            <p>Loading...</p>
          </Show>
          <Switch>
            <Match when={history.error}>
              <span>Error: {history.error}</span>
            </Match>
            <Match when={history()}>
              <For each={history()}>
                {(message) => (
                  <div class={`message ${message.role}`}>
                    <div class="message-header">
                      {message.role === "user" ? "User" : "Assistant"}
                    </div>
                    <div class="message-content">{message.content}</div>
                  </div>
                )}
              </For>
            </Match>
          </Switch>
        </div>

        <div class="input-container">
          <input
            id="chat-input"
            value={inputValue()}
            onInput={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </main>
  );
}

export default App;
