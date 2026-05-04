import { useState } from "react";
import { X, Plus, Trash2 } from "lucide-react";

/**
 * Sidebar with chat history
 * @param {Object} props
 * @param {boolean} props.isOpen - Sidebar open state
 * @param {Function} props.onClose - Callback to close sidebar
 * @param {Function} props.onNewChat - Callback for new chat
 * @param {Function} props.onSelectChat - Callback to select chat
 * @param {number} props.activeId - Active chat ID
 */
export default function Sidebar({
  isOpen,
  onClose,
  onNewChat,
  onSelectChat,
  activeId,
}) {
  // Dummy chat history data
  const [chats] = useState([
    { id: 1, title: "Understanding React Hooks", date: "Today" },
    { id: 2, title: "Building a REST API", date: "Yesterday" },
    { id: 3, title: "TypeScript Best Practices", date: "2 days ago" },
    { id: 4, title: "CSS Grid vs Flexbox", date: "1 week ago" },
    { id: 5, title: "Database Design Patterns", date: "2 weeks ago" },
  ]);

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <button
          onClick={onClose}
          className="fixed inset-0 z-20 bg-black/50 md:hidden"
          aria-label="Close sidebar"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 w-72 bg-zinc-50 dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-700 flex flex-col transition-transform duration-200 ease-in-out z-30 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Header */}
        <div className="h-14 px-4 border-b border-zinc-200 dark:border-zinc-700 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-white">
            Chats
          </h2>
          <button
            onClick={onClose}
            className="md:hidden p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg transition-colors"
            aria-label="Close sidebar"
          >
            <X size={20} className="text-zinc-600 dark:text-zinc-400" />
          </button>
        </div>

        {/* Chat History List */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            {chats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => {
                  onSelectChat(chat.id);
                  onClose();
                }}
                className={`w-full text-left px-3 py-2.5 rounded-xl transition-colors duration-150 group space-y-1 ${
                  activeId === chat.id
                    ? "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-900 dark:text-indigo-100"
                    : "text-zinc-900 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-800"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{chat.title}</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      {chat.date}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="flex-shrink-0 h-8 w-8 flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-zinc-300 dark:hover:bg-zinc-700 rounded transition-all"
                  >
                    <Trash2
                      size={16}
                      className="text-zinc-500 dark:text-zinc-400"
                    />
                  </button>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* New Chat Button */}
        <div className="p-4 border-t border-zinc-200 dark:border-zinc-700">
          <button
            onClick={() => {
              onNewChat();
              onClose();
            }}
            className="w-full h-10 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium transition-colors duration-150 flex items-center justify-center gap-2 hover:shadow-lg"
          >
            <Plus size={20} />
            <span>New Chat</span>
          </button>
        </div>
      </aside>
    </>
  );
}
