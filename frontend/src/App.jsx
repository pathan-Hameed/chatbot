import { useState, useEffect } from "react";
import { Menu, Moon, Sun, Plus } from "lucide-react";
import { useChat } from "./hooks/useChat";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import InputBar from "./components/InputBar";

/**
 * Root app component with dark mode and layout
 */
export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeChat, setActiveChat] = useState(null);

  const { messages, isLoading, sendMessage, clearChat, messagesEndRef } =
    useChat();

  // Initialize dark mode from localStorage and system preference
  useEffect(() => {
    const savedDark = localStorage.getItem("dark-mode");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    const isDarkMode = savedDark !== null ? savedDark === "true" : prefersDark;
    setIsDark(isDarkMode);

    // Apply to document
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Persist dark mode preference
  const toggleDarkMode = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    localStorage.setItem("dark-mode", newDark);

    if (newDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleNewChat = () => {
    clearChat();
    setActiveChat(null);
  };

  const handleSuggestedPrompt = (prompt) => {
    sendMessage(prompt);
  };

  const handleRegenerate = () => {
    if (messages.length > 0) {
      // Find last user message
      const lastUserIdx = messages.findLastIndex((m) => m.role === "user");
      if (lastUserIdx >= 0) {
        const lastUserMessage = messages[lastUserIdx];
        // Remove last AI response and regenerate
        const filteredMessages = messages.slice(0, lastUserIdx + 1);
        // Simulate clearing and resending
        clearChat();
        sendMessage(lastUserMessage.content);
      }
    }
  };

  return (
    <div className="h-dvh flex flex-col overflow-hidden bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white">
      <div className="flex flex-1 min-w-0">
        {/* Sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onNewChat={handleNewChat}
          onSelectChat={setActiveChat}
          activeId={activeChat}
        />

        {/* Main content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <header className="h-14 border-b border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-4 md:px-6 flex items-center justify-between flex-shrink-0">
            {/* Left section */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg transition-colors"
                aria-label="Toggle sidebar"
              >
                <Menu size={24} className="text-zinc-600 dark:text-zinc-400" />
              </button>

              <div className="flex items-center gap-2 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">AI</span>
                </div>
                <h1 className="text-lg font-semibold truncate hidden sm:block">
                  Chatbot
                </h1>
              </div>
            </div>

            {/* Right section */}
            <div className="flex items-center gap-3">
              {/* New Chat button (desktop) */}
              <button
                onClick={handleNewChat}
                className="hidden sm:flex items-center gap-2 h-10 px-4 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white transition-colors duration-150 hover:shadow-lg font-medium text-sm"
              >
                <Plus size={18} />
                <span>New Chat</span>
              </button>

              {/* New Chat button (mobile) */}
              <button
                onClick={handleNewChat}
                className="sm:hidden p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg transition-colors"
                aria-label="New chat"
              >
                <Plus size={20} className="text-zinc-600 dark:text-zinc-400" />
              </button>

              {/* Dark mode toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg transition-colors"
                aria-label="Toggle dark mode"
              >
                {isDark ? (
                  <Sun size={20} className="text-zinc-400" />
                ) : (
                  <Moon size={20} className="text-zinc-600" />
                )}
              </button>
            </div>
          </header>

          {/* Chat content */}
          <ChatWindow
            messages={messages}
            isLoading={isLoading}
            onSuggestedPrompt={handleSuggestedPrompt}
            onRegenerate={handleRegenerate}
            messagesEndRef={messagesEndRef}
          />

          {/* Input bar */}
          <InputBar onSendMessage={sendMessage} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
