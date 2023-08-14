import { Metadata } from 'next';
import { Suspense } from 'react';

import { MachineList } from './MachineList';
import { getMachines } from '../actions';
import { MachineWorkServerContext } from '@/context/machine-work-context';
import { MachineWorkDashbord } from './MachineWork';

export const metadata: Metadata = {
  title: 'Machine Work',
};

export default async function WorkProgressPage() {
  const machines = getMachines();

  return (
    <main className="flex w-full p-4 space-x-4">
      <MachineWorkServerContext>
        <Suspense fallback={<div>Loading x2</div>}>
          <MachineList machinePromise={machines} />
          <MachineWorkDashbord />
        </Suspense>
      </MachineWorkServerContext>
    </main>
  );
}
