import { useNavigate } from "@solidjs/router";
import { createChat } from "../api/chats";
import { sendMessage } from "../api/messages";
import MessageInput from "./MessageInput";

export default function EmptyState() {
  const navigate = useNavigate();

  const handleStartChat = async (content: string) => {
    const title = content.slice(0, 30) + (content.length > 30 ? "..." : "");
    const chatId = await createChat(title);
    await sendMessage(chatId, content);
    navigate(`/chats/${chatId}`);
  };

  return (
    <div class="h-full flex items-center justify-center p-5">
      <div class="w-full max-w-2xl">
        <h1 class="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          Start a new conversation
        </h1>

        <div class="flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <MessageInput
            onSubmit={handleStartChat}
            placeholder="Type your message to start a new chat..."
            containerClass="flex flex-col gap-4"
          />
        </div>
      </div>
    </div>
  );
}
