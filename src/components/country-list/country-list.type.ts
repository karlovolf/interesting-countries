import type { Country } from '@/api/endpoints/countries';

export interface CountryListProps {
  countries: Country[];
  searchTerm?: string;
  onCountryClick?: (country: Country) => void;
  maxItems?: number;
  className?: string;
}