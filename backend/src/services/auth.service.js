// ============================================================
// AUTHENTICATION SERVICE
// Remove this file if authentication is not needed
// ============================================================

import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import User from "../models/user.model.js";
import { AppError } from "../utils/AppError.js";

/**
 * Generate access token (15 minutes)
 */
export const generateAccessToken = (userId, role) => {
  return jwt.sign({ userId, role }, env.ACCESS_TOKEN_SECRET, {
    expiresIn: env.ACCESS_TOKEN_EXPIRY,
  });
};

/**
 * Generate refresh token (7 days)
 */
export const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, env.REFRESH_TOKEN_SECRET, {
    expiresIn: env.REFRESH_TOKEN_EXPIRY,
  });
};

/**
 * Get cookie options (same for both tokens)
 */
export const getCookieOptions = (maxAge) => {
  return {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge,
  };
};

/**
 * Set auth cookies in response
 */
export const setAuthCookies = (res, accessToken, refreshToken) => {
  // Access token: expires in 15 minutes
  res.cookie("accessToken", accessToken, getCookieOptions(15 * 60 * 1000));

  // Refresh token: expires in 7 days
  res.cookie(
    "refreshToken",
    refreshToken,
    getCookieOptions(7 * 24 * 60 * 60 * 1000),
  );
};

/**
 * Clear auth cookies
 */
export const clearAuthCookies = (res) => {
  res.clearCookie("accessToken", { path: "/" });
  res.clearCookie("refreshToken", { path: "/" });
};

/**
 * Save refresh token to user document (for revocation)
 */
export const saveRefreshTokenToDB = async (userId, refreshToken) => {
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { refreshToken },
      { new: true },
    );
    return user;
  } catch (error) {
    throw new AppError("Failed to save refresh token", 500, "DB_ERROR");
  }
};

/**
 * Verify refresh token is stored in database (prevents token reuse attacks)
 */
export const verifyRefreshTokenInDB = async (userId, refreshToken) => {
  try {
    const user = await User.findById(userId);

    if (!user || user.refreshToken !== refreshToken) {
      throw new AppError(
        "Refresh token is invalid or has been revoked",
        401,
        "INVALID_REFRESH_TOKEN",
      );
    }

    return user;
  } catch (error) {
    if (error.isOperational) throw error;
    throw new AppError("Failed to verify refresh token", 500, "DB_ERROR");
  }
};

/**
 * Revoke refresh token (logout)
 */
export const revokeRefreshToken = async (userId) => {
  try {
    await User.findByIdAndUpdate(userId, { refreshToken: null });
  } catch (error) {
    throw new AppError("Failed to revoke refresh token", 500, "DB_ERROR");
  }
};
