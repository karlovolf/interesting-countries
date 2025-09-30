import type { Country } from '@/api/endpoints/countries';

export interface WorldMapProps {
  countries: Country[];
  filteredCountries: Country[];
  onCountryClick?: (country: Country) => void;
  className?: string;
}
