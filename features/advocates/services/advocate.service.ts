import { advocates } from "@/db/schema";
import {
  Advocate,
  DatabaseAdvocate,
  SearchAdvocatesParams,
  SortField,
} from "@/features/advocates/types/advocate.types";
import { AdvocateMapper } from "@/features/advocates/mappers/advocate.mapper";
import { eq, like, desc, asc } from "drizzle-orm";
import { AppError } from "@/shared/types";
import { withErrorHandling } from "@/shared/utils";

/**
 * Service for handling advocate-related data operations
 */
export class AdvocateService {
  /**
   * Get all advocates
   * @returns Promise resolving to array of advocates
   * @throws AppError if the operation fails
   */
  static async getAllAdvocates(): Promise<Advocate[]> {
    try {
      // Using a mock for demonstration purposes
      // In a real app, this would use the database client
      const rawData = []; // Replace with actual DB query
      return rawData.map(AdvocateMapper.toClientModel);
    } catch (error) {
      console.error("Error in getAllAdvocates:", error);
      throw new AppError("Failed to fetch advocates", "FETCH_ERROR", 500);
    }
  }

  /**
   * Search advocates with filters and sorting
   * @param params - Search parameters
   * @returns Promise resolving to filtered and sorted advocates
   * @throws AppError if the operation fails
   */
  static async searchAdvocates(
    params: SearchAdvocatesParams
  ): Promise<Advocate[]> {
    try {
      // Using a mock for demonstration purposes
      // In a real app, this would use the database client
      const mockResults: DatabaseAdvocate[] = [];

      // Apply specialty filter in memory (simplified example)
      if (params.specialty) {
        return mockResults
          .filter((adv: DatabaseAdvocate) =>
            adv.specialties.includes(params.specialty as string)
          )
          .map(AdvocateMapper.toClientModel);
      }

      return mockResults.map(AdvocateMapper.toClientModel);
    } catch (error) {
      console.error("Error in searchAdvocates:", error);
      throw new AppError("Failed to search advocates", "SEARCH_ERROR", 500);
    }
  }

  /**
   * Get a single advocate by ID
   * @param id - Advocate ID
   * @returns Promise resolving to advocate or null if not found
   * @throws AppError if the operation fails
   */
  static async getAdvocateById(id: number): Promise<Advocate | null> {
    try {
      // Using a mock for demonstration purposes
      // In a real app, this would query the database
      const mockResults: DatabaseAdvocate[] = [];
      const advocate = mockResults.find((a) => a.id === id);

      if (!advocate) {
        return null;
      }

      return AdvocateMapper.toClientModel(advocate);
    } catch (error) {
      console.error(`Error in getAdvocateById(${id}):`, error);
      throw new AppError(
        `Failed to fetch advocate with ID ${id}`,
        "FETCH_ERROR",
        500
      );
    }
  }

  /**
   * Create a new advocate
   * @param advocate - Advocate data without ID and createdAt
   * @returns Promise resolving to created advocate
   * @throws AppError if the operation fails
   */
  static async createAdvocate(
    advocate: Omit<Advocate, "id" | "createdAt">
  ): Promise<Advocate> {
    try {
      // Get the database format
      const dbEntity = AdvocateMapper.toDatabaseEntity(advocate as Advocate);

      // In a real application, perform a database insert
      // For this example, we're simulating the insert
      const mockResult: DatabaseAdvocate = {
        id: Math.floor(Math.random() * 1000),
        firstName: dbEntity.firstName,
        lastName: dbEntity.lastName,
        city: dbEntity.city,
        degree: dbEntity.degree,
        specialties: dbEntity.specialties as string[],
        yearsOfExperience: dbEntity.yearsOfExperience,
        phoneNumber: dbEntity.phoneNumber,
        createdAt: new Date(),
      };

      return AdvocateMapper.toClientModel(mockResult);
    } catch (error) {
      console.error("Error in createAdvocate:", error);
      throw new AppError("Failed to create advocate", "CREATE_ERROR", 500);
    }
  }
}

// Export a version of the service methods with error handling for use in components
export const advocateService = {
  getAllAdvocates: withErrorHandling(AdvocateService.getAllAdvocates),
  getAdvocateById: withErrorHandling(AdvocateService.getAdvocateById),
  createAdvocate: withErrorHandling(AdvocateService.createAdvocate),
  searchAdvocates: withErrorHandling(AdvocateService.searchAdvocates),
};
