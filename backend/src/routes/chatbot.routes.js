import express from "express";
import {
  sendMessage,
  getHistory,
  clearHistory,
} from "../controllers/chatbot.controller.js";
import { verifyAccessToken } from "../middleware/auth.middleware.js";

const router = express.Router();

// POST /api/chatbot/send - Send message and get AI response
// This route is public so chatbot usage does not require login
router.post("/send", sendMessage);

// The remaining routes require authentication
router.use(verifyAccessToken);

// GET /api/chatbot/history - Get chat history
router.get("/history", getHistory);

// DELETE /api/chatbot/clear - Clear chat history
router.delete("/clear", clearHistory);

export default router;
