import { advocates } from "@/db/schema";

/**
 * Type representing an advocate as stored in the database
 */
export type DatabaseAdvocate = typeof advocates.$inferSelect;

/**
 * Type for inserting a new advocate into the database
 */
export type InsertDatabaseAdvocate = typeof advocates.$inferInsert;
