# Advocates Feature

This directory contains all code related to the advocates feature in the Solace application.

## Purpose

The advocates feature allows users to:

- View a directory of healthcare advocates
- Search and filter advocates by various criteria
- Sort and view advocates in different formats
- Connect with advocates that match their needs

## Directory Structure

```
advocates/
├── components/         # Feature-specific UI components
├── mappers/            # Data transformation between DB and client formats
├── services/           # Business logic and data access
├── types/              # Type definitions for the feature
└── advocateHooks/      # React hooks for the feature
```

## Key Files

- `types/advocate.types.ts`: Contains all type definitions for advocates
- `services/advocate.service.ts`: Service for fetching and manipulating advocate data
- `mappers/advocate.mapper.ts`: Maps between database and client data models

## Usage

### Fetching Advocates

```typescript
import { advocateService } from "@/features/advocates/services/advocate.service";

// Using with error handling wrapper
const [advocates, error] = await advocateService.getAllAdvocates();
if (error) {
  // Handle error
} else {
  // Use advocates data
}

// Using the service directly
try {
  const advocates = await AdvocateService.getAllAdvocates();
  // Use advocates data
} catch (error) {
  // Handle error
}
```

### Searching Advocates

```typescript
import { advocateService } from "@/features/advocates/services/advocate.service";

const [results, error] = await advocateService.searchAdvocates({
  searchTerm: "cancer",
  specialty: "Oncology",
  city: "New York",
  sortField: "experience",
  sortDirection: "desc",
});
```

## Components

The feature includes the following key components:

- `AdvocateDirectory`: Main container component for the advocates feature
- `AdvocateList`: Displays advocates in a list view
- `AdvocateGrid`: Displays advocates in a grid view
- `AdvocateCard`: Card component for a single advocate
- `AdvocateSearch`: Search and filtering controls

## Development

### Adding a New Field to Advocates

1. Update the database schema in `db/schema.ts`
2. Add the field to the `Advocate` interface in `types/advocate.types.ts`
3. Update the mapper functions in `mappers/advocate.mapper.ts`
4. Update components to display the new field

### Creating New Components

When creating new components related to advocates, place them in the `components/` directory and ensure they follow the existing patterns:

- Use TypeScript interfaces for props
- Extend from BaseComponentProps for common props
- Implement proper error handling
- Use the advocateService for data access
