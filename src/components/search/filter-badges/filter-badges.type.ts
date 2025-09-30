import type { SearchFiltersState } from '../search-filters';

export interface FilterBadgesProps {
  filters: SearchFiltersState;
  onFilterRemove: (filterKey: keyof SearchFiltersState) => void;
  onClearAll: () => void;
}

export interface FilterBadge {
  key: keyof SearchFiltersState;
  label: string;
  value: string;
}
