import type { Country } from '@/api/endpoints/countries';

export interface PopulationRange {
  min: number;
  max: number;
  label: string;
}

export interface SearchFiltersState {
  region: string;
  subregion: string;
  population: string;
}

export interface SearchFiltersProps {
  countries: Country[];
  filters: SearchFiltersState;
  onFiltersChange: (filters: SearchFiltersState) => void;
}

export const POPULATION_RANGES: PopulationRange[] = [
  { min: 0, max: 1000000, label: 'Under 1M' },
  { min: 1000000, max: 10000000, label: '1M - 10M' },
  { min: 10000000, max: 100000000, label: '10M - 100M' },
  { min: 100000000, max: Infinity, label: 'Over 100M' },
];

export const REGIONS = [
  'All',
  'Africa',
  'Americas',
  'Asia',
  'Europe',
  'Oceania',
] as const;
