import { Metadata } from 'next';

import { MachineList } from './MachineList';
import { getMachines } from '@/app/actions';
import { MachineWorkDashbord } from './MachineWorkDashboard';
import { MachineWorkServerContext } from '@/context/machine-work-context';

export const metadata: Metadata = {
  title: 'Machine Work',
};

export default async function WorkProgressPage() {
  const machines = getMachines();

  return (
    <main className="flex w-full p-4 space-x-4">
      <MachineWorkServerContext>
        <MachineList machinePromise={machines} />
        <MachineWorkDashbord />
      </MachineWorkServerContext>
    </main>
  );
}
