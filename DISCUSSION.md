# Implementation Decisions

## Database Setup

### Key Changes and Rationale

1. **Port Change (5432 → 5433)** in docker-compose.yml and .env
   _Why:_ Avoid conflicts with existing local PostgreSQL installation

2. **Added dotenv support** in db files
   _Why:_ Proper loading of environment variables for database connectivity

3. **Activated database connection** in API routes
   _Why:_ Switch from hardcoded data to actual database queries

4. **Implemented migration files**
   _Why:_ Track schema changes and ensure consistent database structure

### Setup Process Summary

```bash
docker compose up -d             # Start PostgreSQL container
npx drizzle-kit push             # Push schema migrations
npm run seed                     # Seed with sample data
curl localhost:3000/api/advocates # Verify data retrieval
```

## Vector Search Implementation

### Architecture Decisions

1. **OpenAI Embedding Model Integration**
   _Why:_ Leverages advanced semantic understanding for more accurate advocate matching compared to keyword-based search

2. **In-Memory Vector Storage**
   _Why:_ Provides a balance of performance and simplicity for this proof-of-concept, could be extended to use a dedicated vector database

3. **Fallback to Mock Data**
   _Why:_ Ensures system resilience when database connectivity issues occur

4. **Intelligent Query Classification**
   _Why:_ Optimizes API usage by only performing vector searches when queries are health-related

### Technical Implementation

The vector search feature is implemented across several components:

1. **Vector Search Utility (`lib/vector-search.ts`)**

   - Generates embeddings using OpenAI's text-embedding-3-small model
   - Performs cosine similarity calculations between query and advocate embeddings
   - Handles DB connectivity with graceful fallbacks

2. **Chat API (`app/api/chat/route.ts`)**

   - Uses OpenAI to determine if queries are health-related
   - Routes to vector search or conversational responses appropriately
   - Returns formatted HTML responses for immediate display

3. **Error Handling**
   - Graceful degradation when OpenAI API calls fail
   - Fallback to mock data when database is unavailable
   - User-friendly error messages

## Enhancements for Future Development

1. **Dedicated Vector Database**

   - Implement a proper vector database (like Pinecone or pgvector) for better scaling
   - Store pre-computed embeddings to reduce API calls
   - Add hybrid search capabilities (combining vector and keyword search)

2. **Enhanced User Experience**

   - Add typing indicators during searches
   - Implement chat history persistence
   - Allow users to refine advocate matches
   - Improve mobile responsiveness of advocate cards
   - Add pagination for browsing multiple advocate results

3. **Performance Optimizations**

   - Batch embedding generation for advocates
   - Caching frequent queries and responses
   - Implement pagination for large result sets
   - Use server-side streaming for faster initial responses

4. **Security Enhancements**

   - Rate limiting for API endpoints
   - Input sanitization and validation
   - Enhanced authentication for advocate contact information
   - Implement proper HTTP-only cookie auth for API requests

5. **Natural Language Processing Improvements**

   - Fine-tune embedding models on healthcare-specific data
   - Implement entity extraction for specific medical conditions
   - Add multi-language support for international users
   - Develop domain-specific prompts for better advocate matching

6. **Analytics and Feedback**

   - Implement analytics to track successful advocate matches
   - Add feedback mechanism for users after contacting advocates
   - Create dashboard for monitoring system performance
   - Build A/B testing framework for response format experiments

7. **Data Management**

   - Create admin interface for managing advocates
   - Implement automated data quality checks
   - Develop data refresh mechanism for updated advocate information
   - Add advanced filtering options based on insurance acceptance, availability, etc.

8. **Integration Capabilities**
   - Connect with telehealth platforms for direct appointments
   - Integrate with electronic health record systems
   - Add calendar booking capabilities with advocates
   - Enable secure document sharing between patients and advocates
