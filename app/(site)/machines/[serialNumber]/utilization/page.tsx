'use client';

import { useCallback, useMemo, useState } from 'react';

import { DateFilter } from '@/components/ui/DateFilter';
import { ClientError } from '@/components/ClientError';
import { LoadingGraph } from './_components/LoadingGraph';
import { useUtilization } from './_hooks/use-utilization';
import { MachineUtilizationGraph } from '@/components/graphs/MachineUtilizationGraph';
import { calculateHoursAndMinutes } from '@/lib/date-helpers';

type Props = {
  params: { serialNumber: string };
};

export default function MachineUtilizationPage({ params }: Props) {
  const [searchDate, setSearchDate] = useState(() => {
    const sixDaysAgo = new Date();
    sixDaysAgo.setDate(sixDaysAgo.getDate() - 6);

    return {
      from: sixDaysAgo,
      to: new Date(),
    };
  });

  const { data, isError, isPending } = useUtilization(
    params.serialNumber,
    searchDate
  );

  const totalUtilization = useMemo(() => {
    if (!data) return 'No Data';

    const totalUtilization = data.reduce(
      (acc, curr) => acc + curr.utilization,
      0
    );

    const { hours, minutes } = calculateHoursAndMinutes(totalUtilization);

    return `${hours} [h] ${minutes} [min]`;
  }, [data]);

  const handleChangeFilter = useCallback((from: Date, to: Date) => {
    setSearchDate({ from, to });
  }, []);

  if (isError) {
    return <ClientError />;
  }

  if (isPending) {
    return <LoadingGraph />;
  }

  return (
    <main className="relative flex flex-col w-full h-full p-4 border rounded-md border-white/10">
      <div className="absolute text-sm right-5 top-6">
        <h3>Utilization Summary: {totalUtilization}</h3>
      </div>

      <DateFilter
        changeFilter={handleChangeFilter}
        filterFrom={searchDate.from}
        filterTo={searchDate.to}
      />
      <MachineUtilizationGraph data={data!} />
    </main>
  );
}
