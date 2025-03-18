import "dotenv/config";
import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// Define a mock DB type for when DB is not available
interface MockDB {
  select: () => { from: () => [] };
  delete?: never;
  insert?: never;
}

const setup = (): PostgresJsDatabase<typeof schema> | MockDB => {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not set");
    return {
      select: () => ({
        from: () => [],
      }),
    };
  }

  // For query purposes
  const queryClient = postgres(process.env.DATABASE_URL);
  const db = drizzle(queryClient, { schema });
  return db;
};

export default setup();
