import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { CountriesApiResponse, Region } from './api-countries.type';

const BASE_URL = 'https://restcountries.com/v3.1';

const FIELDS =
  'name,capital,population,region,subregion,flags,currencies,languages,borders,area';

export const countriesApi = createApi({
  reducerPath: 'countriesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ['Countries'],
  endpoints: builder => ({
    getAllCountries: builder.query<CountriesApiResponse, undefined>({
      query: () => `all?fields=${FIELDS}`,
      providesTags: ['Countries'],
    }),
    getCountriesByRegion: builder.query<
      CountriesApiResponse,
      Exclude<Region, 'All'>
    >({
      query: region => `region/${region.toLowerCase()}?fields=${FIELDS}`,
      providesTags: ['Countries'],
    }),
    getCountryByName: builder.query<CountriesApiResponse, string>({
      query: name => `name/${encodeURIComponent(name)}?fields=${FIELDS}`,
      providesTags: ['Countries'],
    }),
    getCountriesByBorderCodes: builder.query<CountriesApiResponse, string[]>({
      query: codes => {
        const codesParam = codes.join(',');
        return `alpha?codes=${codesParam}&fields=${FIELDS}`;
      },
      providesTags: ['Countries'],
    }),
  }),
});

export const {
  useGetAllCountriesQuery,
  useGetCountriesByRegionQuery,
  useGetCountryByNameQuery,
  useGetCountriesByBorderCodesQuery,
} = countriesApi;
