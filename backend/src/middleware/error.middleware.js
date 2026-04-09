// Global Error Handler Middleware
// Must be used as the last middleware in Express app
// Catches all errors passed to next() and returns standardized error response

import { sendError } from "../utils/responseHandler.js";
import { AppError } from "../utils/AppError.js";

export const globalErrorHandler = (err, req, res, next) => {
  // Set default error properties
  err.statusCode = err.statusCode || 500;

  // Handle Mongoose Validation Error
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    return sendError(res, messages.join(", "), 400, "VALIDATION_ERROR");
  }

  // Handle Mongoose Duplicate Key Error
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return sendError(res, `${field} already exists`, 400, "DUPLICATE_KEY");
  }

  // Handle Mongoose Cast Error (invalid ObjectId)
  if (err.name === "CastError") {
    return sendError(res, "Invalid data format", 400, "CAST_ERROR");
  }

  // Handle Custom AppError
  if (err.isOperational) {
    return sendError(res, err.message, err.statusCode, err.errorCode);
  }

  // Handle unknown errors
  console.error("❌ Unexpected Error:", err);

  sendError(
    res,
    "Something went wrong. Please try again later.",
    err.statusCode,
    null,
  );
};
