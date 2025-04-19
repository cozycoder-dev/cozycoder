import { createSignal, Show } from "solid-js";

export interface PromptData {
  title: string;
  content: string;
  updated_at: string;
}

interface PromptProps {
  prompt: PromptData;
}

export function Prompt(props: PromptProps) {
  // Signal for the current title
  const [title, setTitle] = createSignal(props.prompt.title);
  // Signal for edit state
  const [editing, setEditing] = createSignal(false);

  // Handler for save button
  const save = () => setEditing(false);

  // Handler for cancel button
  const cancel = () => setEditing(false);

  // Handler for input changes
  const handleInput = (ev: InputEvent) => {
    const val = (ev.target as HTMLInputElement).value;
    setTitle(val);
  };

  return (
    <div class="prompt-container p-4 mb-4">
      <Show
        when={editing()}
        fallback={
          <div class="w-full flex">
            <h1
              class="text-xl font-bold cursor-pointer hover:bg-gray-100 p-1 rounded transition-colors"
              onClick={() => setEditing(true)}
            >
              {title()}
            </h1>
          </div>
        }
      >
        <div class="w-full flex">
          <input
            type="text"
            class="text-xl font-bold flex-grow p-1 border rounded"
            value={title()}
            onInput={handleInput}
          />
          <div class="flex ml-2">
            <button
              class="bg-green-500 text-white px-2 py-1 rounded mr-1"
              onClick={save}
            >
              Save
            </button>
            <button class="bg-gray-300 px-2 py-1 rounded" onClick={cancel}>
              Cancel
            </button>
          </div>
        </div>
      </Show>
      <div class="text-xs text-gray-500 mt-1 mb-3">{"Modified: "}{props.prompt.updated_at}</div>
      <p class="my-2">{props.prompt.content}</p>
    </div>
  );
}