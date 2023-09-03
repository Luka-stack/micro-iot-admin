'use client';

import { MachineProductionGraph } from '@/components/graphs/MachineProductionGraph';
import { MachineWork } from '@/types';
import { use, useMemo } from 'react';

type Props = {
  dataPromise: Promise<MachineWork[]>;
};

export function MachineChart({ dataPromise }: Props) {
  const machineWork = useTransformData(dataPromise);

  return (
    <div className="grid w-full h-full auto-rows-fr auto-cols-fr work-graph-preview">
      <MachineProductionGraph data={machineWork} />
    </div>
  );
}

function useTransformData(promise: Promise<MachineWork[]>) {
  const data = use(promise);

  return useMemo(
    () =>
      data.map((machine) => ({
        timestamp: new Date(machine.timestamp).toLocaleString(),
        work: parseFloat(machine.work.toFixed(2)),
      })),
    [data]
  );
}
