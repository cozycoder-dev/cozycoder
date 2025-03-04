import {
  createResource,
  createSignal,
  For,
  Match,
  Show,
  Switch,
} from "solid-js";
import { useParams } from "@solidjs/router";
import { fetchChatHistory, sendMessage } from "../api/messages";
import { updateChatTitle } from "../api/chats";
import Message from "./Message";

export default function ChatView() {
  const params = useParams();
  const [inputValue, setInputValue] = createSignal("");
  const [history, { mutate, refetch }] = createResource(
    () => params.id,
    fetchChatHistory,
    { initialValue: [] }
  );
  const handleSendMessage = async () => {
    const content = inputValue();
    if (!content.trim()) return;
    setInputValue("");
    const createdAt = new Date().toISOString();
    mutate((messages) => [...messages, {
      id: `temp-${createdAt}`,
      role: "user",
      content,
      createdAt
    }]);
    try {
      const assistantMessage = await sendMessage(params.id, content);
      if (history().length === 0) {
        updateChatTitle(params.id, content.slice(0, 30) + (content.length > 30 ? "..." : ""));
      }
      mutate((messages) => [
        ...messages,
        {
          id: `assistant-${createdAt}`,
          role: "assistant",
          content: assistantMessage,
          createdAt: new Date().toISOString()
        },
      ]);
    } catch (error) {
      console.error("Failed to send message:", error);
      await refetch(); // Revert to server state on error
    }
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div class="max-w-3xl mx-auto p-5 h-screen flex flex-col">
      <div class="flex flex-col h-full rounded-lg overflow-hidden shadow-md bg-gray-100 dark:bg-gray-800">
        {/* Chat history display */}
        <div class="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
          <Show when={history.loading}>
            <p class="text-center py-2">
              <span class="loading-dot">.</span>
              <span class="loading-dot">.</span>
              <span class="loading-dot">.</span>
            </p>
          </Show>

          <Switch>
            <Match when={history.error}>
              <span class="text-red-500 self-center">
                Error: {history.error}
              </span>
            </Match>
            <Match when={history()}>
              <For each={history()}>
                {(message) => (
                  <Message message={message} />
                )}
              </For>
            </Match>
          </Switch>
        </div>

        <div class="flex p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 gap-2.5">
          <input
            id="chat-input"
            value={inputValue()}
            onInput={(e) => setInputValue(e.currentTarget.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            class="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded text-base
                   bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue().trim()}
            class="px-5 bg-blue-600 text-white rounded text-base transition-colors
                   hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                   disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
