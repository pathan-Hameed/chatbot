import { useRef, useState, useEffect } from "react";
import { Send, Paperclip } from "lucide-react";

/**
 * Input bar component with auto-resizing textarea
 * @param {Object} props
 * @param {Function} props.onSendMessage - Callback when message is sent
 * @param {boolean} props.isLoading - Loading state
 */
export default function InputBar({ onSendMessage, isLoading }) {
  const [input, setInput] = useState("");
  const textareaRef = useRef(null);
  const maxLength = 2000;

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const scrollHeight = textareaRef.current.scrollHeight;
      // Limit to 5 lines (approx 120px)
      const maxHeight = 120;
      textareaRef.current.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
    }
  }, [input]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey && !isLoading) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    if (input.trim() && !isLoading) {
      onSendMessage(input);
      setInput("");
    }
  };

  const isDisabled = !input.trim() || isLoading;

  return (
    <div className="border-t border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-4 py-3 md:px-6 md:py-4">
      <div className="max-w-3xl mx-auto flex flex-col">
        {/* Focus ring container */}
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-transparent transition-all duration-150 ease-in-out">
          <div className="flex items-end gap-3 px-4 py-2.5">
            {/* Attachment button */}
            <button
              type="button"
              disabled={isLoading}
              className="flex-shrink-0 h-8 w-8 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 flex items-center justify-center transition-colors text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Attach file"
            >
              <Paperclip size={20} />
            </button>

            {/* Textarea */}
            <div className="flex-1 flex flex-col">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.slice(0, maxLength))}
                onKeyDown={handleKeyDown}
                placeholder="Message AI..."
                disabled={isLoading}
                rows={1}
                className="w-full resize-none bg-transparent text-sm leading-6 outline-none disabled:opacity-50 disabled:cursor-not-allowed text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 min-h-6"
                style={{ maxHeight: "120px" }}
              />
            </div>

            {/* Character count */}
            {input.length > 0 && (
              <div className="text-xs text-zinc-400">
                {input.length} / {maxLength}
              </div>
            )}

            {/* Send button */}
            <button
              onClick={handleSend}
              disabled={isDisabled}
              className={`flex-shrink-0 h-8 w-8 rounded-xl flex items-center justify-center transition-all duration-150 ease-in-out ${
                isDisabled
                  ? "bg-zinc-200 dark:bg-zinc-700 text-zinc-400 dark:text-zinc-500 cursor-not-allowed"
                  : "bg-indigo-500 hover:bg-indigo-600 text-white hover:shadow-lg hover:shadow-indigo-500/30"
              }`}
              title="Send message"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
      {/* Safe area for mobile */}
      <div style={{ height: "max(env(safe-area-inset-bottom), 0px)" }} />
    </div>
  );
}
