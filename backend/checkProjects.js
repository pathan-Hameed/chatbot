import mongoose from "mongoose";
import Project from "./models/Project.js";

(async () => {
  try {
    const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/rgf";
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    });

    const count = await Project.countDocuments();
    console.log("count", count);
    const docs = await Project.find().lean().limit(1);
    console.log("one", docs[0]);

    await mongoose.disconnect();
  } catch (err) {
    console.error(err);
  }
})();
