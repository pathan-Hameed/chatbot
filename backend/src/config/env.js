import dotenv from "dotenv";

dotenv.config();

export const env = {
  // Server
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || "development",

  // Database
  MONGODB_URI:
    process.env.MONGODB_URI || "mongodb://localhost:27017/boilerplate",

  // Frontend
  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:5173",

  // JWT Secrets
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,

  // Token Expiry
  ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY || "15m",
  REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY || "7d",

  // OpenAI API
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || null,
};
