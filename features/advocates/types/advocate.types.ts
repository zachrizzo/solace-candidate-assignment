import { advocates } from "@/db/schema";
import { BaseComponentProps, SortDirection, ViewMode } from "@/shared/types";

/**
 * Database type for an advocate as stored in the database
 */
export type DatabaseAdvocate = typeof advocates.$inferSelect;

/**
 * Database type for inserting a new advocate
 */
export type InsertDatabaseAdvocate = typeof advocates.$inferInsert;

/**
 * Client-side model for an advocate
 */
export interface Advocate {
  id?: number;
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: string;
  createdAt?: string;
}

/**
 * Sort field options for advocates
 */
export type SortField = "name" | "experience" | "city";

/**
 * Props for the advocate card component
 */
export interface AdvocateCardProps extends BaseComponentProps {
  advocate: Advocate;
}

/**
 * Props for the advocate grid component
 */
export interface AdvocateGridProps extends BaseComponentProps {
  advocates: Advocate[];
  isLoading: boolean;
  error: Error | null;
}

/**
 * Props for the advocate list component
 */
export interface AdvocateListProps extends BaseComponentProps {
  advocates: Advocate[];
  isLoading: boolean;
  error: Error | null;
}

/**
 * Props for the advocate search component
 */
export interface AdvocateSearchProps extends BaseComponentProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  specialties: string[];
  selectedSpecialty: string | null;
  onSpecialtyChange: (value: string | null) => void;
  cities: string[];
  selectedCity: string | null;
  onCityChange: (value: string | null) => void;
}

/**
 * Props for the view toggle component
 */
export interface ViewToggleProps extends BaseComponentProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

/**
 * Return type for the useAdvocates hook
 */
export interface UseAdvocatesResult {
  advocates: Advocate[];
  isLoading: boolean;
  error: Error | null;
}

/**
 * Params for the searchAdvocates function
 */
export interface SearchAdvocatesParams {
  searchTerm?: string;
  specialty?: string;
  city?: string;
  sortField?: SortField;
  sortDirection?: SortDirection;
}
