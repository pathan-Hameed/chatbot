// pages/home/components/ChatInput.jsx

import { useState } from "react";

const ChatInput = ({ onSend }) => {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (!text.trim()) return;

    onSend(text); // send message to parent
    setText(""); // clear input
  };

  return (
    <div className="bg-white w-2/3 flex items-center">
      <input
        className="flex-1 border rounded-full h-12"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your message..."
      />

      <button
        className="bg-blue-500 text-white rounded-full h-12 w-12 flex items-center justify-center"
        onClick={handleSubmit}
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;