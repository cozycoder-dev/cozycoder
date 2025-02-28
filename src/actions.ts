import { invoke } from "@tauri-apps/api/core";

export interface Message {
  role: "user" | "assistant";
  content: string;
}

export async function sendMessage(userMsg: string): Promise<string> {
  return await invoke("send_message", { userMsg });
}

export async function fetchChatHistory(): Promise<Message[]> {
  try {
    return await invoke("get_chat_history");
  } catch (error) {
    console.error("Failed to fetch chat history:", error);
    return []; // Return empty array if fetching fails
  }
}
