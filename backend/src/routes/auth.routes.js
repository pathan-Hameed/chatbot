// ============================================================
// AUTHENTICATION ROUTES
// Remove this file if authentication is not needed
// ============================================================

import express from "express";
import {
  register,
  login,
  logout,
  refresh,
  me,
} from "../controllers/auth.controller.js";
import {
  verifyAccessToken,
  verifyRefreshToken,
} from "../middleware/auth.middleware.js";

const router = express.Router();

// POST /api/auth/register - Create new user
router.post("/register", register);

// POST /api/auth/login - Login user
router.post("/login", login);

// POST /api/auth/logout - Logout user (protected)
router.post("/logout", verifyAccessToken, logout);

// POST /api/auth/refresh - Refresh access token (protected)
router.post("/refresh", verifyRefreshToken, refresh);

// GET /api/auth/me - Get current user (protected)
router.get("/me", verifyAccessToken, me);

export default router;
