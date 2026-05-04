import { useState } from "react";
import { Copy, RotateCcw } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import TypingIndicator from "./TypingIndicator";

/**
 * Message bubble component for user and AI messages
 * @param {Object} props
 * @param {'user' | 'assistant'} props.role - Message role
 * @param {string} props.content - Message content
 * @param {Date} props.timestamp - Message timestamp
 * @param {boolean} props.isLoading - Whether AI is still typing
 * @param {boolean} props.isLast - Whether this is the last message
 * @param {Function} props.onRegenerate - Callback for regenerate button
 */
export default function MessageBubble({
  role,
  content,
  timestamp,
  isLoading,
  isLast,
  onRegenerate,
}) {
  const [copied, setCopied] = useState(false);

  const isUser = role === "user";

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      <div
        className={`flex ${isUser ? "justify-end" : "justify-start items-start"} gap-3 group`}
      >
        {/* AI Avatar */}
        {!isUser && (
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-sm font-semibold text-indigo-600 dark:text-indigo-400 mt-1">
            AI
          </div>
        )}

        {/* Message Content */}
        <div
          className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
        >
          <div
            className={`rounded-2xl px-4 py-3 max-w-[85%] md:max-w-[72%] ${
              isUser
                ? "bg-indigo-500 text-white rounded-br-sm"
                : "bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-bl-sm text-zinc-900 dark:text-zinc-100"
            }`}
          >
            {isLoading && !content ? (
              <TypingIndicator />
            ) : (
              <div className="prose dark:prose-invert prose-sm max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code: ({ inline, className, children }) => {
                      if (inline) {
                        return (
                          <code className="bg-zinc-200 dark:bg-zinc-700 px-2 py-0.5 rounded text-sm">
                            {children}
                          </code>
                        );
                      }
                      return (
                        <div className="relative bg-zinc-900 text-zinc-100 rounded-lg p-4 my-2">
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(
                                typeof children[0] === "string"
                                  ? children[0]
                                  : children.toString(),
                              );
                            }}
                            className="absolute top-2 right-2 p-1.5 bg-zinc-700 hover:bg-zinc-600 rounded transition-colors"
                            title="Copy code"
                          >
                            <Copy size={16} />
                          </button>
                          <pre className="overflow-x-auto">
                            <code className={className}>{children}</code>
                          </pre>
                        </div>
                      );
                    },
                    p: ({ children }) => (
                      <p className="mb-2 last:mb-0">{children}</p>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-disc list-inside mb-2 space-y-1">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal list-inside mb-2 space-y-1">
                        {children}
                      </ol>
                    ),
                    li: ({ children }) => <li>{children}</li>,
                    h1: ({ children }) => (
                      <h1 className="text-xl font-bold mt-3 mb-2">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-lg font-bold mt-3 mb-2">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-base font-bold mt-2 mb-1">
                        {children}
                      </h3>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-zinc-300 dark:border-zinc-600 pl-3 italic my-2">
                        {children}
                      </blockquote>
                    ),
                    a: ({ href, children }) => (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 dark:text-indigo-400 hover:underline"
                      >
                        {children}
                      </a>
                    ),
                  }}
                >
                  {content}
                </ReactMarkdown>
              </div>
            )}
          </div>

          {/* Timestamp */}
          <div className="text-xs text-zinc-400 mt-1.5 px-1">
            {formatTime(timestamp)}
          </div>

          {/* AI Message Actions */}
          {!isUser && (
            <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={handleCopy}
                className="h-7 px-2 text-xs bg-zinc-100 dark:bg-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-600 rounded-lg transition-colors text-zinc-700 dark:text-zinc-300 flex items-center gap-1"
                title="Copy message"
              >
                <Copy size={14} />
                {copied ? "Copied" : "Copy"}
              </button>

              {isLast && !isLoading && (
                <button
                  onClick={onRegenerate}
                  className="h-7 px-2 text-xs bg-zinc-100 dark:bg-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-600 rounded-lg transition-colors text-zinc-700 dark:text-zinc-300 flex items-center gap-1"
                  title="Regenerate response"
                >
                  <RotateCcw size={14} />
                  Regenerate
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
