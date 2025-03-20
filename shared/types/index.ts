/**
 * Common types used across the application
 */

/**
 * Base response for all API responses
 */
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  success: boolean;
}

/**
 * Generic error type for application errors
 */
export class AppError extends Error {
  constructor(
    message: string,
    public code?: string,
    public status?: number,
    public details?: Record<string, any>
  ) {
    super(message);
    this.name = "AppError";
  }
}

/**
 * Common UI component props
 */
export interface BaseComponentProps {
  className?: string;
  id?: string;
}

/**
 * Function that does nothing and returns void
 */
export type NoopFunction = () => void;

/**
 * Common view mode for components that have different display modes
 */
export type ViewMode = "grid" | "list";

/**
 * Common sort direction
 */
export type SortDirection = "asc" | "desc";

/**
 * Pagination parameters
 */
export interface PaginationParams {
  page: number;
  limit: number;
  total?: number;
}
