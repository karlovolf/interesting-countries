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
import { Spinner } from '@/components/ui/spinner';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

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
      <div className='flex flex-col items-center justify-center min-h-screen space-y-6 bg-gray-50'>
        <div className='flex flex-col items-center space-y-4 bg-white p-8 rounded-lg shadow-sm'>
          <Spinner size='lg' className='text-blue-600' />
          <div className='text-xl font-medium text-gray-900'>Loading countries...</div>
          <div className='text-sm text-gray-600'>Please wait while we fetch country data</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen space-y-6 max-w-md mx-auto text-center'>
        <div className='text-6xl'>🌍</div>
        <div className='space-y-2'>
          <h2 className='text-xl font-semibold text-gray-900'>Oops! Something went wrong</h2>
          <p className='text-gray-600'>
            We're having trouble loading the countries data. Please check your internet connection and try again.
          </p>
        </div>
        <Button
          onClick={() => window.location.reload()}
          className='flex items-center gap-2'
        >
          <RefreshCw className='h-4 w-4' />
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className='container mx-auto p-4'>
      <header className='mb-8'>
        <h1 className='text-3xl font-bold mb-6'>World Countries Explorer</h1>

        <div className='space-y-6'>
          <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
            <div className='flex flex-col md:flex-row md:items-center gap-3 flex-1'>
              <div className='flex-1 max-w-md'>
                <SearchInput
                  value={searchTerm}
                  onChange={setSearchTerm}
                  placeholder='Search countries, capitals, or regions...'
                />
              </div>
              <div className='flex md:justify-start'>
                {countries && (
                  <SearchFilters
                    countries={countries}
                    filters={filters}
                    onFiltersChange={setFilters}
                  />
                )}
              </div>
            </div>

            <div className='text-sm text-muted-foreground mt-2 md:mt-0'>{resultsText}</div>
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
