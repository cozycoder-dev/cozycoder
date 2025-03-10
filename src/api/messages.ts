import { invoke } from "@tauri-apps/api/core";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
}

export async function sendMessage(
  chatId: string,
  userMsg: string
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
