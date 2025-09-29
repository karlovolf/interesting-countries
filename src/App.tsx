import { useState, useMemo } from 'react';
import { useGetAllCountriesQuery } from '@/api/endpoints/countries';
import { SearchInput, SearchFilters, FilterBadges, type SearchFiltersState } from '@/components/search';
import {
  applyAllFilters,
  getSearchResultsCount,
} from '@/lib/country-filters';

const App = (): React.ReactElement => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<SearchFiltersState>({
    region: 'All',
    subregion: 'All',
    population: 'All',
  });

  const {
    data: countries,
    error,
    isLoading,
  } = useGetAllCountriesQuery(undefined);

  // Filter countries based on search term and filters
  const filteredCountries = useMemo(() => {
    if (!countries) return [];
    return applyAllFilters(countries, searchTerm, filters);
  }, [countries, searchTerm, filters]);

  const resultsText = useMemo(() => {
    if (!countries) return '';
    return getSearchResultsCount(
      countries.length,
      filteredCountries.length,
      searchTerm
    );
  }, [countries, filteredCountries.length, searchTerm]);

  const handleFilterRemove = (filterKey: keyof SearchFiltersState): void => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterKey]: 'All',
    }));
  };

  const clearAllFilters = (): void => {
    setFilters({
      region: 'All',
      subregion: 'All',
      population: 'All',
    });
  };

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-lg'>Loading countries...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-lg text-red-600'>
          Error loading countries:{' '}
          {'status' in error ? error.status : 'Unknown error'}
        </div>
      </div>
    );
  }

  return (
    <div className='container mx-auto p-4'>
      <header className='mb-8'>
        <h1 className='text-3xl font-bold mb-6'>World Countries Explorer</h1>

        <div className='space-y-6'>
          <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
            <div className='flex items-center gap-3 flex-1'>
              <div className='flex-1 max-w-md'>
                <SearchInput
                  value={searchTerm}
                  onChange={setSearchTerm}
                  placeholder='Search countries, capitals, or regions...'
                />
              </div>
              {countries && (
                <SearchFilters
                  countries={countries}
                  filters={filters}
                  onFiltersChange={setFilters}
                />
              )}
            </div>

            <div className='text-sm text-muted-foreground'>{resultsText}</div>
          </div>

          <FilterBadges
            filters={filters}
            onFilterRemove={handleFilterRemove}
            onClearAll={clearAllFilters}
          />
        </div>
      </header>

      {filteredCountries.length === 0 && searchTerm ? (
        <div className='flex flex-col items-center justify-center py-12'>
          <div className='text-xl text-muted-foreground mb-2'>
            No countries found
          </div>
          <div className='text-sm text-muted-foreground'>
            Try searching for a different country, capital, or region
          </div>
        </div>
      ) : (
        <>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6'>
            {filteredCountries.slice(0, 20).map(country => (
              <div
                key={country.name.common}
                className='border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow'
              >
                <div className='flex items-center gap-3 mb-2'>
                  <img
                    src={country.flags.png}
                    alt={country.flags.alt || `Flag of ${country.name.common}`}
                    className='w-8 h-6 object-cover rounded'
                  />
                  <h3 className='font-semibold text-lg'>
                    {country.name.common}
                  </h3>
                </div>

                <div className='space-y-1 text-sm text-gray-600'>
                  <p>
                    <span className='font-medium'>Capital:</span>{' '}
                    {country.capital?.[0] || 'N/A'}
                  </p>
                  <p>
                    <span className='font-medium'>Population:</span>{' '}
                    {country.population.toLocaleString()}
                  </p>
                  <p>
                    <span className='font-medium'>Region:</span>{' '}
                    {country.region}
                  </p>
                  {country.subregion && (
                    <p>
                      <span className='font-medium'>Subregion:</span>{' '}
                      {country.subregion}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredCountries.length > 20 && (
            <div className='text-center py-4'>
              <p className='text-muted-foreground'>
                Showing first 20 of {filteredCountries.length} results
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default App;
