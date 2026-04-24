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
    <div className="bg-white w-full p-4 flex items-center border-t">
      <input
        className="flex-1 border p-2 rounded"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your message..."
      />

      <button
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={handleSubmit}
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;