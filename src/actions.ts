import { invoke } from "@tauri-apps/api/core";

export interface Chat {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
}

export async function createChat(title: string): Promise<string> {
  const history: Message[] = [];
  const result: Chat = await invoke("create_chat", {
    chat: {
      title,
      history,
    },
  });
  return result.id;
}

export async function fetchChats(): Promise<Chat[]> {
  try {
    return await invoke("get_chats");
  } catch (error) {
    console.error("Failed to fetch chats:", error);
    return [];
  }
}

export async function deleteChat(chatId: string): Promise<boolean> {
  try {
    await invoke("delete_chat", { chatId });
    return true;
  } catch (error) {
    console.error("Failed to delete chat:", error);
    return false;
  }
}

export async function updateChatTitle(
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

export async function sendMessage(
  chatId: string,
  userMsg: string,
): Promise<string> {
  return await invoke("send_message", { chatId, userMsg });
}

export async function fetchChatHistory(chatId: string): Promise<Message[]> {
  try {
    return await invoke("get_chat_history", { chatId });
  } catch (error) {
    console.error(`Failed to fetch chat history for chat ${chatId}:`, error);
    return [];
  }
}
