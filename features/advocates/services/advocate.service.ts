import db from "@/db";
import { advocates } from "@/db/schema";
import { Advocate } from "@/features/advocates/types/advocate.types";
import { AdvocateMapper } from "@/features/advocates/mappers/advocate.mapper";

/**
 * Service for handling advocate-related data operations
 */
export class AdvocateService {
  /**
   * Get all advocates
   */
  static async getAllAdvocates(): Promise<Advocate[]> {
    try {
      const rawData = await db.select().from(advocates);
      return rawData.map(AdvocateMapper.toClientModel);
    } catch (error) {
      console.error("Error in getAllAdvocates:", error);
      throw new Error("Failed to fetch advocates");
    }
  }

  /**
   * Get a single advocate by ID
   *
   * Note: In a production app, you would use proper query builders
   * that respect the database schema types
   */
  static async getAdvocateById(id: number): Promise<Advocate | null> {
    try {
      const results = await db.select().from(advocates);
      const advocate = results.find((a) => a.id === id);

      if (!advocate) {
        return null;
      }

      return AdvocateMapper.toClientModel(advocate);
    } catch (error) {
      console.error(`Error in getAdvocateById(${id}):`, error);
      throw new Error(`Failed to fetch advocate with ID ${id}`);
    }
  }

  /**
   * Create a new advocate
   *
   * Note: In a production app, you would use proper query builders
   * that respect the database schema types
   */
  static async createAdvocate(
    advocate: Omit<Advocate, "id" | "createdAt">
  ): Promise<Advocate> {
    try {
      // In a real application, this would use the database's query builder
      // with proper type-safety. For now, we'll use the mapper for the types
      // but simulate the creation

      // Get the database format
      const dbEntity = AdvocateMapper.toDatabaseEntity(advocate as Advocate);

      // This is where an actual database insert would happen
      // For this example, we'll simulate by creating an object with the right shape
      const mockResult = {
        id: Math.floor(Math.random() * 1000), // Simulated ID
        firstName: dbEntity.firstName,
        lastName: dbEntity.lastName,
        city: dbEntity.city,
        degree: dbEntity.degree,
        specialties: dbEntity.specialties || [],
        yearsOfExperience: dbEntity.yearsOfExperience,
        phoneNumber: dbEntity.phoneNumber,
        createdAt: new Date(),
      };

      return AdvocateMapper.toClientModel(mockResult);
    } catch (error) {
      console.error("Error in createAdvocate:", error);
      throw new Error("Failed to create advocate");
    }
  }
}
