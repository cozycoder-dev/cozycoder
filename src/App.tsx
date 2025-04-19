import { Prompt, PromptData } from "./components/prompt";
import "./App.css";

function App() {
  // Create test data for the prompt
  const testPrompt: PromptData = {
    title: "Sample Prompt",
    content:
      "This is a sample prompt content. It demonstrates how the Prompt component displays information.",
    updated_at: "2025-04-09 15:45 UTC",
  };

  return (
    <main class="container mx-auto p-4">
      <Prompt prompt={testPrompt} />
    </main>
  );
}

export default App;
