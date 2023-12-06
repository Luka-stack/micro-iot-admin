'use client';

import { useQuery } from '@tanstack/react-query';

import { PuffLoader } from 'react-spinners';
import { MachineWork } from '@/types';
import { ANALYSER_API } from '@/lib/apis';
import { MachineProductionGraph } from '@/components/graphs/MachineProductionGraph';

type Props = {
  serialNumber: string;
};

async function getMachineWork(serialNumber: string) {
  const response = await fetch(`${ANALYSER_API}/${serialNumber}/work`);

  if (!response.ok) {
    throw new Error('Request failed');
  }

  const data: MachineWork[] = await response.json();

  return data.map((machine) => ({
    timestamp: new Date(machine.timestamp).toLocaleString(),
    work: parseFloat(machine.work.toFixed(2)),
  }));
}

export function MachineChart({ serialNumber }: Props) {
  const { isPending, isError, data } = useQuery({
    queryKey: ['machine-work', serialNumber],
    queryFn: () => getMachineWork(serialNumber),
  });

  if (isPending) {
    return <MachineChartLoading />;
  }

  if (isError) {
    // TODO Add Error page
    return <div>Error</div>;
  }

  return (
    <div className="grid w-full h-full auto-rows-fr auto-cols-fr work-graph-preview">
      <MachineProductionGraph data={data} />
    </div>
  );
}

function MachineChartLoading() {
  return (
    <div className="flex items-center justify-center w-full space-x-20 work-graph-preview">
      <PuffLoader color="#94a3b8" size={100} speedMultiplier={0.5} />
    </div>
  );
}
