import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// Define a mock DB type for when DB is not available
const createMockDb = () => ({
  select: () => ({
    from: () => [],
  }),
  insert: () => ({
    values: () => ({
      returning: () => [],
    }),
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

export default setup();
