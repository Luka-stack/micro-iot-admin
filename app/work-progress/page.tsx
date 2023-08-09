import { Metadata } from 'next';

import { MachineList } from './MachineList';
import { MachineWork } from './MachineWork';
import { Machine, Pagination } from '@/types';
import { MachineWorkServerContext } from '@/context/machine-work-context';

export const metadata: Metadata = {
  title: 'Machine Work',
};

async function getMachines(): Promise<{ data: Machine[]; meta: Pagination }> {
  const res = await fetch('http://localhost:5000/api/machines', {
    next: { revalidate: 3600 },
  });

  return res.json();
}

export default async function WorkProgressPage() {
  const { data, meta } = await getMachines();

  return (
    <main className="flex w-full p-4 space-x-4">
      <MachineWorkServerContext>
        <MachineList machines={data} />
        <MachineWork />
      </MachineWorkServerContext>
    </main>
  );
}
