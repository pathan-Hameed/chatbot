// pages/home/components/ChatWindow.jsx

import MessageBubble from "./MessageBubble";

const ChatWindow = ({ messages, loading }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
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