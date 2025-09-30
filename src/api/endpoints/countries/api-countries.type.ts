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

export type CountriesApiResponse = Country[];
