import { createSignal } from "solid-js";

type MessageInputProps = {
  onSubmit: (message: string) => Promise<void>;
  placeholder?: string;
  containerClass?: string;
  initialValue?: string;
};

export default function MessageInput({
  onSubmit,
  placeholder = "Type your message...",
  containerClass = "flex gap-2.5",
  initialValue = "",
}: MessageInputProps) {
  const [inputValue, setInputValue] = createSignal(initialValue);
  const [isSubmitting, setIsSubmitting] = createSignal(false);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    const message = inputValue().trim();
    if (!message || isSubmitting()) return;

    setIsSubmitting(true);
    setInputValue(""); // Clear input immediately for better UX

    try {
      await onSubmit(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const message = inputValue().trim();
      if (message && !isSubmitting()) {
        handleSubmit(e);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} class={containerClass}>
      <textarea
        value={inputValue()}
        onInput={(e) => setInputValue(e.currentTarget.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        class="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded text-base bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        disabled={isSubmitting()}
      />

      <button
        type="submit"
        disabled={!inputValue().trim() || isSubmitting()}
        class="px-5 bg-blue-600 text-white rounded text-base transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isSubmitting() ? "Sending..." : "Send"}
      </button>
    </form>
  );
}
