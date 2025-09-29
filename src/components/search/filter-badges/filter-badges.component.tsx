import { useMemo } from 'react';
import { X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { FilterBadgesProps, FilterBadge } from './filter-badges.type';

export const FilterBadges = ({
  filters,
  onFilterRemove,
  onClearAll,
}: FilterBadgesProps): JSX.Element => {
  const activeBadges = useMemo((): FilterBadge[] => {
    const badges: FilterBadge[] = [];

    if (filters.region !== 'All') {
      badges.push({
        key: 'region',
        label: 'Region',
        value: filters.region,
      });
    }

    if (filters.subregion !== 'All') {
      badges.push({
        key: 'subregion',
        label: 'Subregion',
        value: filters.subregion,
      });
    }

    if (filters.population !== 'All') {
      badges.push({
        key: 'population',
        label: 'Population',
        value: filters.population,
      });
    }

    return badges;
  }, [filters]);

  if (activeBadges.length === 0) {
    return <></>;
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs text-muted-foreground">Active filters:</span>

      {activeBadges.map(badge => (
        <Badge
          key={badge.key}
          variant="secondary"
          className="gap-1 pr-1 hover:bg-secondary/80 cursor-pointer"
        >
          <span className="text-xs">
            {badge.label}: {badge.value}
          </span>
          <Button
            variant="ghost"
            size="sm"
            className="h-3 w-3 p-0 text-muted-foreground hover:bg-muted hover:text-foreground rounded-full transition-colors"
            onClick={() => onFilterRemove(badge.key)}
            aria-label={`Remove ${badge.label} filter`}
          >
            <X className="h-2 w-2" />
          </Button>
        </Badge>
      ))}

      {activeBadges.length > 1 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearAll}
          className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
        >
          Clear all
        </Button>
      )}
    </div>
  );
};