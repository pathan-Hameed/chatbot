import mongoose from "mongoose";
import Product from "./models/Product.js";
import Project from "./models/Project.js";
import dotenv from "dotenv";

dotenv.config();

const seedDatabase = async () => {
  try {
    const mongodbUri =
      process.env.MONGODB_URI || "mongodb://localhost:27017/rgf";
    await mongoose.connect(mongodbUri, { serverSelectionTimeoutMS: 5000 });

    const products = [
      {
        slug: "red-sandalwood-powder",
        name: "Red Sandalwood Powder",
        price: 2499,
        description:
          "Finely processed natural material derived from Red Sandalwood, suitable for traditional and Ayurvedic applications.",
        weight: "100g",
        origin: "Andhra Pradesh, India",
        badge: "Best Seller",
        imageUrl: "/product-powder.jpg",
      },
      {
        slug: "red-sandalwood-oil",
        name: "Red Sandalwood Oil",
        price: 4999,
        description:
          "Concentrated oil extracted for permitted uses. Pure, uncut, and sourced from compliant cultivation.",
        weight: "30ml",
        origin: "Andhra Pradesh, India",
        badge: "Premium",
        imageUrl: "/product-oil.jpg",
      },
      {
        slug: "red-sandalwood-wood",
        name: "Red Sandalwood Wood Piece",
        price: 7999,
        description:
          "Natural raw wood segment for collection and approved traditional purposes. Each piece is unique.",
        weight: "200g",
        origin: "Andhra Pradesh, India",
        badge: "Rare",
        imageUrl: "/product-wood.jpg",
      },
    ];

    const projects = [
      {
        slug: "srikakulam-greens",
        name: "Srikakulam Greens",
        location: "Srikakulam District, Andhra Pradesh",
        size: "200 – 500 sq. yards",
        status: "open",
        tag: "Featured",
        imageUrl: "/project-farm.jpg",
        description:
          "A structured farmland project with Red Sandalwood plantation integration.",
        overview:
          "Srikakulam Greens is a structured farmland development located in the agricultural belt of Srikakulam District, Andhra Pradesh.",
        connectivity:
          "Located near the NH-16 corridor with access to Srikakulam town within 20 km.",
        pricing:
          "Pricing is available on request and varies by plot size and location.",
      },
      {
        slug: "vizag-valley",
        name: "Vizag Valley Estate",
        location: "Visakhapatnam Outskirts, AP",
        size: "300 – 600 sq. yards",
        status: "limited",
        tag: "Limited Availability",
        imageUrl: "/hero-forest.jpg",
        description:
          "Premium plots near developing infrastructure zones with full plantation planning.",
        overview:
          "Vizag Valley Estate is a premium structured farmland project on the outskirts of Visakhapatnam.",
        connectivity:
          "Located 30 km from Visakhapatnam city on a developing growth corridor.",
        pricing:
          "Pricing is disclosed after initial discussion and site visit.",
      },
      {
        slug: "kadapa-farmlands",
        name: "Kadapa Farmlands",
        location: "Kadapa District, AP",
        size: "250 – 800 sq. yards",
        status: "coming-soon",
        tag: "Pre-Launch",
        imageUrl: "/project-farm.jpg",
        description:
          "An upcoming structured project in one of Andhra Pradesh's most fertile agricultural belts.",
        overview:
          "Kadapa Farmlands is an upcoming structured farmland project with pre-launch registration.",
        connectivity:
          "Located in Kadapa District with road connectivity and proximity to developing industrial zones.",
        pricing:
          "Pre-launch pricing available to registered interest holders only.",
      },
    ];

    await Product.insertMany(products, { ordered: false });
    console.log("Products seeded successfully (or already present)");

    await Project.insertMany(projects, { ordered: false });
    console.log("Projects seeded successfully (or already present)");
  } catch (error) {
    if (error.code === 11000) {
      console.warn("Duplicate key warning. Data may already exist.");
    } else {
      console.error("Seed error:", error);
    }
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
};

seedDatabase();
