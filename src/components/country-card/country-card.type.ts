import type { CountryBasic } from '@/api/endpoints/countries';

export interface CountryCardProps {
  country: CountryBasic;
  searchTerm?: string;
  onClick?: (country: CountryBasic) => void;
  className?: string;
}