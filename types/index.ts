import { MACHINE_STATUSES } from '@/common/constants';

export type Machine = {
  serialNumber: string;
  imageUrl: string;
  producent: string;
  type: string;
  model: string;
  status: string;
  startedAt: string;
  productionRate: number;
};

export type Filters = {
  producents: ProducentFilter[];
  types: TypeFilter[];
  models: ModelFilter[];
};

export type ProducentFilter = {
  name: string;
};

export type TypeFilter = {
  name: string;
  producents: string[];
};

export type ModelFilter = {
  name: string;
  producent: string;
  type: string;
};

export type MachineStatus = keyof typeof MACHINE_STATUSES;

export type SelectedFilter = { name: string };

export type SelectedFilters = {
  serialNumber?: string;
  producents?: SelectedFilter;
  types?: SelectedFilter;
  models?: SelectedFilter;
  status?: SelectedFilter;
  rate: {
    filter: string;
    value?: number;
  };
  startDate: {
    filter: string;
    value?: Date;
  };
};

export type Pagination = {
  count: number;
  offset: number;
  limit: number;
  total: number;
};

export type MachinesResponse = {
  data: Machine[];
  meta: Pagination;
};
