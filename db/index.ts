// Use CommonJS syntax
require("dotenv/config");
const { drizzle } = require("drizzle-orm/postgres-js");
const postgres = require("postgres");
const schema = require("./schema");

// Define a mock DB type for when DB is not available
const createMockDb = () => ({
  select: () => ({
    from: () => [],
  }),
});

const setup = () => {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not set");
    return createMockDb();
  }

  try {
    // For query purposes
    const queryClient = postgres(process.env.DATABASE_URL);
    const db = drizzle(queryClient, { schema });
    return db;
  } catch (error) {
    console.error("Error connecting to database:", error);
    return createMockDb();
  }
};

module.exports = setup();
