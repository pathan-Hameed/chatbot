import app from "./src/app.js";
import { connectDB } from "./src/config/db.js";
import { env } from "./src/config/env.js";

// Start server
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Start Express server
    const PORT = env.PORT;
    app.listen(PORT, () => {
      console.log(`
✅ Server running successfully!
🌐 Environment: ${env.NODE_ENV}
🔗 URL: http://localhost:${PORT}
📊 API Base: http://localhost:${PORT}/api
🗄️ Database: ${env.MONGODB_URI}
      `);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();

// Handle uncaught errors
process.on("unhandledRejection", (reason, promise) => {
  console.error("❌ Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});

process.on("uncaughtException", (error) => {
  console.error("❌ Uncaught Exception:", error);
  process.exit(1);
});
