import {
  MapPin,
  Users,
  Globe,
  Banknote,
  MessageSquare,
  Ruler,
  Navigation,
  Loader2,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useGetCountryDetailQuery, type Country } from '@/api/endpoints/countries';
import type { CountryDetailModalProps } from './country-detail-modal.type';

export const CountryDetailModal = ({
  country,
  isOpen,
  onClose,
}: CountryDetailModalProps) => {
  // Fetch detailed country data when modal opens and we have a country
  const {
    data: countryDetail,
    error: detailError,
    isLoading: detailLoading,
  } = useGetCountryDetailQuery(country?.cca2 || '', {
    skip: !country || !isOpen,
  });

  if (!country) return null;

  // Use detailed data when available, otherwise use basic data
  const displayCountry = countryDetail || country;

  const formatPopulation = (population: number): string => {
    return new Intl.NumberFormat().format(population);
  };

  const formatArea = (area: number): string => {
    return new Intl.NumberFormat().format(area);
  };

  const getCurrencies = () => {
    if (!('currencies' in displayCountry) || !displayCountry.currencies) return [];
    return Object.entries(displayCountry.currencies).map(([code, currency]) => ({
      code,
      ...currency,
    }));
  };

  const getLanguages = () => {
    if (!('languages' in displayCountry) || !displayCountry.languages) return [];
    return Object.entries(displayCountry.languages).map(([code, name]) => ({
      code,
      name,
    }));
  };

  const getBorderCountries = () => {
    if (!('borders' in displayCountry)) return [];
    return displayCountry.borders || [];
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            {displayCountry.flags?.png && (
              <img
                src={displayCountry.flags.png}
                alt={displayCountry.flags.alt || `Flag of ${displayCountry.name.common}`}
                className="w-8 h-6 object-cover rounded border"
              />
            )}
            <div>
              <span className="text-xl">{displayCountry.name.common}</span>
              {displayCountry.name.official !== displayCountry.name.common && (
                <div className="text-sm text-muted-foreground font-normal">
                  {displayCountry.name.official}
                </div>
              )}
            </div>
            {detailLoading && (
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Flag Display */}
          <div className="space-y-4">
            {displayCountry.flags?.png && (
              <div className="relative">
                <img
                  src={displayCountry.flags.png}
                  alt={displayCountry.flags.alt || `Flag of ${displayCountry.name.common}`}
                  className="w-full h-48 object-cover rounded-lg border shadow-sm"
                />
              </div>
            )}

            {/* Basic Information */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Basic Information</h3>

              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <div>
                    <span className="text-sm text-gray-600">Capital:</span>
                    <span className="ml-2 font-medium">
                      {displayCountry.capital?.[0] || 'N/A'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Users className="h-4 w-4 text-gray-400" />
                  <div>
                    <span className="text-sm text-gray-600">Population:</span>
                    <span className="ml-2 font-medium">
                      {formatPopulation(displayCountry.population)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Globe className="h-4 w-4 text-gray-400" />
                  <div>
                    <span className="text-sm text-gray-600">Region:</span>
                    <span className="ml-2 font-medium">{displayCountry.region}</span>
                    {displayCountry.subregion && (
                      <>
                        <span className="text-gray-400 mx-1">•</span>
                        <span className="text-gray-700">{displayCountry.subregion}</span>
                      </>
                    )}
                  </div>
                </div>

                {'area' in displayCountry && displayCountry.area && (
                  <div className="flex items-center gap-3">
                    <Ruler className="h-4 w-4 text-gray-400" />
                    <div>
                      <span className="text-sm text-gray-600">Area:</span>
                      <span className="ml-2 font-medium">
                        {formatArea(displayCountry.area)} km²
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <Navigation className="h-4 w-4 text-gray-400" />
                  <div>
                    <span className="text-sm text-gray-600">Coordinates:</span>
                    <span className="ml-2 font-medium font-mono text-xs">
                      {displayCountry.latlng[0]?.toFixed(4)}, {displayCountry.latlng[1]?.toFixed(4)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Information */}
          <div className="space-y-4">
            {/* Country Codes */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Country Codes</h3>
              <div className="flex gap-2">
                <Badge variant="secondary" className="font-mono">
                  {displayCountry.cca2}
                </Badge>
                <Badge variant="secondary" className="font-mono">
                  {displayCountry.cca3}
                </Badge>
                {'cioc' in displayCountry && displayCountry.cioc && (
                  <Badge variant="secondary" className="font-mono">
                    {displayCountry.cioc}
                  </Badge>
                )}
              </div>
            </div>

            {/* Currencies */}
            {getCurrencies().length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Banknote className="h-4 w-4" />
                  Currencies
                </h3>
                <div className="space-y-2">
                  {getCurrencies().map((currency) => (
                    <div key={currency.code} className="flex items-center justify-between">
                      <span className="font-medium">{currency.name}</span>
                      <Badge variant="outline" className="font-mono">
                        {currency.symbol} {currency.code}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Languages */}
            {getLanguages().length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Languages
                </h3>
                <div className="flex flex-wrap gap-2">
                  {getLanguages().map((language) => (
                    <Badge key={language.code} variant="outline">
                      {language.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Border Countries */}
            {getBorderCountries().length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Border Countries</h3>
                <div className="flex flex-wrap gap-2">
                  {getBorderCountries().map((borderCode) => (
                    <Badge key={borderCode} variant="outline" className="font-mono">
                      {borderCode}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Info */}
            {'area' in displayCountry && displayCountry.area && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-sm text-gray-700 mb-2">Quick Facts</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-gray-500">Population Density:</span>
                    <div className="font-medium">
                      {Math.round(displayCountry.population / displayCountry.area)} people/km²
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500">Size Rank:</span>
                    <div className="font-medium">
                      {displayCountry.area > 1000000 ? 'Very Large' :
                       displayCountry.area > 100000 ? 'Large' :
                       displayCountry.area > 10000 ? 'Medium' : 'Small'}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};