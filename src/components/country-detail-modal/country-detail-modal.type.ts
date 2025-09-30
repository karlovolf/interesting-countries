import type { Country } from '@/api/endpoints/countries';

export interface CountryDetailModalProps {
  country: Country | null;
  isOpen: boolean;
  onClose: () => void;
}