'use client';

import { CursorArrowRaysIcon } from '@heroicons/react/24/outline';

import { MachineWorkInsight } from './MachineWorkInsight';
import { useProductionContext } from './ProductionProvider';

export function MachineWorkDashboard() {
  const [state, setState] = useProductionContext();

  const handleClose = (serialNumber: string) =>
    setState((prev) => prev.filter((m) => m.serialNumber !== serialNumber));

  if (state.length === 0) {
    return <NoMachineSelected />;
  }

  return (
    <main className="flex flex-col w-full space-y-4 border rounded-md border-white/10">
      {state.map((machine) => (
        <MachineWorkInsight
          key={machine.serialNumber}
          machine={machine}
          size={state.length}
          onEsc={() => handleClose(machine.serialNumber)}
        />
      ))}
    </main>
  );
}

function NoMachineSelected() {
  return (
    <main className="flex flex-col items-center justify-center w-full space-y-5 border rounded-md border-white/10">
      <CursorArrowRaysIcon className="h-32" />
      <h2 className="text-xl font-bold">
        Please select a machine to view its corresponding production chart.
      </h2>
    </main>
  );
}
