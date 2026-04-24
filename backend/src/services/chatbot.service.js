import { env } from "../config/env.js";
import ChatHistory from "../models/chatHistory.model.js";

/**
 * Call chatbot API (OpenAI or any LLM)
 * Returns mock response if no API key is configured
 */
export const callChatbotAPI = async (message) => {
  // If no API key, return mock response
  if (!env.GROQ_API_KEY) {
    console.log("No GROQ API key configured. Using mock responses.");
    return getMockResponse("missing-field");
  }

  try {
    // Call GROQ Chat Completion API
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "openai/gpt-oss-20b",
          messages: [{ role: "user", content: message }],
          max_tokens: 150,
        }),
      },
    );

    const data = await response.json();
    // console.log("raw output form openai: ", data);
    // console.log("output from openai: ", data.choices[0].message.content);

    return data.choices[0].message.content;
  } catch (error) {
    console.error("Chatbot API error:", error);
    return getMockResponse("api-failure");
  }
};

/**
 * Mock response (used when no API key is set or for testing)
 */
const getMockResponse = (type) => {
  if (type.toLowerCase().includes("api-failure")) {
    return [
      "Something went wrong with the chatbot API. Please try again later.",
    ];
  }
  if (type.toLowerCase().includes("missing-field")) {
    return [
      "It seems like some required information is missing. Please provide all necessary details.",
    ];
  }
  // Add more mock responses for different types if needed
  return ["I'm sorry, I didn't understand that. Can you please rephrase?"];
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
