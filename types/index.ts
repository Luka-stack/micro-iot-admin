import { MACHINE_STATUSES } from '@/lib/constants';

export type Machine = {
  serialNumber: string;
  producent: string;
  type: {
    name: string;
    imageUrl: string;
  };
  model: {
    name: string;
    workBase: number;
    workRange: number;
    faultRate: number;
    maxRate: number;
    minRate: number;
    defaultRate: number;
  };
  status: MachineStatus;
  lastStatusUpdate: string;
  productionRate: number;
  assignedEmployee: string | null;
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
  rate?: {
    filter: string;
    value?: number;
  };
  startDate?: {
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

export type MachineUtilization = {
  utilization: number;
  date: string;
};

export type MachineWork = {
  timestamp: string;
  work: number;
};

export type AuthUser = {
  email: string;
  displayName: string;
  role: string;
};

export type User = {
  email: string;
  displayName: string;
};
