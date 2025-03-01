import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { createChat, sendMessage } from "../actions";

export default function EmptyState() {
  const [inputValue, setInputValue] = createSignal("");
  const [isCreating, setIsCreating] = createSignal(false);
  const navigate = useNavigate();

  const handleStartChat = async () => {
    const content = inputValue();
    if (!content.trim()) return;
    
    setIsCreating(true);
    try {
      // Create a new chat with first message content as title
      const chatId = await createChat(content.slice(0, 30) + (content.length > 30 ? "..." : ""));
      
      // Send the first message
      await sendMessage(chatId, content);
      
      // Navigate to the new chat
      navigate(`/chats/${chatId}`);
    } catch (error) {
      console.error("Failed to create chat:", error);
      setIsCreating(false);
    }
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleStartChat();
    }
  };

  return (
    <div class="h-full flex items-center justify-center p-5">
      <div class="w-full max-w-2xl">
        <h1 class="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          Start a new conversation
        </h1>
        
        <div class="flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <textarea
            value={inputValue()}
            onInput={(e) => setInputValue(e.currentTarget.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message to start a new chat..."
            class="w-full p-4 mb-4 h-32 border border-gray-300 dark:border-gray-600 rounded-lg
                   bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                   focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            disabled={isCreating()}
          />
          
          <button
            onClick={handleStartChat}
            disabled={!inputValue().trim() || isCreating()}
            class="py-3 px-5 bg-blue-600 text-white rounded-lg text-base font-medium transition-colors
                   hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                   disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isCreating() ? "Creating chat..." : "Start chat"}
          </button>
        </div>
      </div>
    </div>
  );
}
