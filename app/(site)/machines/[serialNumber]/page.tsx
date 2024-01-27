import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { auth } from '@/auth';
import { Machine } from '@/types';
import { getRequest } from '@/lib/fetch-client';
import { MachineInfoCard } from './_components/MachineInfoCard';
import { MachineEndpoints } from '@/lib/apis';
import { MachineStatusCard } from './_components/MachineStatusCard';
import { MachineProduction } from './_components/MachineProduction';
import { MachineMaintenanceCard } from './_components/MachineMaintenanceCard';

type Props = {
  params: {
    serialNumber: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return { title: params.serialNumber };
}

async function getMachine(serialNumber: string) {
  const session = await auth();

  const response = await getRequest<{ data: Machine }>(
    MachineEndpoints.machine(serialNumber),
    {
      token: session?.accessToken,
      next: { tags: [serialNumber] },
    }
  );

  if (response.hasError) {
    return null;
  }

  return response.fetchedData;
}

export default async function Machines({ params }: Props) {
  const machine = await getMachine(params.serialNumber);

  if (!machine) {
    return notFound();
  }

  return (
    <main className="flex-1 p-4 border rounded-md border-white/10">
      <div className="flex flex-col items-center w-full h-full justify-evenly">
        <div className="flex w-full justify-evenly">
          <MachineInfoCard machine={machine.data} />

          <MachineMaintenanceCard machine={machine.data} />

          <MachineStatusCard machine={machine.data} />
        </div>

        <MachineProduction machine={machine.data} />
      </div>
    </main>
  );
}
