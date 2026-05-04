/**
 * Animated typing indicator with 3 bouncing dots
 */
export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 h-5">
      <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" />
      <div
        className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce"
        style={{ animationDelay: "0.1s" }}
      />
      <div
        className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce"
        style={{ animationDelay: "0.2s" }}
      />
    </div>
  );
}
