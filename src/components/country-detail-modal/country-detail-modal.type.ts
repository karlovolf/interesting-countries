import type { CountryBasic } from '@/api/endpoints/countries';

export interface CountryDetailModalProps {
  country: CountryBasic | null;
  isOpen: boolean;
  onClose: () => void;
}