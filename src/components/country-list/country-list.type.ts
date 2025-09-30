import type { CountryBasic } from '@/api/endpoints/countries';

export interface CountryListProps {
  countries: CountryBasic[];
  searchTerm?: string;
  onCountryClick?: (country: CountryBasic) => void;
  maxItems?: number;
  className?: string;
}