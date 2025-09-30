// REST Countries API Response Types
export interface CountryName {
  common: string;
  official: string;
}

export interface CountryFlags {
  png: string;
  svg: string;
  alt?: string;
}

export interface CountryCurrency {
  name: string;
  symbol: string;
}

export interface CountryLanguages {
  [languageCode: string]: string;
}

export interface CountryCurrencies {
  [currencyCode: string]: CountryCurrency;
}

// Main Country interface matching REST Countries API response
export interface Country {
  name: CountryName;
  capital?: string[];
  population: number;
  region: string;
  subregion?: string;
  flags: CountryFlags;
  currencies?: CountryCurrencies;
  languages?: CountryLanguages;
  borders?: string[];
  area: number;
  latlng: number[]; // latitude and longitude coordinates
  cca2: string; // ISO 3166-1 alpha-2 country code
  cca3: string; // ISO 3166-1 alpha-3 country code
  cioc?: string; // International Olympic Committee country code
}

// API Response type
export type CountriesApiResponse = Country[];

// Filter and Search Types
export type Region = 'Africa' | 'Americas' | 'Asia' | 'Europe' | 'Oceania' | 'All';

export type SortOption = 'name' | 'population' | 'area';

export interface CountryFilters {
  search: string;
  region: Region;
  sortBy: SortOption;
  sortOrder: 'asc' | 'desc';
}

// Error types
export interface ApiError {
  message: string;
  status?: number;
}

// Loading states
export interface CountriesState {
  data: Country[];
  loading: boolean;
  error: ApiError | null;
  filters: CountryFilters;
}