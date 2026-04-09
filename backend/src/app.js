import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { env } from "./config/env.js";
import { globalErrorHandler } from "./middleware/error.middleware.js";
import routes from "./routes/index.js";

const app = express();

// ============================================================
// SECURITY MIDDLEWARE
// ============================================================

// Security Headers
app.use(helmet());

// CORS with credentials
app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
    optionsSuccessStatus: 200,
  }),
);

// Limit payload size to prevent large uploads
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ limit: "10kb", extended: true }));

// Cookie Parser
app.use(cookieParser());

// Rate Limiting on auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // max 20 requests per windowMs
  message: "Too many authentication attempts, please try again later",
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api/auth/login", authLimiter);
app.use("/api/auth/register", authLimiter);

// Logging Middleware (only in development)
if (env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// ============================================================
// ROUTES
// ============================================================

app.use("/api", routes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.originalUrl,
  });
});

// ============================================================
// GLOBAL ERROR HANDLER
// Must be last middleware
// ============================================================

app.use(globalErrorHandler);

export default app;
