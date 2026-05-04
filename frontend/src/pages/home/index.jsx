// pages/home/index.jsx

import { useState } from "react";
import ChatWindow from "./components/ChatWindow";
import ChatInput from "./components/ChatInput";
import axiosInstance from "../../services/axiosInstance";
import Navbar from "@/components/shared/Navbar";

const Home = () => {
  // Stores entire chat conversation
  const [messages, setMessages] = useState([]);

  // Loading state for better UX
  const [loading, setLoading] = useState(false);

  // Function to handle sending message
  const handleSend = async (text) => {
    // Add user message to UI immediately
    const newMessage = { role: "user", content: text };
    setMessages((prev) => [...prev, newMessage]);

    setLoading(true);

    try {
      // Call backend API on the correct route
      const res = await axiosInstance.post("/chatbot/send", {
        message: text,
      });

      // Add bot response
      const botMessage = {
        role: "assistant",
        content: res.data?.aiResponse ?? "Sorry, no response from the bot.",
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full">
      <Navbar />

      {/* Messages */}
      <div className="flex-1 overflow-y-auto flex items-center justify-center z-10">
        <ChatWindow messages={messages} loading={loading} />
      </div>

      <div className="border-t flex flex-col items-center justify-center p-4">
        <ChatInput onSend={handleSend} />
        <p className="text-center pb-4 text-xs text-gray-500">
          Chatbot can make mistakes. Check important info
        </p>
      </div>
    </div>
  );
};

export default Home;
