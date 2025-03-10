import { invoke } from "@tauri-apps/api/core";
import { createStore } from "solid-js/store";
import { createSignal, createResource } from "solid-js";

export interface Chat {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

const [chats, setChats] = createStore<Chat[]>([]);
const [isLoading, setIsLoading] = createSignal(false);
const [error, setError] = createSignal<string | null>(null);

const [initialized, { refetch: refetchChatsList }] = createResource(async () => {
  setIsLoading(true);
  setError(null);
  try {
    const fetchedChats = await fetchChatsFromAPI();
    setChats(fetchedChats);
    return true;
  } catch (err) {
    setError("Failed to load chats");
    return false;
  } finally {
    setIsLoading(false);
  }
});

async function fetchChatsFromAPI(): Promise<Chat[]> {
  try {
    return await invoke("fetch_chats");
  } catch (error) {
    console.error("Failed to fetch chats:", error);
    return [];
  }
}

async function createChatInAPI(title: string): Promise<string> {
  const history: any[] = [];
  const result: Chat = await invoke("create_chat", {
    chat: {
      title,
      history,
    },
  });
  return result.id;
}

async function deleteChatFromAPI(chatId: string): Promise<boolean> {
  try {
    await invoke("delete_chat", { chatId });
    return true;
  } catch (error) {
    console.error("Failed to delete chat:", error);
    return false;
  }
}

async function updateChatTitleInAPI(
  chatId: string,
  title: string,
): Promise<boolean> {
  try {
    return await invoke("update_chat_title", { chatId, title });
  } catch (error) {
    console.error("Failed to update chat title:", error);
    return false;
  }
}

export async function createChat(title: string = "New Chat"): Promise<string> {
  setIsLoading(true);
  try {
    const chatId = await createChatInAPI(title);
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
    await deleteChatFromAPI(chatId);
    setChats(chats.filter(chat => chat.id !== chatId));
    return true;
  } catch (err) {
    setError("Failed to delete chat");
    return false;
  } finally {
    setIsLoading(false);
  }
}

export async function updateChatTitle(chatId: string, title: string): Promise<boolean> {
  try {
    const success = await updateChatTitleInAPI(chatId, title);
    if (success) {
      setChats(
        chat => chat.id === chatId,
        prevChat => ({ ...prevChat, title, updatedAt: new Date().toISOString() })
      );
    }
    return success;
  } catch (err) {
    console.error("Failed to update chat title:", err);
    return false;
  }
}

export function refetchChats() {
  return refetchChatsList();
}

export function getChats() {
  return {
    chats,
    isLoading,
    error,
    initialized
  };
}
