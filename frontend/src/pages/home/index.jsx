// pages/home/index.jsx

import { useState } from "react";
import ChatWindow from "./components/ChatWindow";
import ChatInput from "./components/ChatInput";
import axiosInstance from "../../services/axiosInstance";

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

    
      console.log("user input:",text);
      console.log("previous messages:",messages);

    try {
      // Call backend API on the correct route
      const res = await axiosInstance.post("/chatbot/send", {
        message: text,
      });

      console.log("backend response: ",res.data.aiResponse);
      

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
    <div className="flex flex-col min-h-[80vh]">
      <ChatWindow messages={messages} loading={loading} />
      <ChatInput onSend={handleSend} />
    </div>
  );
};

export default Home;
