use serde::{Deserialize, Serialize};
use std::sync::Mutex;
use std::vec::Vec;

// Define Message struct
#[derive(Serialize, Deserialize, Clone)]
struct Message {
    role: String,    // "user" or "assistant"
    content: String, // The message content
}

// Create a static mutable chat history
static CHAT_HISTORY: Mutex<Vec<Message>> = Mutex::new(Vec::new());

// Function to initialize chat history with test data
fn initialize_chat_history() {
    let mut history = CHAT_HISTORY.lock().unwrap();

    // Only initialize if empty
    if history.is_empty() {
        // Add test conversation data
        let test_data = vec![
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

        // Extend the history with test data
        history.extend(test_data);
    }
}

// New send_message function
#[tauri::command]
fn send_message(user_msg: &str) -> String {
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
    let mut history = CHAT_HISTORY.lock().unwrap();
    history.push(user_message);
    history.push(assistant_message);

    response
}

// Function to get chat history
#[tauri::command]
fn get_chat_history() -> Vec<Message> {
    // Return a clone of the history
    CHAT_HISTORY.lock().unwrap().clone()
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    initialize_chat_history();
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![send_message, get_chat_history])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
