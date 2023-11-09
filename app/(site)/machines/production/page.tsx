import { Metadata } from 'next';

import { MachineList } from './_components/MachineList';
import { getMachines } from '@/app/actions';
import { MachineWorkServerContext } from '@/context/machine-work-context';
import { MachineWorkDashboard } from '@/app/(site)/machines/production/_components/MachineWorkDashboard';

export const metadata: Metadata = {
  title: 'Production',
};

export default async function WorkProgressPage() {
  const machines = getMachines();

  return (
    <main className="flex w-full space-x-4 full-page">
      <MachineWorkServerContext>
        <MachineList machinePromise={machines} />

        <MachineWorkDashboard />
      </MachineWorkServerContext>
    </main>
  );
}
