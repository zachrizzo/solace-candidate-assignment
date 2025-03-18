import { Advocate } from "@/features/advocates/types/advocate.types";
import {
  DatabaseAdvocate,
  InsertDatabaseAdvocate,
} from "@/features/advocates/types/database.types";

/**
 * Mapper class for converting between database and client models
 */
export class AdvocateMapper {
  /**
   * Converts database advocate entity to client-side Advocate model
   */
  static toClientModel(dbAdvocate: DatabaseAdvocate): Advocate {
    return {
      id: dbAdvocate.id,
      firstName: dbAdvocate.firstName,
      lastName: dbAdvocate.lastName,
      city: dbAdvocate.city,
      degree: dbAdvocate.degree,
      specialties: dbAdvocate.specialties as string[],
      yearsOfExperience: dbAdvocate.yearsOfExperience,
      phoneNumber: String(dbAdvocate.phoneNumber), // Convert bigint to string
      createdAt: dbAdvocate.createdAt
        ? new Date(dbAdvocate.createdAt).toISOString()
        : undefined,
    };
  }

  /**
   * Converts client-side Advocate model to database entity format
   * Useful for insert/update operations
   */
  static toDatabaseEntity(
    advocate: Advocate
  ): Omit<InsertDatabaseAdvocate, "id" | "createdAt"> {
    return {
      firstName: advocate.firstName,
      lastName: advocate.lastName,
      city: advocate.city,
      degree: advocate.degree,
      specialties: advocate.specialties,
      yearsOfExperience: advocate.yearsOfExperience,
      // Use Number for database format
      phoneNumber: Number(advocate.phoneNumber),
    };
  }
}
