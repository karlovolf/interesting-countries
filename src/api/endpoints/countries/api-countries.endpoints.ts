import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  CountriesBasicResponse,
  CountriesApiResponse,
  CountryDetailResponse,
  Region
} from './api-countries.type';

const BASE_URL = 'https://restcountries.com/v3.1';

// Basic fields for list/map view
const BASIC_FIELDS = 'name,capital,population,region,subregion,flags,cca2,cca3,latlng';

// All fields for detailed view
const ALL_FIELDS = 'name,capital,population,region,subregion,flags,currencies,languages,borders,area,latlng,cca2,cca3,cioc';

export const countriesApi = createApi({
  reducerPath: 'countriesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ['Countries'],
  endpoints: builder => ({
    // Basic country data for list/map view
    getAllCountriesBasic: builder.query<CountriesBasicResponse, undefined>({
      query: () => `independent?status=true`,
      providesTags: ['Countries'],
    }),

    // Full country details for individual country view
    getCountryDetail: builder.query<CountryDetailResponse, string>({
      query: countryCode => `alpha/${countryCode}`,
      providesTags: ['Countries'],
    }),

    // Keep existing endpoints for compatibility
    getAllCountries: builder.query<CountriesApiResponse, undefined>({
      query: () => `independent?status=true`,
      providesTags: ['Countries'],
    }),
    getCountriesByRegion: builder.query<
      CountriesApiResponse,
      Exclude<Region, 'All'>
    >({
      query: region => `region/${region.toLowerCase()}`,
      providesTags: ['Countries'],
    }),
    getCountryByName: builder.query<CountriesApiResponse, string>({
      query: name => `name/${encodeURIComponent(name)}`,
      providesTags: ['Countries'],
    }),
    getCountriesByBorderCodes: builder.query<CountriesApiResponse, string[]>({
      query: codes => {
        const codesParam = codes.join(',');
        return `alpha?codes=${codesParam}`;
      },
      providesTags: ['Countries'],
    }),
  }),
});

export const {
  useGetAllCountriesBasicQuery,
  useGetCountryDetailQuery,
  useGetAllCountriesQuery,
  useGetCountriesByRegionQuery,
  useGetCountryByNameQuery,
  useGetCountriesByBorderCodesQuery,
} = countriesApi;
