use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::sync::{LazyLock, Mutex};
use std::vec::Vec;
use uuid::Uuid;

#[derive(Serialize, Deserialize, Clone)]
struct Chat {
    id: Uuid,
    title: String,
    history: Vec<Message>,
    created_at: DateTime<Utc>,
    updated_at: DateTime<Utc>,
}

#[derive(Serialize, Deserialize, Clone)]
struct Message {
    role: String,    // "user" or "assistant"
    content: String, // The message content
}

static CHATS: LazyLock<Mutex<HashMap<Uuid, Chat>>> = LazyLock::new(|| Mutex::new(HashMap::new()));

fn initialize_dummy_data() {
    let history = vec![
        Message {
            role: "user".to_string(),
            content: "Hello".to_string(),
        },
        Message {
            role: "assistant".to_string(),
            content: "Hi there!".to_string(),
        },
        Message {
            role: "user".to_string(),
            content: "How are you?".to_string(),
        },
        Message {
            role: "assistant".to_string(),
            content: "I'm good, thanks!".to_string(),
        },
        Message {
            role: "user".to_string(),
            content: "What's your name?".to_string(),
        },
        Message {
            role: "assistant".to_string(),
            content: "I'm a chatbot!".to_string(),
        },
        Message {
            role: "user".to_string(),
            content: "Can you help me?".to_string(),
        },
        Message {
            role: "assistant".to_string(),
            content: "Sure, what do you need help with?".to_string(),
        },
        Message {
            role: "user".to_string(),
            content: "What's the weather like today?".to_string(),
        },
        Message {
            role: "assistant".to_string(),
            content: "I'm sorry, I don't have access to real-time weather data.".to_string(),
        },
        Message {
            role: "user".to_string(),
            content: "What's the capital of France?".to_string(),
        },
        Message {
            role: "assistant".to_string(),
            content: "The capital of France is Paris.".to_string(),
        },
        Message {
            role: "user".to_string(),
            content: "What's the capital of Germany?".to_string(),
        },
        Message {
            role: "assistant".to_string(),
            content: "The capital of Germany is Berlin.".to_string(),
        },
        Message {
            role: "user".to_string(),
            content: "What's the capital of Italy?".to_string(),
        },
        Message {
            role: "assistant".to_string(),
            content: "The capital of Italy is Rome.".to_string(),
        },
    ];
    let mut chats = CHATS.lock().unwrap();
    let id = Uuid::new_v4();
    chats.insert(
        id,
        Chat {
            id,
            title: "foo".to_string(),
            history,
            created_at: Utc::now(),
            updated_at: Utc::now(),
        },
    );
}

#[tauri::command]
fn fetch_chats() -> Vec<Chat> {
    let chats = CHATS.lock().unwrap();
    chats.values().cloned().collect()
}

#[tauri::command]
fn create_chat(mut chat: Chat) -> Chat {
    let id = Uuid::new_v4();
    chat.id = id;
    let mut chats = CHATS.lock().unwrap();
    chats.insert(id, chat.clone());
    chat
}

#[tauri::command]
fn delete_chat(chat_id: Uuid) -> bool {
    let mut chats = CHATS.lock().unwrap();
    chats.remove(&chat_id).is_some()
}

#[tauri::command]
fn update_chat_title(chat_id: Uuid, title: String) -> bool {
    let mut chats = CHATS.lock().unwrap();
    if let Some(chat) = chats.get_mut(&chat_id) {
        chat.title = title;
        true
    } else {
        false
    }
}

#[tauri::command]
fn send_message(chat_id: Uuid, user_msg: &str) -> String {
    // Store user message in history
    let user_message = Message {
        role: "user".to_string(),
        content: user_msg.to_string(),
    };

    // Create a dummy response
    let response = format!(
        "You said: '{}'. This is a dummy response from the AI assistant.",
        user_msg
    );

    // Store assistant message in history
    let assistant_message = Message {
        role: "assistant".to_string(),
        content: response.clone(),
    };

    // Add both messages to history
    let mut chats = CHATS.lock().unwrap();
    let chat = chats.get_mut(&chat_id).unwrap();
    chat.history.push(user_message);
    chat.history.push(assistant_message);

    response
}

#[tauri::command]
fn get_chat_history(chat_id: Uuid) -> Vec<Message> {
    // Return a clone of the history
    CHATS.lock().unwrap().get(&chat_id).unwrap().history.clone()
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    initialize_dummy_data();
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            create_chat,
            fetch_chats,
            delete_chat,
            update_chat_title,
            send_message,
            get_chat_history
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
