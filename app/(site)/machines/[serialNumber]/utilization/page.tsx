'use client';

import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { DateFilter } from '@/components/ui/DateFilter';
import { MachineUtilization } from '@/types';
import { MachineUtilizationGraph } from '@/components/graphs/MachineUtilizationGraph';
import { calculateHoursAndMinutes } from '@/lib/date-helpers';
import { LoadingIndicator } from '@/components/ui/LoadingIndicator';
import { FaceFrownIcon } from '@heroicons/react/24/outline';

type Props = {
  params: { serialNumber: string };
};

async function fetchUtilization(
  serialNumber: string,
  from: Date,
  to: Date
): Promise<{ data: MachineUtilization[] }> {
  const response = await fetch(
    `http://localhost:7000/api/analyser/${serialNumber}/utilization?${new URLSearchParams(
      {
        fromDate: from.toISOString().slice(0, 10),
        toDate: to.toISOString().slice(0, 10),
      }
    )}`,
    { cache: 'no-cache' }
  );

  if (!response.ok) {
    throw new Error();
  }

  return response.json();
}

export default function MachineUtilizationPage({ params }: Props) {
  const [searchDate, setSearchDate] = useState(() => {
    const sixDaysAgo = new Date();
    sixDaysAgo.setDate(sixDaysAgo.getDate() - 6);

    return {
      from: sixDaysAgo,
      to: new Date(),
    };
  });

  const { isPending, isError, data } = useQuery({
    queryKey: ['machine-utilization', searchDate.from, searchDate],
    queryFn: () =>
      fetchUtilization(params.serialNumber, searchDate.from, searchDate.to),
  });

  const totalUtilization = useMemo(() => {
    if (!data) return 'No Data';

    const totalUtilization = data.data.reduce(
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
    return (
      <main className="relative flex flex-col w-full h-full p-4 border rounded-md border-white/10">
        <ErrorInfo />;
      </main>
    );
  }

  if (isPending) {
    return (
      <main className="relative flex flex-col w-full h-full p-4 border rounded-md border-white/10">
        <LoadingData />
      </main>
    );
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
      <MachineUtilizationGraph data={data.data} />
    </main>
  );
}

function LoadingData() {
  const [dots, setDots] = useState('.');

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDots((prevDots) => (prevDots === '...' ? '.' : prevDots + '.'));
    }, 500);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center flex-1">
      <LoadingIndicator className="w-32" />
      <p className="text-lg font-bold text-blue-800">
        Loading utilization data{dots}
      </p>
    </div>
  );
}

function ErrorInfo() {
  return (
    <div className="flex flex-col items-center justify-center flex-1">
      <FaceFrownIcon className="w-32 stroke-blue-800" />
      <p className="text-lg font-bold text-blue-800">
        Error occurred while fetching data. Try to refresh the page.
      </p>
    </div>
  );
}
