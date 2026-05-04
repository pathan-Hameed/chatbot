import MessageBubble from "./MessageBubble";
import SuggestedPrompts from "./SuggestedPrompts";

/**
 * Main chat window component
 * @param {Object} props
 * @param {Array} props.messages - Chat messages
 * @param {boolean} props.isLoading - Loading state
 * @param {Function} props.onSuggestedPrompt - Callback for suggested prompts
 * @param {Function} props.onRegenerate - Callback to regenerate last message
 * @param {React.RefObject} props.messagesEndRef - Ref to scroll container
 */
export default function ChatWindow({
  messages,
  isLoading,
  onSuggestedPrompt,
  onRegenerate,
  messagesEndRef,
}) {
  return (
    <div className="flex-1 overflow-y-auto bg-white dark:bg-zinc-950">
      <div className="w-full max-w-3xl mx-auto px-4 py-6 md:px-6 md:py-8 pb-4">
        {messages.length === 0 ? (
          <SuggestedPrompts onPromptClick={onSuggestedPrompt} />
        ) : (
          <>
            {messages.map((msg, idx) => (
              <MessageBubble
                key={msg.id}
                role={msg.role}
                content={msg.content}
                timestamp={msg.timestamp}
                isLoading={
                  isLoading &&
                  idx === messages.length - 1 &&
                  msg.role === "assistant"
                }
                isLast={idx === messages.length - 1}
                onRegenerate={onRegenerate}
              />
            ))}

            {/* Loading indicator */}
            {isLoading && messages.length > 0 && (
              <MessageBubble
                role="assistant"
                content=""
                timestamp={new Date()}
                isLoading={true}
                isLast={true}
                onRegenerate={() => {}}
              />
            )}

            {/* Scroll anchor */}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>
    </div>
  );
}
