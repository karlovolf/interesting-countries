import type { Country } from '@/api/endpoints/countries';

export interface CountryCardProps {
  country: Country;
  searchTerm?: string;
  onClick?: (country: Country) => void;
  className?: string;
}