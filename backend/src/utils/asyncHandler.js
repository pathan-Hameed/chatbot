/**
 * Wrapper for async route handlers
 * Automatically catches errors and passes them to the global error handler
 * Usage: router.post('/route', asyncHandler(controllerFunction))
 */
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
