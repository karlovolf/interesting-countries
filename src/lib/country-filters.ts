import type { Country } from '@/api/endpoints/countries';
import { POPULATION_RANGES, type SearchFiltersState } from '@/components/search';

export const filterCountriesBySearch = (
  countries: Country[],
  searchTerm: string
): Country[] => {
  if (!searchTerm.trim()) return countries;

  const lowercaseSearch = searchTerm.toLowerCase();

  return countries.filter(country => {
    // Search in country name (common and official)
    const matchesName =
      country.name.common.toLowerCase().includes(lowercaseSearch) ||
      country.name.official.toLowerCase().includes(lowercaseSearch);

    // Search in capital cities
    const matchesCapital = country.capital?.some(capital =>
      capital.toLowerCase().includes(lowercaseSearch)
    );

    // Search in region and subregion
    const matchesRegion =
      country.region.toLowerCase().includes(lowercaseSearch) ||
      country.subregion?.toLowerCase().includes(lowercaseSearch);

    return matchesName || matchesCapital || matchesRegion;
  });
};

export const highlightSearchTerm = (text: string, searchTerm: string): string => {
  if (!searchTerm.trim()) return text;

  const regex = new RegExp(`(${searchTerm})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
};

export const getSearchResultsCount = (
  totalCount: number,
  filteredCount: number,
  searchTerm: string
): string => {
  if (!searchTerm.trim()) {
    return `Showing ${totalCount} countries`;
  }

  if (filteredCount === 0) {
    return 'No countries found';
  }

  return `Found ${filteredCount} of ${totalCount} countries`;
};

export const filterCountriesByFilters = (
  countries: Country[],
  filters: SearchFiltersState
): Country[] => {
  return countries.filter(country => {
    // Region filter
    if (filters.region !== 'All' && country.region !== filters.region) {
      return false;
    }

    // Subregion filter
    if (
      filters.subregion !== 'All' &&
      country.subregion !== filters.subregion
    ) {
      return false;
    }

    // Population filter
    if (filters.population !== 'All') {
      const populationRange = POPULATION_RANGES.find(
        range => range.label === filters.population
      );
      if (populationRange) {
        const population = country.population;
        if (population < populationRange.min || population > populationRange.max) {
          return false;
        }
      }
    }

    return true;
  });
};

export const applyAllFilters = (
  countries: Country[],
  searchTerm: string,
  filters: SearchFiltersState
): Country[] => {
  // First apply filters
  let filteredCountries = filterCountriesByFilters(countries, filters);

  // Then apply search
  filteredCountries = filterCountriesBySearch(filteredCountries, searchTerm);

  return filteredCountries;
};