import { onMount } from "solid-js";
import ChatList from "./components/ChatList";
import { refetchChats } from "./api/chats";
import "./App.css";
import { ParentProps } from "solid-js";

function App(props: ParentProps) {
  onMount(() => {
    refetchChats();
  });
  return (
    <main class="h-screen flex">
      {/* Sidebar */}
      <aside class="w-64 border-r border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
        <ChatList />
      </aside>

      {/* Main content area */}
      <div class="flex-1">
        {props.children}
      </div>
    </main>
  );
}

export default App;
