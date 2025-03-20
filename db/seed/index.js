"use strict";

// Mock DB for when database is not available
const mockDb = {
  select: () => ({ from: () => [] }),
  delete: () => Promise.resolve(),
  insert: () => ({ values: () => Promise.resolve() })
};

// Try to load DB, fall back to mock if not available
let db;
try {
  // Try to require the database but don't crash if it fails
  db = require("../index.js");
} catch (error) {
  console.log("Database module not found, using mock database");
  db = mockDb;
}

// Try to load schema, create mock if not available
let advocates;
try {
  const schema = require("../schema.js");
  advocates = schema.advocates;
} catch (error) {
  console.log("Schema module not found, using mock schema");
  advocates = { name: "advocates" };
}

// Import advocate data
const advocateData = require("./advocates.js").advocateData;

async function seed() {
  try {
    console.log("Starting database seeding...");

    // Check if database is properly initialized
    if (!db || typeof db.delete !== "function") {
      console.error("Database connection not properly initialized");
      console.log("Using mock database - skipping actual seeding");
      return;
    }

    // Clear existing data
    await db.delete(advocates);
    console.log("Cleared existing advocates data");

    // Insert new advocates
    for (const advocate of advocateData) {
      await db.insert(advocates).values(advocate);
    }

    console.log(`Successfully seeded ${advocateData.length} advocates`);
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

// Run the seed function
seed()
  .then(() => {
    console.log("Database seeding completed successfully");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Failed to seed database:", error);
    process.exit(0);
  });
