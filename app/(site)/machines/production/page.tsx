import { Metadata } from 'next';

import { MachineList } from './_components/MachineList';
import { MACHINE_API } from '@/lib/apis';
import { ProductionProvider } from './_components/ProductionProvider';
import { Machine, Pagination } from '@/types';
import { MachineWorkDashboard } from '@/app/(site)/machines/production/_components/MachineWorkDashboard';

export const metadata: Metadata = {
  title: 'Production',
};

async function getData(): Promise<{ data: Machine[]; meta: Pagination }> {
  const response = await fetch(MACHINE_API, {
    next: { revalidate: 3600 },
  });

  return await response.json();
}

export default async function WorkProgressPage() {
  const machines = await getData();

  return (
    <main className="flex w-full space-x-4 full-page">
      <ProductionProvider>
        <MachineList machines={machines} />

        <MachineWorkDashboard />
      </ProductionProvider>
    </main>
  );
}
