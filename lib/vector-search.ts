import OpenAI from "openai";
import { Advocate } from "@/features/advocates/types/advocate.types";
import db from "@/db";
import { advocates } from "@/db/schema";
import { mockAdvocates } from "@/data/mock-advocates";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// In-memory vector storage for demo purposes
// In a production app, this would be stored in a vector database like Pinecone
let advocateEmbeddings: { advocate: Advocate; embedding: number[] }[] = [];

/**
 * Generate embeddings for a text string using OpenAI's embedding model
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  try {
    const response = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: text,
    });

    return response.data[0].embedding;
  } catch (error) {
    console.error("Error generating embedding:", error);
    throw error;
  }
}

/**
 * Fetch advocates from the database with fallback to mock data
 */
async function fetchAdvocates(): Promise<Advocate[]> {
  try {
    // First try to get advocates from the database
    const dbAdvocates = await db.select().from(advocates);

    // If we have data from the database, use it
    if (dbAdvocates && dbAdvocates.length > 0) {
      console.log(`Found ${dbAdvocates.length} advocates in database`);

      return dbAdvocates.map((advocate) => ({
        id: advocate.id,
        firstName: advocate.firstName,
        lastName: advocate.lastName,
        city: advocate.city,
        degree: advocate.degree,
        specialties: advocate.specialties as string[],
        yearsOfExperience: advocate.yearsOfExperience,
        phoneNumber: advocate.phoneNumber.toString(),
        createdAt: advocate.createdAt?.toISOString(),
      }));
    }

    // If no data in database or error, fall back to mock data
    console.log("No advocates found in database, using mock data instead");
    return mockAdvocates;
  } catch (error) {
    console.error(
      "Error fetching advocates from database, using mock data instead:",
      error
    );
    return mockAdvocates;
  }
}

/**
 * Initialize the vector database with embeddings for all advocates
 */
export async function initVectorDB() {
  // Don't reinitialize if already done
  if (advocateEmbeddings.length > 0) return;

  try {
    // Fetch advocates (from DB or mock data as fallback)
    const allAdvocates = await fetchAdvocates();

    // Process each advocate and generate embeddings
    for (const advocate of allAdvocates) {
      // Create a rich text representation of the advocate for embedding
      const advocateText = `
        ${advocate.firstName} ${advocate.lastName} is a professional with ${
        advocate.yearsOfExperience
      } years of experience.
        They are located in ${advocate.city}.
        They specialize in ${advocate.specialties.join(", ")}.
        They have a ${advocate.degree}.
      `;

      // Generate embedding for this advocate
      const embedding = await generateEmbedding(advocateText);

      // Store advocate with its embedding
      advocateEmbeddings.push({
        advocate,
        embedding,
      });
    }

    console.log(
      `Vector database initialized with ${advocateEmbeddings.length} advocates`
    );
  } catch (error) {
    console.error("Failed to initialize vector database:", error);
    throw error;
  }
}

/**
 * Calculate cosine similarity between two vectors
 */
function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) {
    throw new Error("Vectors must be of same length");
  }

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

/**
 * Search for advocates based on semantic similarity to query
 */
export async function vectorSearch(
  query: string,
  limit: number = 3
): Promise<Advocate[]> {
  // Initialize vector DB if not done already
  if (advocateEmbeddings.length === 0) {
    await initVectorDB();
  }

  // If we still have no embeddings, something went wrong with initVectorDB
  if (advocateEmbeddings.length === 0) {
    console.error("No advocate embeddings available for search");
    return [];
  }

  try {
    // Generate embedding for the query
    const queryEmbedding = await generateEmbedding(query);

    // Calculate similarity scores
    const results = advocateEmbeddings.map((item) => ({
      advocate: item.advocate,
      similarity: cosineSimilarity(queryEmbedding, item.embedding),
    }));

    // Sort by similarity (highest first) and return top results
    return results
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, limit)
      .map((result) => result.advocate);
  } catch (error) {
    console.error("Vector search failed:", error);
    throw error;
  }
}
