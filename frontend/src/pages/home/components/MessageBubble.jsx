// pages/home/components/MessageBubble.jsx

const MessageBubble = ({ message }) => {
  const isUser = message.role === "user";

  return (
    <div className={`flex mb-4 ${isUser ? "justify-end" : "justify-start"}`}>
      
      <div
        className={`
          px-4 py-2 rounded-lg max-w-[75%]
          ${isUser 
            ? "bg-blue-500 text-white" 
            : "bg-gray-100 text-black"}
        `}
      >
        {message.content}
      </div>

    </div>
  );
};

export default MessageBubble;