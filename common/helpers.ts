import { SelectedFilters } from '@/types';

export function createFilterUrl(filters: SelectedFilters): string {
  const query = new URLSearchParams();

  if (filters.serialNumber) {
    query.set('serialNumber', filters.serialNumber);
  }

  if (filters.producents) {
    query.set('producents', filters.producents.name);
  }

  if (filters.types) {
    query.set('types', filters.types.name);
  }

  if (filters.models) {
    query.set('models', filters.models.name);
  }

  if (filters.status) {
    query.set('status', filters.status.name);
  }

  if (filters.rate) {
    query.set('rate', filters.rate + '');
  }

  return query.toString();
}
