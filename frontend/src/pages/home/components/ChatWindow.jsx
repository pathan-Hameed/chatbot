// pages/home/components/ChatWindow.jsx

import MessageBubble from "./MessageBubble";

const ChatWindow = ({ messages, loading }) => {
  return (
    <div className="flex-1 p-4">
      {/* Loop through messages */}
      {messages.map((msg, index) => (
        <MessageBubble key={index} message={msg} />
      ))}

      {/* Show loading indicator */}
      {loading && <p className="text-gray-500">Bot is typing...</p>}
    </div>
  );
};

export default ChatWindow;