import {
  MapPin,
  Users,
  Globe,
  Banknote,
  MessageSquare,
  Ruler,
  Navigation,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import type { CountryDetailModalProps } from './country-detail-modal.type';

export const CountryDetailModal = ({
  country,
  isOpen,
  onClose,
}: CountryDetailModalProps) => {
  if (!country) return null;

  const formatPopulation = (population: number): string => {
    return new Intl.NumberFormat().format(population);
  };

  const formatArea = (area: number): string => {
    return new Intl.NumberFormat().format(area);
  };

  const getCurrencies = () => {
    if (!country.currencies) return [];
    return Object.entries(country.currencies).map(([code, currency]) => ({
      code,
      ...currency,
    }));
  };

  const getLanguages = () => {
    if (!country.languages) return [];
    return Object.entries(country.languages).map(([code, name]) => ({
      code,
      name,
    }));
  };

  const getBorderCountries = () => {
    return country.borders || [];
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <img
              src={country.flags.png}
              alt={country.flags.alt || `Flag of ${country.name.common}`}
              className="w-8 h-6 object-cover rounded border"
            />
            <div>
              <span className="text-xl">{country.name.common}</span>
              {country.name.official !== country.name.common && (
                <div className="text-sm text-muted-foreground font-normal">
                  {country.name.official}
                </div>
              )}
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Flag Display */}
          <div className="space-y-4">
            <div className="relative">
              <img
                src={country.flags.png}
                alt={country.flags.alt || `Flag of ${country.name.common}`}
                className="w-full h-48 object-cover rounded-lg border shadow-sm"
              />
            </div>

            {/* Basic Information */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Basic Information</h3>

              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <div>
                    <span className="text-sm text-gray-600">Capital:</span>
                    <span className="ml-2 font-medium">
                      {country.capital?.[0] || 'N/A'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Users className="h-4 w-4 text-gray-400" />
                  <div>
                    <span className="text-sm text-gray-600">Population:</span>
                    <span className="ml-2 font-medium">
                      {formatPopulation(country.population)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Globe className="h-4 w-4 text-gray-400" />
                  <div>
                    <span className="text-sm text-gray-600">Region:</span>
                    <span className="ml-2 font-medium">{country.region}</span>
                    {country.subregion && (
                      <>
                        <span className="text-gray-400 mx-1">•</span>
                        <span className="text-gray-700">{country.subregion}</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Ruler className="h-4 w-4 text-gray-400" />
                  <div>
                    <span className="text-sm text-gray-600">Area:</span>
                    <span className="ml-2 font-medium">
                      {formatArea(country.area)} km²
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Navigation className="h-4 w-4 text-gray-400" />
                  <div>
                    <span className="text-sm text-gray-600">Coordinates:</span>
                    <span className="ml-2 font-medium font-mono text-xs">
                      {country.latlng[0]?.toFixed(4)}, {country.latlng[1]?.toFixed(4)}
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
                  {country.cca2}
                </Badge>
                <Badge variant="secondary" className="font-mono">
                  {country.cca3}
                </Badge>
                {country.cioc && (
                  <Badge variant="secondary" className="font-mono">
                    {country.cioc}
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
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-sm text-gray-700 mb-2">Quick Facts</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-gray-500">Population Density:</span>
                  <div className="font-medium">
                    {Math.round(country.population / country.area)} people/km²
                  </div>
                </div>
                <div>
                  <span className="text-gray-500">Size Rank:</span>
                  <div className="font-medium">
                    {country.area > 1000000 ? 'Very Large' :
                     country.area > 100000 ? 'Large' :
                     country.area > 10000 ? 'Medium' : 'Small'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};