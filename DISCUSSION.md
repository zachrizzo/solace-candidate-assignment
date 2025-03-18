# Database Setup Decisions

## Key Changes and Rationale

1. **Port Change (5432 → 5433)** in docker-compose.yml and .env
   _Why:_ Avoid conflicts with existing local PostgreSQL installation

2. **Added dotenv support** in db files
   _Why:_ Proper loading of environment variables for database connectivity

3. **Activated database connection** in API routes
   _Why:_ Switch from hardcoded data to actual database queries

4. **Implemented migration files**
   _Why:_ Track schema changes and ensure consistent database structure

## Setup Process Summary

```bash
docker compose up -d             # Start PostgreSQL container
npx drizzle-kit push             # Push schema migrations
curl -X POST localhost:3002/api/seed  # Seed with sample data
curl localhost:3002/api/advocates     # Verify data retrieval
```

## Enhancements I Would Make Given More Time
