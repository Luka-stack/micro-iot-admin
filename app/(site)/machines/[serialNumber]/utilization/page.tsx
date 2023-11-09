'use client';

import { calculateHoursAndMinutes } from '@/lib/date-helpers';
import { MachineUtilizationGraph } from '@/components/graphs/MachineUtilizationGraph';
import { DateFilter } from '@/components/ui/DateFilter';
import { MachineUtilization } from '@/types';
import { useEffect, useMemo, useState } from 'react';

type Props = {
  params: { serialNumber: string };
};

export default function MachineUtilizationPage({ params }: Props) {
  const { utilization, loading, doRequest } = useRequestUtilization(
    params.serialNumber
  );

  const totalUtilization = useMemo(() => {
    const totalUtilization = utilization.reduce(
      (acc, curr) => acc + curr.utilization,
      0
    );

    const { hours, minutes } = calculateHoursAndMinutes(totalUtilization);

    return `${hours} [h] ${minutes} [min]`;
  }, [utilization]);

  return (
    <main className="relative flex flex-col w-full h-full p-4 border rounded-md border-white/10">
      <div className="absolute text-sm right-5 top-6">
        <h3>Utilization Summary: {totalUtilization}</h3>
      </div>

      <DateFilter onChange={doRequest} />
      <MachineUtilizationGraph data={utilization} />
    </main>
  );
}

function useRequestUtilization(serialNumber: string) {
  const [utilization, setUtilization] = useState<MachineUtilization[]>([]);
  const [loading, setLoading] = useState(false);

  const doRequest = async (from: Date, to: Date) => {
    setLoading(true);

    const response = await fetch(
      `http://localhost:7000/api/analyser/${serialNumber}/utilization?${new URLSearchParams(
        {
          fromDate: from.toISOString().slice(0, 10),
          toDate: to.toISOString().slice(0, 10),
        }
      )}`,
      { cache: 'no-cache' }
    );

    const { data } = await response.json();

    setUtilization(data);
    setLoading(false);
  };

  useEffect(() => {
    const sixDaysAgo = new Date();
    sixDaysAgo.setDate(sixDaysAgo.getDate() - 6);

    doRequest(sixDaysAgo, new Date());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { utilization, loading, doRequest };
}
