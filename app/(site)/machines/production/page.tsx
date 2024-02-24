import { Metadata } from 'next';

import { auth } from '@/auth';
import { getRequest } from '@/lib/fetch-client';
import { MachineList } from './_components/MachineList';
import { MachineEndpoints } from '@/lib/apis';
import { ProductionProvider } from './_components/ProductionProvider';
import { Machine, Pagination } from '@/types';
import { MachineWorkDashboard } from '@/app/(site)/machines/production/_components/MachineWorkDashboard';

export const metadata: Metadata = {
  title: 'Production',
};

async function getData() {
  const session = await auth();
  const response = await getRequest<{ data: Machine[]; meta: Pagination }>(
    MachineEndpoints.machines(),
    {
      token: session?.accessToken,
      next: { revalidate: 3600 },
    }
  );

  if (response.hasError) {
    throw new Error(response.messages.join(', '));
  }

  return response.fetchedData!;
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
