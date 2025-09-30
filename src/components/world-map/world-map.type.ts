import type { Country } from '@/api/endpoints/countries';

export interface WorldMapProps {
  countries: Country[];
  filteredCountries: Country[];
  onCountryClick?: (country: Country) => void;
  className?: string;
}

export interface CountryFeature {
  type: 'Feature';
  properties: {
    NAME: string;
    ISO_A2: string;
    ISO_A3: string;
  };
  geometry: {
    type: 'Polygon' | 'MultiPolygon';
    coordinates: number[][][] | number[][][][];
  };
}

export interface MapGeometry {
  type: 'FeatureCollection';
  features: CountryFeature[];
}