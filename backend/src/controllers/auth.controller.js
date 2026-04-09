// ============================================================
// AUTHENTICATION CONTROLLER
// Remove this file if authentication is not needed
// ============================================================

import { asyncHandler } from "../utils/asyncHandler.js";
import { sendSuccess, sendError } from "../utils/responseHandler.js";
import { AppError } from "../utils/AppError.js";
import User from "../models/user.model.js";
import {
  generateAccessToken,
  generateRefreshToken,
  setAuthCookies,
  clearAuthCookies,
  saveRefreshTokenToDB,
  verifyRefreshTokenInDB,
  revokeRefreshToken,
} from "../services/auth.service.js";

/**
 * POST /api/auth/register
 * Register a new user and set authentication cookies
 */
export const register = asyncHandler(async (req, res, next) => {
  const { email, password, name } = req.body;

  // Validation
  if (!email || !password || !name) {
    return next(
      new AppError(
        "Email, password, and name are required",
        400,
        "MISSING_FIELDS",
      ),
    );
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(
      new AppError("User with this email already exists", 409, "USER_EXISTS"),
    );
  }

  // Create new user
  const user = await User.create({
    email,
    password,
    name,
    role: "user",
  });

  // Generate tokens
  const accessToken = generateAccessToken(user._id.toString(), user.role);
  const refreshToken = generateRefreshToken(user._id.toString());

  // Save refresh token to database
  await saveRefreshTokenToDB(user._id, refreshToken);

  // Set cookies
  setAuthCookies(res, accessToken, refreshToken);

  // Return success response
  sendSuccess(
    res,
    {
      user: user.toJSON(),
    },
    "User registered successfully",
    201,
  );
});

/**
 * POST /api/auth/login
 * Login user and set authentication cookies
 */
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    return next(
      new AppError("Email and password are required", 400, "MISSING_FIELDS"),
    );
  }

  // Find user (need to select password field)
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(
      new AppError("Invalid email or password", 401, "INVALID_CREDENTIALS"),
    );
  }

  // Verify password
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    return next(
      new AppError("Invalid email or password", 401, "INVALID_CREDENTIALS"),
    );
  }

  // Generate tokens
  const accessToken = generateAccessToken(user._id.toString(), user.role);
  const refreshToken = generateRefreshToken(user._id.toString());

  // Save refresh token to database
  await saveRefreshTokenToDB(user._id, refreshToken);

  // Set cookies
  setAuthCookies(res, accessToken, refreshToken);

  // Return success response
  sendSuccess(
    res,
    {
      user: user.toJSON(),
    },
    "Login successful",
    200,
  );
});

/**
 * POST /api/auth/logout
 * Logout user and clear authentication cookies
 */
export const logout = asyncHandler(async (req, res, next) => {
  const userId = req.user.userId;

  // Revoke refresh token in database
  await revokeRefreshToken(userId);

  // Clear cookies
  clearAuthCookies(res);

  // Return success response
  sendSuccess(res, null, "Logout successful", 200);
});

/**
 * POST /api/auth/refresh
 * Refresh access token using refresh token from cookie
 */
export const refresh = asyncHandler(async (req, res, next) => {
  const userId = req.user.userId;

  // Verify refresh token is still valid in database
  const user = await verifyRefreshTokenInDB(userId, req.cookies.refreshToken);

  // Generate new access token
  const accessToken = generateAccessToken(user._id.toString(), user.role);

  // Set new access token cookie (keep refresh token as is)
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 15 * 60 * 1000,
  });

  // Return success response
  sendSuccess(
    res,
    { user: user.toJSON() },
    "Access token refreshed successfully",
    200,
  );
});

/**
 * GET /api/auth/me
 * Get current logged-in user information
 */
export const me = asyncHandler(async (req, res, next) => {
  const userId = req.user.userId;

  const user = await User.findById(userId);

  if (!user) {
    return next(new AppError("User not found", 404, "USER_NOT_FOUND"));
  }

  sendSuccess(res, { user: user.toJSON() }, "User retrieved successfully", 200);
});
