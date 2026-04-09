// pages/home/components/MessageBubble.jsx

const MessageBubble = ({ message }) => {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-2`}
    >
      <div
        className={`p-3 rounded-lg max-w-xs ${
          isUser
            ? "bg-blue-500 text-white"
            : "bg-white text-black border"
        }`}
      >
        {message.content}
      </div>
    </div>
  );
};

export default MessageBubble;