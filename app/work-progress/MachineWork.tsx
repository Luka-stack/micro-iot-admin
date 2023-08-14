'use client';

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
        <MachineWorkInsight
          key={machine.serialNumber}
          machine={machine}
          size={state.length}
          onEsc={() =>
            actions({ type: 'REMOVE_MACHINE', payload: machine.serialNumber })
          }
        />
      ))}
    </main>
  );
}

function NoMachineSelected() {
  return (
    <main>
      <h1>Select up to two machines</h1>
    </main>
  );
}
