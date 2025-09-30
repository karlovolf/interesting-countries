import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { CountriesApiResponse } from './api-countries.type';

const BASE_URL = 'https://restcountries.com/v3.1';

export const countriesApi = createApi({
  reducerPath: 'countriesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ['Countries'],
  endpoints: builder => ({
    getAllCountries: builder.query<CountriesApiResponse, undefined>({
      query: () => `independent?status=true`,
      providesTags: ['Countries'],
    }),
  }),
});

export const { useGetAllCountriesQuery } = countriesApi;
