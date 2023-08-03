'use client';

import { DateFilter } from '@/components/ui/date-filter';
import { calculateHoursAndMinutes } from '@/common/date-helpers';
import { MachineUtilization } from '@/types';
import { useEffect, useMemo, useState } from 'react';
import { UtilizationGraph } from '@/components/graphs/UtilizationGraph';

type Props = {
  serialNumber: string;
};

export function UtilizationGraphTab({ serialNumber }: Props) {
  const { utilization, loading, doRequest } =
    useRequestUtilization(serialNumber);

  const totalUtilization = useMemo(() => {
    const totalUtilization = utilization.reduce(
      (acc, curr) => acc + curr.utilization,
      0
    );

    const { hours, minutes } = calculateHoursAndMinutes(totalUtilization);

    return `${hours} [h] ${minutes} [min]`;
  }, [utilization]);

  return (
    <main className="relative flex flex-col h-full">
      <div className="absolute right-0 text-sm top-2">
        <h3>Utilization Summary: {totalUtilization}</h3>
      </div>

      <DateFilter onChange={doRequest} />
      <UtilizationGraph data={utilization} />
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
  }, []);

  return { utilization, loading, doRequest };
}
