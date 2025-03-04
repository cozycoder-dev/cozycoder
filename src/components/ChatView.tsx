import {
  createResource,
  For,
  Match,
  Show,
  Switch,
} from "solid-js";
import { useParams } from "@solidjs/router";
import { fetchChatHistory, sendMessage } from "../api/messages";
import { updateChatTitle } from "../api/chats";
import Message from "./Message";
import MessageInput from "./MessageInput";

export default function ChatView() {
  const params = useParams();
  const [history, { mutate, refetch }] = createResource(
    () => params.id,
    fetchChatHistory,
    { initialValue: [] }
  );

  const handleSendMessage = async (content: string) => {
    const createdAt = new Date().toISOString();

    // Optimistically add user message
    mutate((messages) => [...messages, {
      id: `temp-${createdAt}`,
      role: "user",
      content,
      createdAt
    }]);

    try {
      const assistantMessage = await sendMessage(params.id, content);

      // Update title if this is the first message
      if (history().length === 0) {
        updateChatTitle(params.id, content.slice(0, 30) + (content.length > 30 ? "..." : ""));
      }

      // Add assistant response
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

        <div class="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <MessageInput
            onSubmit={handleSendMessage}
            placeholder="Type your message..."
          />
        </div>
      </div>
    </div>
  );
}
