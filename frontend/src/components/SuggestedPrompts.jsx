import { MessageCircle } from "lucide-react";

/**
 * Empty state with suggested prompt chips
 * @param {Object} props
 * @param {Function} props.onPromptClick - Callback when prompt is clicked
 */
export default function SuggestedPrompts({ onPromptClick }) {
  const suggestedPrompts = [
    "Explain quantum computing basics",
    "Help me write a React component",
    "What is machine learning?",
    "Debug my code: why is it slow?",
  ];

  return (
    <div className="flex flex-col items-center justify-center flex-1 px-4 py-12 gap-8 text-center">
      {/* Logo/Icon */}
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900">
        <MessageCircle className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
      </div>

      {/* Title and Subtitle */}
      <div>
        <h1 className="text-xl font-semibold text-zinc-900 dark:text-white mb-1">
          AI Chatbot
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          How can I help you today?
        </p>
      </div>

      {/* Suggested Prompts Grid */}
      <div className="w-full max-w-lg grid grid-cols-1 sm:grid-cols-2 gap-3">
        {suggestedPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => onPromptClick(prompt)}
            className="px-4 py-3 text-left text-sm rounded-xl border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-150 text-zinc-700 dark:text-zinc-300"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
}
