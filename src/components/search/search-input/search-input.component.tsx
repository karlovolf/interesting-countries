import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { SearchInputProps } from './search-input.type';

export const SearchInput = ({
  value,
  onChange,
  placeholder = 'Search countries, capitals, or regions...',
  debounceMs = 300,
}: SearchInputProps) => {
  const [localValue, setLocalValue] = useState(value);

  // Debounce the search input
  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(localValue);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [localValue, onChange, debounceMs]);

  // Sync with external value changes
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleClear = () => {
    setLocalValue('');
    onChange('');
  };

  return (
    <div className='relative'>
      <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
      <Input
        type='text'
        placeholder={placeholder}
        value={localValue}
        onChange={e => setLocalValue(e.target.value)}
        className='pl-10 pr-10'
      />
      {localValue && (
        <Button
          onClick={handleClear}
          variant='ghost'
          size='icon'
          className='absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8'
          aria-label='Clear search'
        >
          <X className='h-4 w-4' />
        </Button>
      )}
    </div>
  );
};
