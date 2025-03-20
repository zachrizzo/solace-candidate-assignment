# Solace Advocates Directory

A Next.js application that helps users find healthcare advocates based on their needs.

## Project Structure

```
solace-candidate-assignment/
├── app/                # Next.js app directory (routes, layouts)
├── components/         # Legacy components directory (being migrated)
├── config/             # Application configuration
├── db/                 # Database configuration and schema
├── features/           # Feature-based modules
│   ├── advocates/      # Advocates feature
│   └── chat/           # Chat feature
├── lib/                # Legacy library code (being migrated)
├── public/             # Static assets
└── shared/             # Shared utilities and components
    ├── components/     # Shared UI components
    ├── types/          # Shared type definitions
    └── utils/          # Shared utility functions
```

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn
- Docker (optional, for local database)

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/your-org/solace-candidate-assignment.git
   cd solace-candidate-assignment
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Set up environment variables

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your configuration values.

4. Start the development server
   ```bash
   npm run dev
   ```

### Using Docker

To run the application with a Docker-based database:

```bash
./start-with-docker.sh
```

## Development

### Code Organization

- **Feature-based Structure**: Code is organized by features (advocates, chat, etc.)
- **Shared Resources**: Common utilities, types, and components are in the `shared` directory
- **Type Safety**: TypeScript is used throughout the application

### Key Features

1. **Advocates Directory**

   - Browse healthcare advocates
   - Search and filter by specialties
   - View advocate details

2. **Chat Interface**
   - AI-powered chat to help users find advocates
   - Natural language understanding of healthcare needs
   - Suggest relevant advocates based on user queries

## Testing

```bash
# Run unit tests
npm test

# Run end-to-end tests
npm run test:e2e
```

## Code Style

This project uses ESLint and Prettier for code formatting.

```bash
# Check code style
npm run lint

# Fix code style issues
npm run lint:fix
```

## Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## Directory Structure Guidelines

### Features

Features should:

- Be self-contained
- Include their own components, services, and types
- Follow consistent patterns within each feature

### Shared Code

Code in the `shared` directory should:

- Be truly reusable across multiple features
- Be well-documented with JSDoc comments
- Follow consistent naming patterns

## Contributing

1. Create a feature branch
2. Make your changes
3. Ensure tests pass
4. Submit a pull request with a clear description of changes

## License

This project is licensed under the MIT License - see the LICENSE file for details.
