import { EditableText } from "./EditableText";

export interface PromptData {
  title: string;
  content: string;
  updated_at: string;
}

interface PromptProps {
  prompt: PromptData;
  onUpdate?: (updatedPrompt: PromptData) => void;
}

export function Prompt(props: PromptProps) {
  // Handle title updates
  const handleTitleSave = (newTitle: string) => {
    if (props.onUpdate) {
      props.onUpdate({
        ...props.prompt,
        title: newTitle
      });
    }
  };

  // Handle content updates
  const handleContentSave = (newContent: string) => {
    if (props.onUpdate) {
      props.onUpdate({
        ...props.prompt,
        content: newContent
      });
    }
  };

  return (
    <div class="prompt-container p-4 mb-4">
      <h1>
        <EditableText
          text={props.prompt.title}
          onSave={handleTitleSave}
          className="text-xl font-bold"
        />
      </h1>
      <div class="text-xs text-gray-500 mt-1 mb-3">{"Modified: "}{props.prompt.updated_at}</div>
      <div class="my-2">
        <EditableText
          text={props.prompt.content}
          onSave={handleContentSave}
          multiline={true}
        />
      </div>
    </div>
  );
}