import { useState, useMemo } from 'react';
import {
  useGetAllCountriesQuery,
  type Country,
} from '@/api/endpoints/countries';
import {
  SearchInput,
  SearchFilters,
  FilterBadges,
  type SearchFiltersState,
} from '@/components/search';
import { WorldMap } from '@/components/world-map';
import { CountryList } from '@/components/country-list';
import { CountryDetailModal } from '@/components/country-detail-modal';
import { applyAllFilters, getSearchResultsCount } from '@/lib/country-filters';

const App = (): React.ReactElement => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<SearchFiltersState>({
    region: 'All',
    subregion: 'All',
    population: 'All',
  });
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: countries,
    error,
    isLoading,
  } = useGetAllCountriesQuery(undefined);

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

  const handleCountryClick = (country: Country): void => {
    setSelectedCountry(country);
    setIsModalOpen(true);
  };

  const handleModalClose = (): void => {
    setIsModalOpen(false);
    setSelectedCountry(null);
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

      {countries && (
        <WorldMap
          countries={countries}
          filteredCountries={filteredCountries}
          onCountryClick={handleCountryClick}
          className='mb-8'
        />
      )}

      <CountryList
        countries={filteredCountries}
        searchTerm={searchTerm}
        onCountryClick={handleCountryClick}
        maxItems={20}
      />

      <CountryDetailModal
        country={selectedCountry}
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />
    </div>
  );
};

export default App;
