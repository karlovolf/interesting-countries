import { useMemo, useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from 'react-simple-maps';
import type { WorldMapProps } from './world-map.type';

export const WorldMap = ({
  countries,
  filteredCountries,
  onCountryClick,
  className = '',
}: WorldMapProps) => {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  // Create a mapping of country codes to our API data
  const countryDataMap = useMemo(() => {
    const map = new Map();
    countries.forEach(country => {
      // Add multiple mapping variations for better matching
      map.set(country.cca2?.toLowerCase(), country);
      map.set(country.cca3?.toLowerCase(), country);
      map.set(country.name.common.toLowerCase(), country);
      map.set(country.name.official.toLowerCase(), country);

      // Add some common name variations
      const commonName = country.name.common.toLowerCase();
      if (commonName.includes('united states')) {
        map.set('usa', country);
        map.set('united states of america', country);
      }
      if (commonName.includes('united kingdom')) {
        map.set('uk', country);
        map.set('britain', country);
      }
    });
    return map;
  }, [countries]);

  // Create a set of filtered country codes for quick lookup
  const filteredCountryCodes = useMemo(() => {
    const codes = new Set();
    filteredCountries.forEach(country => {
      codes.add(country.cca2?.toLowerCase());
      codes.add(country.cca3?.toLowerCase());
      codes.add(country.name.common.toLowerCase());
      codes.add(country.name.official.toLowerCase());
    });
    return codes;
  }, [filteredCountries]);

  // Check if a geography matches any of our filtered countries
  const isGeographyFiltered = (geo: any) => {
    const geoProps = geo.properties;

    // Try different property names that might exist in the geography data
    const possibleNames = [
      geoProps.ISO_A2?.toLowerCase(),
      geoProps.ISO_A3?.toLowerCase(),
      geoProps.NAME?.toLowerCase(),
      geoProps.NAME_EN?.toLowerCase(),
      geoProps.name?.toLowerCase(),
      geoProps.NAME_LONG?.toLowerCase(),
      geoProps.ADMIN?.toLowerCase(),
    ].filter(Boolean);

    const isFiltered = possibleNames.some(name =>
      filteredCountryCodes.has(name)
    );

    return isFiltered;
  };

  // Get country data for a geography
  const getCountryData = (geo: any) => {
    const geoProps = geo.properties;

    // Try different property names that might exist in the geography data
    const possibleNames = [
      geoProps.ISO_A2?.toLowerCase(),
      geoProps.ISO_A3?.toLowerCase(),
      geoProps.NAME?.toLowerCase(),
      geoProps.NAME_EN?.toLowerCase(),
      geoProps.name?.toLowerCase(),
      geoProps.NAME_LONG?.toLowerCase(),
      geoProps.ADMIN?.toLowerCase(),
    ].filter(Boolean);

    for (const name of possibleNames) {
      const country = countryDataMap.get(name);
      if (country) {
        return country;
      }
    }

    return undefined;
  };

  // Get display name for a geography (prioritizing our API data, fallback to geography data)
  const getDisplayName = (geo: any) => {
    const country = getCountryData(geo);
    if (country) {
      return country.name.common;
    }

    // Fallback to geography properties
    const geoProps = geo.properties;
    return (
      geoProps.NAME_EN ||
      geoProps.NAME ||
      geoProps.name ||
      geoProps.ADMIN ||
      'Unknown'
    );
  };

  // Get country color based on filter status
  const getCountryColor = (geo: any) => {
    const isFiltered = isGeographyFiltered(geo);
    const hasCountryData = getCountryData(geo) !== undefined;

    if (isFiltered) {
      return '#93c5fd';
    } else if (hasCountryData) {
      return '#d1d5db';
    }
    return '#e5e7eb';
  };

  const getCountryHoverColor = (geo: any) => {
    const isFiltered = isGeographyFiltered(geo);
    const hasCountryData = getCountryData(geo) !== undefined;

    if (isFiltered) {
      return '#3b82f6'; // Darker saturated blue for filtered countries on hover
    } else if (hasCountryData) {
      return '#6b7280'; // Darker gray for clickable countries on hover
    }
    return '#9ca3af'; // Darker gray for non-clickable countries on hover
  };

  const handleGeographyClick = (geo: any) => {
    if (!onCountryClick) return;

    const country = getCountryData(geo);

    if (country) {
      onCountryClick(country);
    }
  };

  return (
    <div className={`w-full bg-white rounded-lg border shadow-sm ${className}`}>
      <div className='p-4 border-b'>
        <h3 className='text-lg font-semibold'>World Map</h3>
        <p className='text-sm text-muted-foreground'>
          {filteredCountries.length === countries.length
            ? `Showing all ${countries.length} countries`
            : `Highlighting ${filteredCountries.length} of ${countries.length} countries`}
        </p>
      </div>

      <div className='p-4 relative'>
        <ComposableMap
          projectionConfig={{
            scale: 120,
            center: [0, 10],
          }}
          width={800}
          height={400}
          className='w-full h-auto bg-white rounded border shadow-inner'
          style={{ backgroundColor: '#f8fafc' }}
        >
          <ZoomableGroup>
            <Geographies geography='https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'>
              {({ geographies }) =>
                geographies.map(geo => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => handleGeographyClick(geo)}
                    onMouseEnter={() => setHoveredCountry(getDisplayName(geo))}
                    onMouseLeave={() => setHoveredCountry(null)}
                    style={{
                      default: {
                        fill: getCountryColor(geo),
                        stroke: '#ffffff',
                        strokeWidth: 0.5,
                        outline: 'none',
                      },
                      hover: {
                        fill: getCountryHoverColor(geo),
                        stroke: '#ffffff',
                        strokeWidth: 0.8,
                        outline: 'none',
                        cursor: 'pointer',
                      },
                      pressed: {
                        fill: getCountryHoverColor(geo),
                        stroke: '#ffffff',
                        strokeWidth: 0.8,
                        outline: 'none',
                      },
                    }}
                  />
                ))
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>

        {/* Hover tooltip */}
        {hoveredCountry && (
          <div className='absolute top-6 left-6 bg-gray-100 bg-opacity-20 text-black px-3 py-2 rounded-lg text-xs font-medium pointer-events-none z-10'>
            {hoveredCountry}
          </div>
        )}
      </div>

      <div className='flex items-center justify-center gap-6 mt-1 mb-4 text-sm text-muted-foreground'>
        <div className='flex items-center gap-2'>
          <div className='w-3 h-3 bg-blue-500 rounded-full border shadow-sm'></div>
          <span>Matching countries ({filteredCountries.length})</span>
        </div>
        <div className='flex items-center gap-2'>
          <div className='w-3 h-3 bg-gray-200 rounded-full border'></div>
          <span>
            Available countries ({countries.length - filteredCountries.length})
          </span>
        </div>
        <div className='flex items-center gap-2'>
          <div className='w-3 h-3 bg-gray-300 rounded-full border'></div>
          <span>Other territories</span>
        </div>
      </div>
    </div>
  );
};
