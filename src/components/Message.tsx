import { Message as ApiMessage } from "../api/messages"

type Props = {
  message: ApiMessage;
}

export default function Message({ message: { role, content } }: Props) {
  return (
    <div
      class={`animate-fade-in px-4 py-3 rounded-lg max-w-[80%] ${role === "user"
        ? "self-end bg-blue-600 text-white"
        : "self-start bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
        }`}
    >
      <div class="font-bold mb-1 text-xs uppercase">
        {role === "user" ? "User" : "Assistant"}
      </div>
      <div class="leading-relaxed break-words">
        {content}
      </div>
    </div>

  )
}
