import { createStore } from "solid-js/store";
import { createSignal, createResource } from "solid-js";
import { Chat, fetchChats, createChat as apiCreateChat, deleteChat as apiDeleteChat } from "../actions";

const [chats, setChats] = createStore<Chat[]>([]);
const [isLoading, setIsLoading] = createSignal(false);
const [error, setError] = createSignal<string | null>(null);

export const [initialized, { refetch: refetchChats }] = createResource(async () => {
  setIsLoading(true);
  setError(null);
  try {
    const fetchedChats = await fetchChats();
    setChats(fetchedChats);
    return true;
  } catch (err) {
    setError("Failed to load chats");
    return false;
  } finally {
    setIsLoading(false);
  }
});

export async function createChat(title: string = "New Chat"): Promise<string> {
  setIsLoading(true);
  try {
    const chatId = await apiCreateChat(title);
    setChats([
      ...chats,
      {
        id: chatId,
        title,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ]);
    return chatId;
  } catch (err) {
    setError("Failed to create chat");
    throw err;
  } finally {
    setIsLoading(false);
  }
}

export async function deleteChat(chatId: string): Promise<boolean> {
  setIsLoading(true);
  try {
    await apiDeleteChat(chatId);
    setChats(chats.filter(chat => chat.id !== chatId));
    return true;
  } catch (err) {
    setError("Failed to delete chat");
    return false;
  } finally {
    setIsLoading(false);
  }
}

export function updateChatInStore(chatId: string, updates: Partial<Chat>): void {
  setChats(
    chat => chat.id === chatId,
    prevChat => ({ ...prevChat, ...updates })
  );
}

export function useChatStore() {
  return {
    chats,
    isLoading,
    error,
    initialized
  };
}
