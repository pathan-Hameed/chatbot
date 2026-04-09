import { asyncHandler } from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/responseHandler.js";
import { AppError } from "../utils/AppError.js";
import {
  callChatbotAPI,
  saveChatMessage,
  getChatHistory,
  clearChatHistory,
} from "../services/chatbot.service.js";

/**
 * POST /api/chatbot/send
 * Send message to chatbot and get response
 */
export const sendMessage = asyncHandler(async (req, res, next) => {
  const { message } = req.body;
  const userId = req.user?.userId;

  // Validation
  if (!message || message.trim() === "") {
    return next(
      new AppError("Message content is required", 400, "MISSING_MESSAGE"),
    );
  }

  // Save user message to history when authenticated
  if (userId) {
    await saveChatMessage(userId, "user", message);
  }

  // Get response from chatbot API
  const aiResponse = await callChatbotAPI(message);

  // Save AI response to history when authenticated
  if (userId) {
    await saveChatMessage(userId, "assistant", aiResponse);
  }

  // Return success response
  sendSuccess(
    res,
    {
      userMessage: message,
      aiResponse,
    },
    "Message processed successfully",
    200,
  );
});

/**
 * GET /api/chatbot/history
 * Get chat history for current user
 */
export const getHistory = asyncHandler(async (req, res, next) => {
  const userId = req.user.userId;

  const chatHistory = await getChatHistory(userId);

  sendSuccess(res, chatHistory, "Chat history retrieved successfully", 200);
});

/**
 * DELETE /api/chatbot/clear
 * Clear chat history for current user
 */
export const clearHistory = asyncHandler(async (req, res, next) => {
  const userId = req.user.userId;

  await clearChatHistory(userId);

  sendSuccess(res, null, "Chat history cleared successfully", 200);
});
