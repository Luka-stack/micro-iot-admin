'use client';

import { UtilizationGraph } from '@/components/graphs/UtilizationGraph';
import { DateFilter } from '@/components/ui/date-filter';
import { calculateHoursAndMinutes } from '@/common/date-helpers';
import { MachineUtilization } from '@/types';
import { useMemo, useState } from 'react';

type Props = {
  serialNumber: string;
  data: MachineUtilization[];
};

export function MahcineUtilizationTab({ serialNumber, data }: Props) {
  const { utilization, loading, doRequest } = useRequestUtilization(
    'f03afd24-b055',
    data
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
    <main className="relative flex flex-col h-full">
      <div className="absolute right-0 text-sm top-2">
        <h3>Utilization Summary: {totalUtilization}</h3>
      </div>

      <DateFilter onChange={doRequest} />
      <UtilizationGraph data={utilization} />
    </main>
  );
}

function useRequestUtilization(
  serialNumber: string,
  cachedData: MachineUtilization[]
) {
  const [utilization, setUtilization] =
    useState<MachineUtilization[]>(cachedData);
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

    console.log('After fetch', data);

    setUtilization(data);
    setLoading(false);
  };

  return { utilization, loading, doRequest };
}
