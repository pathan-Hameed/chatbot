// ============================================================
// RBAC MIDDLEWARE
// authorize(...roles): checks user role after verifyAccessToken
// Roles: "user" | "admin" | "superadmin"
// To disable RBAC: remove authorize() from routes, keep verifyAccessToken
// To remove entirely: delete this file and remove from all routes
// ============================================================

import { AppError } from "../utils/AppError.js";

export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(
        new AppError("User not authenticated", 401, "NOT_AUTHENTICATED"),
      );
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(
        new AppError(
          `Insufficient permissions. Required role: ${allowedRoles.join(", ")}`,
          403,
          "INSUFFICIENT_PERMISSIONS",
        ),
      );
    }

    next();
  };
};
