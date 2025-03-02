use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::sync::{LazyLock, Mutex};
use std::vec::Vec;
use uuid::Uuid;

#[derive(Serialize, Deserialize, Clone)]
struct Chat {
    id: Option<Uuid>,
    title: String,
    history: Vec<Message>,
    created_at: Option<DateTime<Utc>>,
    updated_at: Option<DateTime<Utc>>,
}

#[derive(Serialize, Deserialize, Clone)]
#[serde(rename_all = "lowercase")]
enum Role {
    User,
    Assistant,
}

#[derive(Serialize, Deserialize, Clone)]
struct Message {
    role: Role,
    content: String,
    created_at: Option<DateTime<Utc>>,
}

static CHATS: LazyLock<Mutex<HashMap<Uuid, Chat>>> = LazyLock::new(|| Mutex::new(HashMap::new()));

fn initialize_dummy_data() {
    let history = vec![
        Message {
            role: Role::User,
            content: "Hello".to_string(),
            created_at: Some(Utc::now()),
        },
        Message {
            role: Role::Assistant,
            content: "Hi there!".to_string(),
            created_at: Some(Utc::now()),
        },
        Message {
            role: Role::User,
            content: "How are you?".to_string(),
            created_at: Some(Utc::now()),
        },
        Message {
            role: Role::Assistant,
            content: "I'm good, thanks!".to_string(),
            created_at: Some(Utc::now()),
        },
        Message {
            role: Role::User,
            content: "What's your name?".to_string(),
            created_at: Some(Utc::now()),
        },
        Message {
            role: Role::Assistant,
            content: "I'm a chatbot!".to_string(),
            created_at: Some(Utc::now()),
        },
        Message {
            role: Role::User,
            content: "Can you help me?".to_string(),
            created_at: Some(Utc::now()),
        },
        Message {
            role: Role::Assistant,
            content: "Sure, what do you need help with?".to_string(),
            created_at: Some(Utc::now()),
        },
        Message {
            role: Role::User,
            content: "What's the weather like today?".to_string(),
            created_at: Some(Utc::now()),
        },
        Message {
            role: Role::Assistant,
            content: "I'm sorry, I don't have access to real-time weather data.".to_string(),
            created_at: Some(Utc::now()),
        },
        Message {
            role: Role::User,
            content: "What's the capital of France?".to_string(),
            created_at: Some(Utc::now()),
        },
        Message {
            role: Role::Assistant,
            content: "The capital of France is Paris.".to_string(),
            created_at: Some(Utc::now()),
        },
        Message {
            role: Role::User,
            content: "What's the capital of Germany?".to_string(),
            created_at: Some(Utc::now()),
        },
        Message {
            role: Role::Assistant,
            content: "The capital of Germany is Berlin.".to_string(),
            created_at: Some(Utc::now()),
        },
        Message {
            role: Role::User,
            content: "What's the capital of Italy?".to_string(),
            created_at: Some(Utc::now()),
        },
        Message {
            role: Role::Assistant,
            content: "The capital of Italy is Rome.".to_string(),
            created_at: Some(Utc::now()),
        },
    ];
    let mut chats = CHATS.lock().unwrap();
    let id = Some(Uuid::new_v4());
    let now = Some(Utc::now());
    chats.insert(
        id.unwrap(),
        Chat {
            id,
            title: "foo".to_string(),
            history,
            created_at: now,
            updated_at: now,
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
    chat.id = Some(id);
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
        role: Role::User,
        content: user_msg.to_string(),
        created_at: Some(Utc::now()),
    };

    // Create a dummy response
    let response = format!(
        "You said: '{}'. This is a dummy response from the AI assistant.",
        user_msg
    );

    // Store assistant message in history
    let assistant_message = Message {
        role: Role::Assistant,
        content: response.clone(),
        created_at: Some(Utc::now()),
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
