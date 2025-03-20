# Shared Resources

This directory contains shared resources, utilities, and components that are used across multiple features in the application.

## Directory Structure

```
shared/
├── components/         # Reusable UI components
├── types/              # Common type definitions
└── utils/              # Shared utility functions
```

## Components

The `components` directory contains reusable UI components that are not specific to any feature. These components should be:

- Highly reusable
- Well-typed with TypeScript
- Well-documented with JSDoc comments
- Free of business logic

## Types

The `types` directory contains common type definitions used across the application. This includes:

- Common API response types
- Error types
- Base component prop types
- Utility types

Key files:

- `index.ts`: Contains core shared types

## Utils

The `utils` directory contains utility functions used across the application. These functions should be:

- Pure functions (no side effects)
- Well-typed with TypeScript
- Well-documented with JSDoc comments
- Well-tested

Key utility functions:

- `formatPhoneNumber`: Formats phone numbers in a standard format
- `cn`: Utility for combining Tailwind CSS classes
- `withErrorHandling`: Higher-order function for standardized error handling

## Usage Examples

### Using Shared Utilities

```typescript
import { formatPhoneNumber, withErrorHandling } from "@/shared/utils";

// Format a phone number
const formattedNumber = formatPhoneNumber("1234567890"); // (123) 456-7890

// Use error handling wrapper
const fetchDataSafely = withErrorHandling(async () => {
  const response = await fetch("/api/data");
  return response.json();
});

const [data, error] = await fetchDataSafely();
```

### Using Shared Types

```typescript
import { AppError, ApiResponse, BaseComponentProps } from "@/shared/types";

// Create a custom error
const error = new AppError("Resource not found", "NOT_FOUND", 404);

// Define a component with common props
interface MyComponentProps extends BaseComponentProps {
  title: string;
}

// Type an API response
const response: ApiResponse<User[]> = {
  data: users,
  error: null,
  success: true,
};
```

## Development Guidelines

When adding to the shared resources:

1. Ensure the utility/component/type is truly reusable and not feature-specific
2. Add comprehensive JSDoc comments and TypeScript types
3. Follow naming conventions consistent with the rest of the codebase
4. For utilities, prefer pure functions when possible
5. Keep components as simple as possible, avoiding business logic
