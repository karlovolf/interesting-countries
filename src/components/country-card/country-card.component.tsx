import { MapPin, Users, Globe } from 'lucide-react';
import { highlightSearchTerm } from '@/lib/country-filters';
import type { CountryCardProps } from './country-card.type';

export const CountryCard = ({
  country,
  searchTerm = '',
  onClick,
  className = '',
}: CountryCardProps) => {
  const formatPopulation = (population: number): string => {
    if (population >= 1000000) {
      return `${(population / 1000000).toFixed(1)}M`;
    } else if (population >= 1000) {
      return `${(population / 1000).toFixed(0)}K`;
    }
    return population.toString();
  };

  const formatArea = (area: number): string => {
    return new Intl.NumberFormat().format(area);
  };

  const getCurrencyString = (): string => {
    if (!('currencies' in country) || !country.currencies) return 'N/A';
    const currencies = Object.values(country.currencies);
    return currencies.map(currency => `${currency.name} (${currency.symbol})`).join(', ');
  };

  const getLanguageString = (): string => {
    if (!('languages' in country) || !country.languages) return 'N/A';
    return Object.values(country.languages).join(', ');
  };

  const handleClick = () => {
    if (onClick) {
      onClick(country);
    }
  };

  return (
    <div
      className={`
        bg-white rounded-lg border shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer
        hover:border-blue-200 group ${className}
      `}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
        }
      }}
    >
      {/* Flag and Country Name Header */}
      <div className="p-4 border-b bg-gradient-to-r from-slate-50 to-white rounded-t-lg">
        <div className="flex items-center gap-3 mb-2">
          {country.flags?.png && (
            <img
              src={country.flags.png}
              alt={country.flags.alt || `Flag of ${country.name.common}`}
              className="w-10 h-7 object-cover rounded shadow-sm border"
            />
          )}
          <div className="flex-1 min-w-0">
            <h3
              className="font-semibold text-lg text-gray-900 truncate group-hover:text-blue-600 transition-colors"
              dangerouslySetInnerHTML={{
                __html: highlightSearchTerm(country.name.common, searchTerm)
              }}
            />
            {country.name.official !== country.name.common && (
              <p className="text-sm text-gray-500 truncate">
                {country.name.official}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Country Details */}
      <div className="p-4 space-y-3">
        {/* Location Info */}
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <span className="text-gray-600">Capital:</span>{' '}
            <span
              className="font-medium text-gray-900"
              dangerouslySetInnerHTML={{
                __html: highlightSearchTerm(country.capital?.[0] || 'N/A', searchTerm)
              }}
            />
          </div>
        </div>

        {/* Population */}
        <div className="flex items-center gap-2 text-sm">
          <Users className="h-4 w-4 text-gray-400 flex-shrink-0" />
          <div className="flex-1">
            <span className="text-gray-600">Population:</span>{' '}
            <span className="font-medium text-gray-900">
              {country.population.toLocaleString()} ({formatPopulation(country.population)})
            </span>
          </div>
        </div>

        {/* Region & Subregion */}
        <div className="flex items-center gap-2 text-sm">
          <Globe className="h-4 w-4 text-gray-400 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <span className="text-gray-600">Region:</span>{' '}
            <span
              className="font-medium text-gray-900"
              dangerouslySetInnerHTML={{
                __html: highlightSearchTerm(country.region, searchTerm)
              }}
            />
            {country.subregion && (
              <>
                <span className="text-gray-400 mx-1">•</span>
                <span
                  className="text-gray-700"
                  dangerouslySetInnerHTML={{
                    __html: highlightSearchTerm(country.subregion, searchTerm)
                  }}
                />
              </>
            )}
          </div>
        </div>

        {/* Additional Info */}
        <div className="pt-2 border-t space-y-2">
          {'area' in country && country.area && (
            <div className="text-xs text-gray-600">
              <span className="font-medium">Area:</span> {formatArea(country.area)} km²
            </div>
          )}

          {'currencies' in country && country.currencies && (
            <div className="text-xs text-gray-600">
              <span className="font-medium">Currency:</span> {getCurrencyString()}
            </div>
          )}

          {'languages' in country && country.languages && (
            <div className="text-xs text-gray-600">
              <span className="font-medium">Languages:</span> {getLanguageString()}
            </div>
          )}
        </div>

        {/* Country Codes */}
        <div className="flex justify-between items-center pt-2 border-t">
          <div className="flex gap-2 text-xs">
            <span className="bg-gray-100 px-2 py-1 rounded font-mono">{country.cca2}</span>
            <span className="bg-gray-100 px-2 py-1 rounded font-mono">{country.cca3}</span>
          </div>
          <div className="text-xs text-gray-400">
            Click for details
          </div>
        </div>
      </div>
    </div>
  );
};