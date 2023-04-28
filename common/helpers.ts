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

  if (filters.rate.value) {
    query.set('rate', filters.rate.value + '');
    query.set('rateFilter', filters.rate.filter);
  }

  if (filters.startDate.value) {
    query.set('startedAt', filters.startDate.value.toISOString().split('T')[0]);
    query.set('startedAtFilter', filters.startDate.filter);
  }

  return query.toString();
}

export function differenceInHoursAndMin(date: Date): [number, number] {
  const diffMs = Math.abs(new Date().getTime() - date.getTime());
  const hours = Math.floor(diffMs / 1000 / 60 / 60);
  const minutes = Math.floor((diffMs / 1000 / 60) % 60);

  return [hours, minutes];
}

export function getProductionRateLevel(
  rate: number,
  defaultRate: number,
  maxRate: number
): number {
  if (rate > defaultRate) {
    return 0;
  }

  if (rate === defaultRate) {
    return 1;
  }

  const level2Rate = defaultRate / 2 < maxRate ? maxRate : defaultRate / 2;

  if (rate === level2Rate) {
    return 2;
  }

  return 3;
}
