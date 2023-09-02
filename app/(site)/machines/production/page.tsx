import { Metadata } from 'next';

import { MachineList } from './MachineList';
import { getMachines } from '@/app/actions';
import { MachineWorkServerContext } from '@/context/machine-work-context';
import { MachineWorkDashbord } from '@/features/production-dashboard';

export const metadata: Metadata = {
  title: 'Production',
};

export default async function WorkProgressPage() {
  const machines = getMachines();

  return (
    <main className="flex w-full space-x-4 full-page">
      <MachineWorkServerContext>
        <MachineList machinePromise={machines} />

        <MachineWorkDashbord />
      </MachineWorkServerContext>
    </main>
  );
}
