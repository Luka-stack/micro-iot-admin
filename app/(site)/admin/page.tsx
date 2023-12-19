import { Filters, Machine, Pagination } from '@/types';

import { MachineAssignment } from './_components/MachineAssignment';
import { MACHINE_API, MiscEndpoints } from '@/lib/apis';

async function fetchMachines(): Promise<{ data: Machine[]; meta: Pagination }> {
  const response = await fetch(`${MACHINE_API}`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error();
  }

  return response.json();
}

async function fetchFilters(): Promise<{ data: Filters }> {
  const response = await fetch(MiscEndpoints.filters);

  if (!response.ok) {
    throw new Error("Couldn't load filters");
  }

  return response.json();
}

export default async function AdminPage() {
  const [machineData, filters] = await Promise.all([
    fetchMachines(),
    fetchFilters(),
  ]);

  return <MachineAssignment machineData={machineData} filters={filters.data} />;
}
