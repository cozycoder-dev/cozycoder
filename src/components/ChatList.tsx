import { createSignal, For, Show } from "solid-js";
import { A, useNavigate } from "@solidjs/router";
import { createChat, deleteChat, getChats } from "../api/chats";

export default function ChatList() {
  const { chats, isLoading, error } = getChats();
  const navigate = useNavigate();
  const [isCreating, setIsCreating] = createSignal(false);
  const handleNewChat = async () => {
    setIsCreating(true);
    try {
      const chatId = await createChat();
      navigate(`/chats/${chatId}`);
    } catch (error) {
      console.error("Failed to create chat:", error);
    } finally {
      setIsCreating(false);
    }
  };
  const handleDeleteChat = async (chatId: string, e: Event) => {
    e.preventDefault();
    e.stopPropagation();

    if (confirm("Are you sure you want to delete this chat?")) {
      await deleteChat(chatId);
      navigate("/");
    }
  };
  return (
    <div class="flex flex-col h-full">
      <div class="p-4 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={handleNewChat}
          disabled={isCreating()}
          class="w-full py-2 px-4 bg-blue-600 text-white rounded text-base transition-colors
                 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isCreating() ? "Creating..." : "New Chat"}
        </button>
      </div>

      <div class="flex-1 overflow-y-auto p-2">
        <Show when={isLoading()}>
          <p class="text-center py-2">
            <span class="loading-dot">.</span>
            <span class="loading-dot">.</span>
            <span class="loading-dot">.</span>
          </p>
        </Show>

        <Show when={error()}>
          <p class="text-red-500 text-center py-2">Error loading chats</p>
        </Show>

        <For each={chats}>
          {(chat) => (
            <A
              href={`/chats/${chat.id}`}
              class="block p-3 mb-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700
                    text-gray-800 dark:text-gray-200 transition-colors
                    flex justify-between items-center"
              activeClass="bg-gray-200 dark:bg-gray-700"
            >
              <span class="truncate">{chat.title || "Untitled Chat"}</span>
              <button
                onClick={(e) => handleDeleteChat(chat.id, e)}
                class="text-gray-500 hover:text-red-500 p-1 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600"
                title="Delete chat"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </A>
          )}
        </For>

        <Show when={!isLoading() && chats.length === 0}>
          <p class="text-center text-gray-500 dark:text-gray-400 py-4">
            No chats yet
          </p>
        </Show>
      </div>
    </div>
  );
}
