'use client';

import { Suspense } from 'react';
import { CursorArrowRaysIcon } from '@heroicons/react/24/outline';

import { MachineWorkContext } from '@/context/machine-work-context';
import { MachineWorkInsight } from './MachineWorkInsight';

export function MachineWorkDashbord() {
  const state = MachineWorkContext.useState();
  const actions = MachineWorkContext.useActions();

  if (state.length === 0) {
    return <NoMachineSelected />;
  }

  return (
    <main className="flex flex-col w-full space-y-4">
      {state.map((machine) => (
        <Suspense key={machine.serialNumber} fallback={<div>Suspsen</div>}>
          <MachineWorkInsight
            machine={machine}
            size={state.length}
            onEsc={() =>
              actions({ type: 'REMOVE_MACHINE', payload: machine.serialNumber })
            }
          />
        </Suspense>
      ))}
    </main>
  );
}

function NoMachineSelected() {
  return (
    <main className="flex flex-col items-center justify-center w-full space-y-5">
      <CursorArrowRaysIcon className="h-32" />
      <h2 className="text-xl font-bold">
        Please select a machine to view its corresponding working chart.
      </h2>
    </main>
  );
}
