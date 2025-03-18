const db = require("..");
const { advocates } = require("../schema");
const { advocateData } = require("./advocates");

async function seed() {
  try {
    console.log("Starting database seeding...");

    // Check if database is properly initialized
    if (!db || typeof db.delete !== "function") {
      console.error("Database connection not properly initialized");
      process.exit(1);
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
    process.exit(1);
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
    process.exit(1);
  });
