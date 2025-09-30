import { useMemo, useState } from 'react';
import { Filter, X } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  POPULATION_RANGES,
  REGIONS,
  type SearchFiltersProps,
  type SearchFiltersState,
} from './search-filters.type';

export const SearchFilters = ({
  countries,
  filters,
  onFiltersChange,
}: SearchFiltersProps): React.ReactElement => {
  const [isOpen, setIsOpen] = useState(false);

  // Get unique subregions from countries data
  const subregions = useMemo(() => {
    const uniqueSubregions = new Set<string>();
    countries.forEach(country => {
      if (country.subregion) {
        uniqueSubregions.add(country.subregion);
      }
    });
    return ['All', ...Array.from(uniqueSubregions).sort()];
  }, [countries]);

  const handleFilterChange = (
    key: keyof SearchFiltersState,
    value: string
  ): void => {
    const newFilters = { ...filters, [key]: value };

    // Reset subregion if region changes
    if (key === 'region' && value !== filters.region) {
      newFilters.subregion = 'All';
    }

    onFiltersChange(newFilters);
  };

  const hasActiveFilters = useMemo(() => {
    return (
      filters.region !== 'All' ||
      filters.subregion !== 'All' ||
      filters.population !== 'All'
    );
  }, [filters]);

  const clearAllFilters = (): void => {
    onFiltersChange({
      region: 'All',
      subregion: 'All',
      population: 'All',
    });
  };

  // Filter subregions based on selected region
  const filteredSubregions = useMemo(() => {
    if (filters.region === 'All') return subregions;

    const regionSubregions = new Set<string>();
    countries
      .filter(country => country.region === filters.region)
      .forEach(country => {
        if (country.subregion) {
          regionSubregions.add(country.subregion);
        }
      });

    return ['All', ...Array.from(regionSubregions).sort()];
  }, [countries, filters.region, subregions]);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          size='sm'
          className='flex items-center gap-2 h-9'
        >
          <Filter className='h-4 w-4' />
          <span>Filters</span>
          {hasActiveFilters && (
            <span className='ml-1 bg-primary text-primary-foreground rounded-full text-xs px-1.5 py-0.5 min-w-[1.25rem] h-5 flex items-center justify-center'>
              {Object.values(filters).filter(value => value !== 'All').length}
            </span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className='w-80 p-4' align='start'>
        <div className='space-y-4'>
          <div className='flex items-center justify-between'>
            <h3 className='text-sm font-medium'>Filter Countries</h3>
            {hasActiveFilters && (
              <Button
                variant='ghost'
                size='sm'
                onClick={clearAllFilters}
                className='h-auto p-1 text-xs text-muted-foreground hover:text-foreground'
              >
                <X className='h-3 w-3 mr-1' />
                Clear all
              </Button>
            )}
          </div>

          <div className='space-y-4'>
            <div className='space-y-2'>
              <label className='text-xs font-medium text-muted-foreground'>
                Region
              </label>
              <Select
                value={filters.region}
                onValueChange={value => handleFilterChange('region', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select region' />
                </SelectTrigger>
                <SelectContent>
                  {REGIONS.map(region => (
                    <SelectItem key={region} value={region}>
                      {region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className='space-y-2'>
              <label className='text-xs font-medium text-muted-foreground'>
                Subregion
              </label>
              <Select
                value={filters.subregion}
                onValueChange={value => handleFilterChange('subregion', value)}
                disabled={filters.region === 'All'}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select subregion' />
                </SelectTrigger>
                <SelectContent>
                  {filteredSubregions.map(subregion => (
                    <SelectItem key={subregion} value={subregion}>
                      {subregion}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className='space-y-2'>
              <label className='text-xs font-medium text-muted-foreground'>
                Population
              </label>
              <Select
                value={filters.population}
                onValueChange={value => handleFilterChange('population', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select population range' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='All'>All populations</SelectItem>
                  {POPULATION_RANGES.map((range, index) => (
                    <SelectItem key={index} value={range.label}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
