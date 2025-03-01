import { invoke } from "@tauri-apps/api/core";

export interface Chat {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  chatId: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

// Create a new chat with a server-generated UUID
export async function createChat(title: string = "New Chat"): Promise<string> {
  const result: { chatId: string } = await invoke("create_chat", { 
    title, 
    createdAt: new Date().toISOString(),
  });
  return result.chatId;
}

// Get all chats
export async function fetchChats(): Promise<Chat[]> {
  try {
    return await invoke("get_chats");
  } catch (error) {
    console.error("Failed to fetch chats:", error);
    return []; 
  }
}

// Delete a chat
export async function deleteChat(chatId: string): Promise<boolean> {
  try {
    await invoke("delete_chat", { chatId });
    return true;
  } catch (error) {
    console.error("Failed to delete chat:", error);
    return false;
  }
}

// Update chat title
export async function updateChatTitle(chatId: string, title: string): Promise<boolean> {
  try {
    await invoke("update_chat_title", { chatId, title });
    return true;
  } catch (error) {
    console.error("Failed to update chat title:", error);
    return false;
  }
}

// Send a message in a specific chat
export async function sendMessage(chatId: string, userMsg: string): Promise<string> {
  return await invoke("send_message", { chatId, userMsg });
}

// Fetch chat history for a specific chat
export async function fetchChatHistory(chatId: string): Promise<Message[]> {
  try {
    return await invoke("get_chat_history", { chatId });
  } catch (error) {
    console.error(`Failed to fetch chat history for chat ${chatId}:`, error);
    return [];
  }
}
