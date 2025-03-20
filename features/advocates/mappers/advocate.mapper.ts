import {
  Advocate,
  DatabaseAdvocate,
  InsertDatabaseAdvocate,
} from "@/features/advocates/types/advocate.types";

/**
 * Mapper class for converting between database and client models
 */
export class AdvocateMapper {
  /**
   * Converts database advocate entity to client-side Advocate model
   * @param dbAdvocate - Database advocate entity
   * @returns Client-side advocate model
   */
  static toClientModel(dbAdvocate: DatabaseAdvocate): Advocate {
    try {
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
    } catch (error) {
      console.error("Error mapping database advocate to client model:", error);
      throw new Error(`Failed to map advocate with ID ${dbAdvocate.id}`);
    }
  }

  /**
   * Converts client-side Advocate model to database entity format
   * Useful for insert/update operations
   * @param advocate - Client-side advocate model
   * @returns Database advocate entity format
   */
  static toDatabaseEntity(
    advocate: Advocate
  ): Omit<InsertDatabaseAdvocate, "id" | "createdAt"> {
    try {
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
    } catch (error) {
      console.error("Error mapping client advocate to database entity:", error);
      throw new Error(`Failed to map advocate for database insertion`);
    }
  }
}
