## Solace Candidate Assignment

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Install dependencies

```bash
npm i
```

Run the development server:

```bash
npm run dev
```

## Features

### Music Features

The application includes an integrated music experience to enhance user wellness:

- **Personalized Playlists**: Customized music recommendations based on user preferences and health needs
- **Meditation Tracks**: Curated audio content designed for stress reduction and mindfulness
- **Ambient Soundscapes**: Background audio environments to promote focus and relaxation
- **Sleep Assistance**: Specialized audio programs designed to improve sleep quality
- **Music Therapy Integration**: Connects music selections with health advocate recommendations

### AI-Powered Patient Advocacy Chat

The application includes an intelligent chat interface that helps users find relevant healthcare advocates based on their specific needs:

- **Vector Search**: Uses OpenAI's embedding model to semantically match patient needs with advocate specialties
- **Intelligent Query Routing**: Determines if user queries are health-related before performing advocate searches
- **Dynamic Responses**: Provides conversational responses for general queries and advocate recommendations for health-related questions
- **Fallback Mechanisms**: Gracefully handles database connectivity issues by falling back to mock data

### OpenAI Integration

The application uses OpenAI for several key features:

- Text embeddings for semantic search (text-embedding-3-small model)
- Query classification to determine if health-related (gpt-3.5-turbo)
- Conversational responses when vector search isn't needed

## Database set up

The app is configured to return a default list of advocates. This will allow you to get the app up and running without needing to configure a database. If you'd like to configure a database, you're encouraged to do so. You can uncomment the url in `.env` and the line in `src/app/api/advocates/route.ts` to test retrieving advocates from the database.

1. Feel free to use whatever configuration of postgres you like. The project is set up to use docker-compose.yml to set up postgres. The url is in .env.

```bash
docker compose up -d
```

2. Create a `solaceassignment` database.

3. Push migration to the database

```bash
npx drizzle-kit push
```

4. Seed the database

```bash
npm run seed
```

## Database Configuration Changes

The following modifications were made to enable database functionality:

- Changed PostgreSQL port to 5433 to avoid conflicts with local installations
- Added dotenv support for environment variable loading
- Updated API routes to use database queries instead of static data
- Added vector search capability with OpenAI embeddings

For details, see [DATABASE_SETUP.md](./DATABASE_SETUP.md) and [DISCUSSION.md](./DISCUSSION.md).

# solace-candidate-assignment
