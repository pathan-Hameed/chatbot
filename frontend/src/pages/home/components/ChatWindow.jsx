// pages/home/components/ChatWindow.jsx
import MessageBubble from "./MessageBubble";

const ChatWindow = ({ messages, loading }) => {
  return (
    <div className="flex-1 overflow-y-auto border border-green-700 flex items-center justify-center z-10">
      <div className="w-full max-w-3xl border-rose-700">
        {messages.map((msg, index) => (
          <MessageBubble key={index} message={msg} />
        ))}
      </div>
    </div>
  );
};

export default ChatWindow;
