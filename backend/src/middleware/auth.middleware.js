// ============================================================
// AUTH MIDDLEWARE
// verifyAccessToken: reads accessToken from httpOnly cookie
// To remove auth: delete this file and remove from all routes
// ============================================================

import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { AppError } from "../utils/AppError.js";

export const verifyAccessToken = (req, res, next) => {
  try {
    // Get token from httpOnly cookie
    const token = req.cookies.accessToken;

    if (!token) {
      return next(
        new AppError("Access token not found. Please login.", 401, "NO_TOKEN"),
      );
    }

    // Verify token
    const decoded = jwt.verify(token, env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(
        new AppError(
          "Access token expired. Please refresh.",
          401,
          "TOKEN_EXPIRED",
        ),
      );
    }
    if (error.name === "JsonWebTokenError") {
      return next(new AppError("Invalid access token.", 401, "INVALID_TOKEN"));
    }
    next(error);
  }
};

export const verifyRefreshToken = (req, res, next) => {
  try {
    // Get token from httpOnly cookie
    const token = req.cookies.refreshToken;

    if (!token) {
      return next(
        new AppError(
          "Refresh token not found. Please login again.",
          401,
          "NO_REFRESH_TOKEN",
        ),
      );
    }

    // Verify token
    const decoded = jwt.verify(token, env.REFRESH_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(
        new AppError(
          "Refresh token expired. Please login again.",
          401,
          "REFRESH_TOKEN_EXPIRED",
        ),
      );
    }
    if (error.name === "JsonWebTokenError") {
      return next(
        new AppError("Invalid refresh token.", 401, "INVALID_REFRESH_TOKEN"),
      );
    }
    next(error);
  }
};
