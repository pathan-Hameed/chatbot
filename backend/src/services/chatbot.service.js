import { env } from "../config/env.js";
import ChatHistory from "../models/chatHistory.model.js";

/**
 * Call chatbot API (OpenAI or any LLM)
 * Returns mock response if no API key is configured
 */
export const callChatbotAPI = async (message) => {
  // If no API key, return mock response
  if (!env.OPENAI_API_KEY) {
    logger.warn("No OpenAI API key configured. Using mock responses.");
    return getMockResponse(message);
  }

  try {
    // Call OpenAI Chat Completion API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
        max_tokens: 150,
      }),
    });
    
    const data = await response.json();
    console.log("raw output form openai: ", data);
    console.log("output from openai: ", data.choices[0].message.content);
    
    return data.choices[0].message.content;

  } catch (error) {
    console.error("Chatbot API error:", error);
    return getMockResponse(message);
  }
};

/**
 * Mock response (used when no API key is set or for testing)
 */
const getMockResponse = (userMessage) => {
  const responses = [
    "That's an interesting question! Let me think about that.",
    "I'd love to help you with that. Can you tell me more?",
    "That makes sense. Here's what I think about it...",
    "Good point! Here's my perspective on that.",
    "I understand. Let me provide some insight on that.",
  ];

  return responses[Math.floor(Math.random() * responses.length)];
};

/**
 * Save message to chat history
 */
export const saveChatMessage = async (userId, role, content) => {
  try {
    let chatHistory = await ChatHistory.findOne({ userId });

    if (!chatHistory) {
      chatHistory = new ChatHistory({
        userId,
        messages: [],
      });
    }

    chatHistory.messages.push({
      role,
      content,
      timestamp: new Date(),
    });

    await chatHistory.save();
    return chatHistory;
  } catch (error) {
    throw new Error("Failed to save chat message: " + error.message);
  }
};

/**
 * Get chat history for a user
 */
export const getChatHistory = async (userId) => {
  try {
    const chatHistory = await ChatHistory.findOne({ userId });

    if (!chatHistory) {
      return { userId, messages: [] };
    }

    return chatHistory;
  } catch (error) {
    throw new Error("Failed to retrieve chat history: " + error.message);
  }
};

/**
 * Clear chat history for a user
 */
export const clearChatHistory = async (userId) => {
  try {
    await ChatHistory.deleteOne({ userId });
  } catch (error) {
    throw new Error("Failed to clear chat history: " + error.message);
  }
};
