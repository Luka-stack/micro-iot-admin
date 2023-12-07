import { calculateHoursAndMinutes } from '@/lib/date-helpers';
import { notFound } from 'next/navigation';

type Statistics = {
  total: number;
  today: number;
  lastWeek: number;
  avgLastWeek: number;
  lastMonth: number;
  avgLastMonth: number;
};

type Props = {
  params: { serialNumber: string };
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

export default async function MachineStatisticsPage({ params }: Props) {
  const { data } = await getStatistics(params.serialNumber);

  if (!data) {
    return notFound();
  }

  const hoursAndMinLabel = (utilization: number) => {
    const { hours, minutes } = calculateHoursAndMinutes(utilization);

    if (hours === 0 && minutes === 0) {
      return 'Not used';
    }

    return `${hours} [h] ${minutes} [min]`;
  };

  return (
    <main className="flex flex-col justify-center flex-1 gap-10 border rounded-md border-white/10">
      <div className="flex flex-wrap justify-center space-x-10">
        <section className="p-6 border rounded-md shadow-sm main-gradient border-white/10 shadow-black">
          <h3 className="text-lg font-semibold">{`Total machine utilization: ${hoursAndMinLabel(
            data.total
          )}`}</h3>
        </section>
        <section className="p-6 border rounded-md shadow-sm main-gradient border-white/10 shadow-black">
          <h3 className="text-lg font-semibold">{`Today's machine utilization: ${hoursAndMinLabel(
            data.today
          )}`}</h3>
        </section>
      </div>

      <div className="flex flex-wrap justify-center space-x-24">
        <section className="px-6 py-4 border rounded-md shadow-sm border-white/10 shadow-black">
          <h3 className="text-lg font-semibold">
            Last Week Machine Utilization
          </h3>
          <ul className="mt-3 space-y-2">
            <li className="flex justify-between">
              <h5 className="w-20">Total:</h5>
              <span>{` ${hoursAndMinLabel(data.lastWeek)}`}</span>
            </li>
            <li className="flex justify-between">
              <h5 className="w-20">Average:</h5>
              <span>{` ${hoursAndMinLabel(data.avgLastWeek)}`}</span>
            </li>
          </ul>
        </section>
        <section className="px-6 py-4 border rounded-md shadow-sm border-white/10 shadow-black">
          <h3 className="text-lg font-semibold">
            Last Month Machine Utilization
          </h3>
          <ul className="mt-3 space-y-2">
            <li className="flex justify-between">
              <h5 className="w-20">Total:</h5>
              <span>{` ${hoursAndMinLabel(data.lastMonth)}`}</span>
            </li>
            <li className="flex justify-between">
              <h5 className="w-20">Average:</h5>
              <span>{` ${hoursAndMinLabel(data.avgLastMonth)}`}</span>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
