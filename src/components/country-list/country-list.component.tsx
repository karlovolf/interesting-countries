import { CountryCard } from '@/components/country-card';
import type { CountryListProps } from './country-list.type';

export const CountryList = ({
  countries,
  searchTerm = '',
  onCountryClick,
  maxItems = 20,
  className = '',
}: CountryListProps) => {
  const displayedCountries = countries.slice(0, maxItems);
  const hasMoreCountries = countries.length > maxItems;

  if (countries.length === 0) {
    return (
      <div
        className={`flex flex-col items-center justify-center py-12 ${className}`}
      >
        <div className='text-xl text-muted-foreground mb-2'>
          No countries found
        </div>
        <div className='text-sm text-muted-foreground'>
          Try searching for a different country, capital, or region
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
        {displayedCountries.map(country => (
          <CountryCard
            key={country.cca3}
            country={country}
            searchTerm={searchTerm}
            onClick={onCountryClick}
          />
        ))}
      </div>

      {hasMoreCountries && (
        <div className='text-center py-3'>
          <div className='bg-gray-50 border border-gray-200 rounded-md px-3 py-2 inline-block'>
            <p className='text-gray-700 text-sm'>
              Showing first {maxItems} of {countries.length} results
            </p>
            <p className='text-gray-500 text-xs mt-1'>
              Use search or filters to refine
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
