import { calculateHoursAndMinutes } from '@/common/date-helpers';
import { notFound } from 'next/navigation';

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
  const res = await fetch(
    `http://localhost:7000/api/analyser/${serialNumber}/statistics`,
    {
      next: { revalidate: 3600 },
    }
  );

  return res.json();
}

export default async function MachineUtilizationStatsPage({
  params,
}: {
  params: { serialNumber: string };
}) {
  const { data } = await getStatistics(params.serialNumber);

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
