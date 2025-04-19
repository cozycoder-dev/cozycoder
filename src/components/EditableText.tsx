import { createSignal, Show } from "solid-js";

interface EditableTextProps {
  text: string;
  onSave?: (newText: string) => void;
  className?: string;
  multiline?: boolean;
}

export function EditableText(props: EditableTextProps) {
  // Signal for the current text
  const [text, setText] = createSignal(props.text);
  // Signal for edit state
  const [editing, setEditing] = createSignal(false);
  // Signal to store original text when editing starts
  const [originalText, setOriginalText] = createSignal("");

  // Start editing and save original text
  const startEdit = () => {
    setOriginalText(props.text);
    setText(props.text);
    setEditing(true);
  };

  // Handler for save button
  const save = () => {
    // Call the onSave callback with the new text
    if (props.onSave) {
      props.onSave(text());
    }
    setEditing(false);
  };

  // Handler for cancel button
  const cancel = () => {
    // Reset to original text
    setText(originalText());
    setEditing(false);
  };

  // Handler for input changes
  const handleInput = (ev: InputEvent) => {
    const val = (ev.target as HTMLInputElement).value;
    setText(val);
  };

  return (
    <Show
      when={editing()}
      fallback={
        <div class="w-full">
          <span
            class={`cursor-pointer hover:bg-gray-100 rounded transition-colors ${props.className || ""}`}
            onClick={startEdit}
          >
            {text()}
          </span>
        </div>
      }
    >
      <form
        class={`w-full flex ${props.multiline ? "items-start" : ""}`}
        onSubmit={(e) => {
          e.preventDefault();
          save();
        }}
      >
        {props.multiline ? (
          <textarea
            class={`flex-grow p-1 border rounded ${props.className || ""}`}
            value={text()}
            onInput={handleInput}
            rows={5}
          />
        ) : (
          <input
            type="text"
            class={`flex-grow p-1 border rounded ${props.className || ""}`}
            value={text()}
            onInput={handleInput}
          />
        )}
        <div class="flex ml-2">
          <button
            type="submit"
            class="bg-green-500 text-white px-2 py-1 rounded mr-1"
          >
            Save
          </button>
          <button
            type="button"
            class="bg-gray-300 px-2 py-1 rounded"
            onClick={cancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </Show>
  );
}
