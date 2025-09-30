import { MapPin, Users, Globe, Banknote, MessageSquare } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
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
      <DialogContent className='max-w-4xl max-h-[90vh] overflow-y-auto'>
        <VisuallyHidden>
          <DialogTitle>Country Details for {country.name.common}</DialogTitle>
        </VisuallyHidden>
        <div className='bg-gradient-to-r from-slate-50 to-white p-6 border-b rounded-t-lg'>
          <div className='flex items-center gap-4'>
            <img
              src={country.flags.png}
              alt={country.flags.alt || `Flag of ${country.name.common}`}
              className='w-16 h-12 object-cover rounded shadow-md border'
            />
            <div>
              <h2 className='text-2xl font-bold text-gray-900'>
                {country.name.common}
              </h2>
              {country.name.official !== country.name.common && (
                <p className='text-sm text-gray-600 mt-1'>
                  {country.name.official}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className='p-6 space-y-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='bg-white rounded-lg border p-4 shadow-sm'>
              <div className='flex items-center gap-2 mb-3'>
                <MapPin className='h-4 w-4 text-blue-500' />
                <h3 className='font-medium text-sm text-gray-900'>Location</h3>
              </div>
              <div className='space-y-2 text-sm'>
                <div>
                  <span className='text-gray-600'>Capital:</span>
                  <span className='ml-2 font-medium text-gray-900'>
                    {country.capital?.[0] || 'N/A'}
                  </span>
                </div>
                <div>
                  <span className='text-gray-600'>Region:</span>
                  <span className='ml-2 font-medium text-gray-900'>
                    {country.region}
                  </span>
                  {country.subregion && (
                    <>
                      <span className='text-gray-400 mx-1'>•</span>
                      <span className='text-gray-700'>{country.subregion}</span>
                    </>
                  )}
                </div>
                <div>
                  <span className='text-gray-600'>Coordinates:</span>
                  <span className='ml-2 font-medium font-mono text-xs text-gray-900'>
                    {country.latlng[0]?.toFixed(2)}°,{' '}
                    {country.latlng[1]?.toFixed(2)}°
                  </span>
                </div>
              </div>
            </div>

            <div className='bg-white rounded-lg border p-4 shadow-sm'>
              <div className='flex items-center gap-2 mb-3'>
                <Users className='h-4 w-4 text-green-500' />
                <h3 className='font-medium text-sm text-gray-900'>
                  Demographics
                </h3>
              </div>
              <div className='space-y-2 text-sm'>
                <div>
                  <span className='text-gray-600'>Population:</span>
                  <span className='ml-2 font-medium text-gray-900'>
                    {formatPopulation(country.population)}
                  </span>
                </div>
                {country.area && (
                  <>
                    <div>
                      <span className='text-gray-600'>Area:</span>
                      <span className='ml-2 font-medium text-gray-900'>
                        {formatArea(country.area)} km²
                      </span>
                    </div>
                    <div>
                      <span className='text-gray-600'>Density:</span>
                      <span className='ml-2 font-medium text-gray-900'>
                        {Math.round(country.population / country.area)}{' '}
                        people/km²
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div className='bg-white rounded-lg border p-4 shadow-sm'>
              <div className='flex items-center gap-2 mb-3'>
                <Globe className='h-4 w-4 text-purple-500' />
                <h3 className='font-medium text-sm text-gray-900'>Codes</h3>
              </div>
              <div className='flex gap-2'>
                <span className='bg-gray-100 px-2 py-1 rounded text-xs font-mono'>
                  {country.cca2}
                </span>
                <span className='bg-gray-100 px-2 py-1 rounded text-xs font-mono'>
                  {country.cca3}
                </span>
                {country.cioc && (
                  <span className='bg-gray-100 px-2 py-1 rounded text-xs font-mono'>
                    {country.cioc}
                  </span>
                )}
              </div>
            </div>

            {getCurrencies().length > 0 && (
              <div className='bg-white rounded-lg border p-4 shadow-sm'>
                <div className='flex items-center gap-2 mb-3'>
                  <Banknote className='h-4 w-4 text-yellow-500' />
                  <h3 className='font-medium text-sm text-gray-900'>
                    Currency
                  </h3>
                </div>
                <div className='space-y-2 text-sm'>
                  {getCurrencies().map(currency => (
                    <div key={currency.code}>
                      <div className='font-medium text-gray-900'>
                        {currency.name}
                      </div>
                      <div className='text-xs text-gray-600 font-mono'>
                        {currency.symbol} {currency.code}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {getLanguages().length > 0 && (
              <div className='bg-white rounded-lg border p-4 shadow-sm'>
                <div className='flex items-center gap-2 mb-3'>
                  <MessageSquare className='h-4 w-4 text-red-500' />
                  <h3 className='font-medium text-sm text-gray-900'>
                    Languages
                  </h3>
                </div>
                <div className='text-sm'>
                  {getLanguages().map((language, index) => (
                    <span key={language.code}>
                      {language.name}
                      {index < getLanguages().length - 1 && ', '}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {getBorderCountries().length > 0 && (
            <div className='bg-white rounded-lg border p-4 shadow-sm'>
              <h3 className='font-medium text-sm text-gray-900 mb-3'>
                Border Countries
              </h3>
              <div className='flex flex-wrap gap-2'>
                {getBorderCountries().map(borderCode => (
                  <span
                    key={borderCode}
                    className='bg-gray-100 px-2 py-1 rounded text-xs font-mono'
                  >
                    {borderCode}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
