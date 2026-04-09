# 🚀 Production-Ready Node.js Backend Boilerplate

A full-featured, production-level backend boilerplate built with **Node.js + Express + MongoDB** with built-in authentication, RBAC, and chatbot integration.

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [Environment Variables](#environment-variables)
- [API Routes](#api-routes)
- [Authentication System](#authentication-system)
- [RBAC System](#rbac-system)
- [Error Handling](#error-handling)
- [Removing Features](#removing-features)

---

## ✨ Features

✅ **Cookie-Based Authentication** - httpOnly cookies for secure token storage
✅ **JWT Access & Refresh Tokens** - Short-lived access tokens (15 min) + Long-lived refresh tokens (7 days)
✅ **Role-Based Access Control (RBAC)** - Three roles: user, admin, superadmin
✅ **Chatbot Routes** - Example feature showing how to add new routes
✅ **Standardized API Responses** - Consistent success/error response format
✅ **Global Error Handler** - Centralized error handling with proper HTTP status codes
✅ **Security Best Practices** - Helmet, CORS, rate limiting, body size limits
✅ **Clean Code** - Well-organized, documented, and easy to extend
✅ **Production Ready** - Async handlers, request validation, database connection handling

---

## 🛠️ Tech Stack

| Technology         | Version | Purpose               |
| ------------------ | ------- | --------------------- |
| Node.js            | 16+     | Runtime               |
| Express.js         | ^4.18.2 | Web framework         |
| MongoDB            | 5.0+    | Database              |
| Mongoose           | ^8.0.3  | ODM                   |
| JWT                | ^9.0.2  | Token generation      |
| bcryptjs           | ^2.4.3  | Password hashing      |
| cookie-parser      | ^1.4.6  | Cookie handling       |
| helmet             | ^7.1.0  | Security headers      |
| cors               | ^2.8.5  | Cross-origin requests |
| express-rate-limit | ^7.1.5  | Rate limiting         |
| morgan             | ^1.10.0 | Logging               |
| dotenv             | ^16.3.1 | Environment variables |
| nodemon            | ^3.0.2  | Development reloading |

---

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── db.js              # MongoDB connection setup
│   │   └── env.js             # Environment variables (centralized)
│   │
│   ├── controllers/
│   │   ├── auth.controller.js       # Register, login, logout, refresh, me
│   │   └── chatbot.controller.js    # Send message, get history, clear
│   │
│   ├── middleware/
│   │   ├── auth.middleware.js       # JWT verification
│   │   ├── rbac.middleware.js       # Role-based access control
│   │   └── error.middleware.js      # Global error handler
│   │
│   ├── models/
│   │   ├── user.model.js            # User schema with role & refreshToken
│   │   └── chatHistory.model.js     # Chat history with messages
│   │
│   ├── routes/
│   │   ├── index.js                 # Route registry
│   │   ├── auth.routes.js           # /api/auth/*
│   │   └── chatbot.routes.js        # /api/chatbot/*
│   │
│   ├── services/
│   │   ├── auth.service.js          # Token generation and cookie logic
│   │   └── chatbot.service.js       # Chatbot API and chat logic
│   │
│   ├── utils/
│   │   ├── AppError.js              # Custom error class
│   │   ├── asyncHandler.js          # Async route wrapper
│   │   └── responseHandler.js       # Standardized responses
│   │
│   └── app.js                       # Express app configuration
│
├── server.js                        # Entry point
├── package.json                     # Dependencies and scripts
├── .env                             # Environment variables (local)
├── .env.example                     # Environment template
└── .gitignore                       # Git ignore rules
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ installed
- MongoDB running locally or connection string ready
- npm or yarn package manager

### Installation

1. **Navigate to backend directory**

   ```bash
   cd backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start development server**

   ```bash
   npm run dev
   ```

   Server runs on `http://localhost:5001` (or your configured PORT)

5. **Test health endpoint**
   ```bash
   curl http://localhost:5001/api/health
   ```

---

## 🔐 Environment Variables

Create a `.env` file based on `.env.example`:

```env
# Server
PORT=5001                                                    # Server port
NODE_ENV=development                                         # Environment: development/production

# Database
MONGODB_URI=mongodb://localhost:27017/boilerplate           # MongoDB connection string

# Frontend
CLIENT_URL=http://localhost:5173                            # Frontend URL (for CORS)

# JWT Tokens
ACCESS_TOKEN_SECRET=your_access_token_secret_key            # Secret for access token signing
REFRESH_TOKEN_SECRET=your_refresh_token_secret_key          # Secret for refresh token signing
ACCESS_TOKEN_EXPIRY=15m                                     # Access token expiry: 15 minutes
REFRESH_TOKEN_EXPIRY=7d                                     # Refresh token expiry: 7 days

# Optional
OPENAI_API_KEY=                                             # OpenAI API key (optional for chatbot)
```

**Important Security Tips:**

- Use strong, random secrets for ACCESS_TOKEN_SECRET and REFRESH_TOKEN_SECRET
- Never commit `.env` file with real secrets
- Use environment-specific `.env` files for staging/production
- Rotate secrets periodically

---

## 🔌 API Routes

### Domain Health Check

```
GET /api/health
Response: { success: true, message: "Backend is running", timestamp: "..." }
```

### Authentication Routes (`/api/auth`)

| Method | Route       | Auth | Description                             |
| ------ | ----------- | ---- | --------------------------------------- |
| POST   | `/register` | ❌   | Create new user                         |
| POST   | `/login`    | ❌   | Login and receive cookies               |
| POST   | `/logout`   | ✅   | Logout (requires access token)          |
| POST   | `/refresh`  | 🔄   | Refresh access token with refresh token |
| GET    | `/me`       | ✅   | Get current logged-in user              |

**Example Requests:**

Register:

```bash
curl -X POST http://localhost:5001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123","name":"John Doe"}'
```

Login:

```bash
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'

# Response includes Set-Cookie headers for accessToken and refreshToken
```

Get Current User (with accessToken cookie):

```bash
curl http://localhost:5001/api/auth/me \
  -H "Cookie: accessToken=<token>"
```

### Chatbot Routes (`/api/chatbot`) ✅ Protected

| Method | Route      | Description                       |
| ------ | ---------- | --------------------------------- |
| POST   | `/send`    | Send message and get AI response  |
| GET    | `/history` | Get chat history for current user |
| DELETE | `/clear`   | Clear all chat history            |

**Example Requests:**

Send Message:

```bash
curl -X POST http://localhost:5001/api/chatbot/send \
  -H "Content-Type: application/json" \
  -H "Cookie: accessToken=<token>" \
  -d '{"message":"Hello, how are you?"}'
```

Get History:

```bash
curl http://localhost:5001/api/chatbot/history \
  -H "Cookie: accessToken=<token>"
```

Clear History:

```bash
curl -X DELETE http://localhost:5001/api/chatbot/clear \
  -H "Cookie: accessToken=<token>"
```

---

## 🔐 Authentication System

### How It Works

1. **User registers/logs in** → Backend creates access + refresh tokens
2. **Tokens stored as httpOnly cookies** → Browser automatically sends with requests
3. **Access token expires in 15 minutes** → User uses refresh token to get new access token
4. **Refresh token stored in MongoDB** → Allows token revocation on logout

### Cookie Settings

```javascript
{
  httpOnly: true,                              // Cannot be accessed by JavaScript
  secure: process.env.NODE_ENV === "production", // HTTPS only in production
  sameSite: "strict",                         // CSRF protection
  path: "/"
}
```

### Access Token (15 minutes)

- Sent in `accessToken` httpOnly cookie
- Verified on protected routes with `verifyAccessToken` middleware
- Contains: `{ userId, role }`

### Refresh Token (7 days)

- Sent in `refreshToken` httpOnly cookie
- Stored in user document for revocation
- Used to generate new access tokens via `/api/auth/refresh` endpoint

### Token Flow Diagram

```
[Register/Login]
    ↓
[Generate Access Token (15m) + Refresh Token (7d)]
    ↓
[Set both as httpOnly cookies]
    ↓
[Protected route] → [verifyAccessToken checks accessToken cookie]
    ↓
[If expired] → [POST /refresh] → [Verify refreshToken, generate new accessToken]
    ↓
[Logout] → [Clear cookies + Revoke refreshToken in DB]
```

---

## 👥 RBAC System

### Roles

- **user** - Default role for new users
- **admin** - Has admin panel access
- **superadmin** - Full system access

### How to Use RBAC

In routes, use the `authorize` middleware after `verifyAccessToken`:

```javascript
import { verifyAccessToken } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/rbac.middleware.js";

// Only superadmin can access
router.get("/admin-panel", verifyAccessToken, authorize("superadmin"), handler);

// Admin and superadmin can access
router.get(
  "/stats",
  verifyAccessToken,
  authorize("admin", "superadmin"),
  handler,
);

// All authenticated users
router.get("/dashboard", verifyAccessToken, handler);
```

### User Model Role Field

```javascript
{
  role: {
    type: String,
    enum: ["user", "admin", "superadmin"],
    default: "user"
  }
}
```

---

## ⚠️ Error Handling

### Standardized Error Response

All errors follow this format:

```json
{
  "success": false,
  "message": "Invalid credentials",
  "error": "INVALID_CREDENTIALS"
}
```

### Error Types Handled

| Error                | Status | Example                  |
| -------------------- | ------ | ------------------------ |
| Validation Error     | 400    | Missing required fields  |
| Authentication Error | 401    | Invalid token or expired |
| Authorization Error  | 403    | Insufficient permissions |
| Not Found            | 404    | Route not found          |
| Duplicate Key        | 409    | Email already exists     |
| Server Error         | 500    | Unexpected error         |

### Global Error Handler

All errors are caught by the global error middleware in `middleware/error.middleware.js`, which:

- Handles Mongoose validation errors
- Handles JWT errors
- Handles duplicate key errors (MongoDB)
- Handles custom AppError throws
- Returns standardized error responses

---

## 📝 Adding New Features

### Example: Adding an Admin Dashboard Route

1. **Create controller** (`src/controllers/admin.controller.js`)

   ```javascript
   import { asyncHandler } from "../utils/asyncHandler.js";
   import { sendSuccess } from "../utils/responseHandler.js";

   export const getDashboard = asyncHandler(async (req, res, next) => {
     // Your logic here
     sendSuccess(res, { stats: {...} }, "Dashboard data retrieved", 200);
   });
   ```

2. **Create route** (`src/routes/admin.routes.js`)

   ```javascript
   import express from "express";
   import { getDashboard } from "../controllers/admin.controller.js";
   import { verifyAccessToken } from "../middleware/auth.middleware.js";
   import { authorize } from "../middleware/rbac.middleware.js";

   const router = express.Router();

   router.get(
     "/dashboard",
     verifyAccessToken,
     authorize("admin", "superadmin"),
     getDashboard,
   );

   export default router;
   ```

3. **Register route** in `src/routes/index.js`
   ```javascript
   import adminRoutes from "./admin.routes.js";
   router.use("/admin", adminRoutes);
   ```

---

## 🗑️ Removing Features

### If You Don't Need Authentication

All auth files have this comment:

```javascript
// ============================================================
// AUTHENTICATION MODULE
// Remove this file if authentication is not needed
// Also remove: auth.routes.js, auth.middleware.js,
//              rbac.middleware.js, user.model.js (refreshToken field)
// ============================================================
```

**To completely remove auth:**

1. Delete these files:
   - `src/controllers/auth.controller.js`
   - `src/routes/auth.routes.js`
   - `src/middleware/auth.middleware.js`
   - `src/middleware/rbac.middleware.js`
   - `src/services/auth.service.js`
   - `src/models/user.model.js`

2. Remove from `src/routes/index.js`:

   ```javascript
   // Remove this line:
   import authRoutes from "./auth.routes.js";
   router.use("/auth", authRoutes);
   ```

3. Remove auth-related packages from `package.json`:
   - jsonwebtoken
   - bcryptjs
   - cookie-parser (if not needed elsewhere)

### If You Don't Need Chatbot

1. Delete these files:
   - `src/controllers/chatbot.controller.js`
   - `src/routes/chatbot.routes.js`
   - `src/services/chatbot.service.js`
   - `src/models/chatHistory.model.js`

2. Remove from `src/routes/index.js`:
   ```javascript
   // Remove this line:
   import chatbotRoutes from "./chatbot.routes.js";
   router.use("/chatbot", chatbotRoutes);
   ```

---

## 🧪 Testing the Backend

### Using curl (command-line)

```bash
# 1. Register a user
curl -X POST http://localhost:5001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!","name":"Test User"}' \
  -c cookies.txt

# 2. Login
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!"}' \
  -c cookies.txt

# 3. Get current user
curl http://localhost:5001/api/auth/me -b cookies.txt

# 4. Send chatbot message
curl -X POST http://localhost:5001/api/chatbot/send \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello!"}' \
  -b cookies.txt

# 5. Get chat history
curl http://localhost:5001/api/chatbot/history -b cookies.txt

# 6. Logout
curl -X POST http://localhost:5001/api/auth/logout -b cookies.txt
```

### Using Postman

1. Open Postman
2. Create a new request collection
3. Import routes and test endpoints
4. Cookies are automatically managed by Postman

---

## 📦 npm Scripts

```bash
npm run dev    # Start development server with nodemon (auto reload)
npm start      # Start production server
npm run lint   # Run ESLint
```

---

## 🔍 Troubleshooting

### Port Already in Use

```bash
# Change PORT in .env to a different value (e.g., 5001)
# Or kill the process using the port
```

### MongoDB Connection Failed

```bash
# Ensure MongoDB is running
# Check MONGODB_URI in .env
# Verify connection string format
```

### CORS Errors

```bash
# Ensure CLIENT_URL in .env matches your frontend URL
# Example: http://localhost:5173 for Vite
```

### Token Errors

```bash
# Clear browser cookies
# Login again to get fresh tokens
# Check that ACCESS_TOKEN_SECRET and REFRESH_TOKEN_SECRET are set
```

---

## 📚 Additional Resources

- [Express.js Docs](https://expressjs.com/)
- [MongoDB Docs](https://docs.mongodb.com/)
- [Mongoose Docs](https://mongoosejs.com/)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8949)
- [OWASP Security Guidelines](https://owasp.org/)

---

## 📄 License

MIT License - Feel free to use this boilerplate for your projects!

---

## 🤝 Contributing

This is a boilerplate template. Feel free to customize and extend it for your specific needs!

---

**Last Updated:** April 2026
**Version:** 1.0.0
