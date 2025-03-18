export interface Advocate {
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: string;
  phoneNumber: string;
}

export interface AdvocateCardProps {
  advocate: Advocate;
}

export interface AdvocateGridProps {
  advocates: Advocate[];
  isLoading: boolean;
  error: Error | null;
}

export interface AdvocateListProps {
  advocates: Advocate[];
  isLoading: boolean;
  error: Error | null;
}

export interface AdvocateSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  specialties: string[];
  selectedSpecialty: string | null;
  onSpecialtyChange: (value: string | null) => void;
  cities: string[];
  selectedCity: string | null;
  onCityChange: (value: string | null) => void;
}

export type SortField = "name" | "experience" | "city";
export type SortDirection = "asc" | "desc";
export type ViewMode = "grid" | "list";

export interface ViewToggleProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

export interface UseAdvocatesResult {
  advocates: Advocate[];
  isLoading: boolean;
  error: Error | null;
}
