import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Machine } from '@/types';
import { RefreshPage } from '@/components/ui/refresh-page';
import { MachineDashboard } from '@/features/machine-dashboard';

type Props = {
  params: {
    serialNumber: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return { title: `Machine ${params.serialNumber}` };
}

async function getMachine(serialNumber: string): Promise<Machine> {
  const [machineRes, statusRes] = await Promise.all([
    fetch(`http://localhost:5000/api/machines/${serialNumber}`, {
      next: { tags: ['machine'] },
    }),
    fetch(`http://localhost:5000/api/machines/${serialNumber}/status`, {
      cache: 'no-store',
    }),
  ]);

  const [machineData, statusData] = await Promise.all([
    machineRes.json(),
    statusRes.json(),
  ]);

  return { ...machineData.data, status: statusData.data.status };
}

export default async function Machines({ params }: Props) {
  const machine = await getMachine(params.serialNumber);

  if (!machine) {
    return notFound();
  }

  return (
    <main className="flex-1 p-4 border rounded-md border-white/10">
      <RefreshPage />

      <MachineDashboard machine={machine} />
    </main>
  );
}
