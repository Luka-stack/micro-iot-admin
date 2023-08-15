import { calculateHoursAndMinutes } from '@/common/date-helpers';
import { notFound } from 'next/navigation';
import { use } from 'react';

type Statistics = {
  total: number;
  today: number;
  lastWeek: number;
  avgLastWeek: number;
  lastMonth: number;
  avgLastMonth: number;
};

async function getStatistics(
  serialNumber: string
): Promise<{ data: Statistics }> {
  return fetch(
    `http://localhost:7000/api/analyser/${serialNumber}/statistics`,
    {
      cache: 'no-cache',
    }
  ).then((res) => res.json());
}

export function UtilizationStatsTab({
  serialNumber,
}: {
  serialNumber: string;
}) {
  const { data } = use<{ data: Statistics }>(getStatistics(serialNumber));

  if (!data) {
    return notFound();
  }

  const hoursAndMinLabel = (utilization: number) => {
    const { hours, minutes } = calculateHoursAndMinutes(utilization);

    return `${hours} [h] ${minutes} [min]`;
  };

  return (
    <main className="flex flex-col items-center space-y-10">
      <h1 className="text-2xl font-medium text-center">Utilization Summary</h1>
      <div className="flex flex-col p-5 border border-black h-fit w-fit bg-black/10">
        <div className="self-center space-y-3">
          <p>Total utilization: {hoursAndMinLabel(data.total)}</p>
          <p>Today: {hoursAndMinLabel(data.today)}</p>
          <p>Last Week: {hoursAndMinLabel(data.lastWeek)}</p>
          <p>Average Last Week: {hoursAndMinLabel(data.avgLastWeek)}</p>
          <p>Last Month: {hoursAndMinLabel(data.lastMonth)}</p>
          <p>Average Last Month: {hoursAndMinLabel(data.avgLastMonth)}</p>
        </div>
      </div>
    </main>
  );
}
