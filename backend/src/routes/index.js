// ============================================================
// ROUTE REGISTRY
// Add new feature routes below following the same pattern
// Remove auth routes import if authentication is not needed
// ============================================================

import express from "express";
import authRoutes from "./auth.routes.js";
import chatbotRoutes from "./chatbot.routes.js";

const router = express.Router();

// Authentication routes (remove if auth not needed)
router.use("/auth", authRoutes);

// Chatbot feature routes
router.use("/chatbot", chatbotRoutes);

// Health check route
router.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Backend is running",
    timestamp: new Date().toISOString(),
  });
});

export default router;
