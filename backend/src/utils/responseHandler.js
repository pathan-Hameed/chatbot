/**
 * Standardized API Response Handler
 * Ensures all responses follow the same format
 */

export const sendSuccess = (
  res,
  data = null,
  message = "Success",
  statusCode = 200,
) => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export const sendError = (
  res,
  message = "Error",
  statusCode = 500,
  errorCode = null,
) => {
  res.status(statusCode).json({
    success: false,
    message,
    ...(errorCode && { error: errorCode }),
  });
};
