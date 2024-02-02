'use client';

import { notFound } from 'next/navigation';

import { Skeleton } from './_components/Skeleton';
import { ClientError } from '../../../../../components/ClientError';
import { useStatistics } from './_hooks/use-statistics';
import { calculateHoursAndMinutes } from '@/lib/date-helpers';

type Props = {
  params: { serialNumber: string };
};

export default function MachineStatisticsPage({ params }: Props) {
  const { data, isError, error, isPending } = useStatistics(
    params.serialNumber
  );

  const hoursAndMinLabel = (utilization: number) => {
    const { hours, minutes } = calculateHoursAndMinutes(utilization);

    if (hours === 0 && minutes === 0) {
      return 'Not used';
    }

    return `${hours} [h] ${minutes} [min]`;
  };

  if (isError) {
    if (error?.cause === 404 || error?.cause === 401) {
      return notFound();
    }

    return <ClientError />;
  }

  if (isPending) {
    return <Skeleton />;
  }

  return (
    <main className="flex flex-col justify-center flex-1 gap-10 border rounded-md border-white/10">
      <div className="flex flex-wrap justify-center space-x-10">
        <section className="p-6 border rounded-md shadow-sm main-gradient border-white/10 shadow-black">
          <h3 className="text-lg font-semibold">{`Total machine utilization: ${hoursAndMinLabel(
            data!.total
          )}`}</h3>
        </section>
        <section className="p-6 border rounded-md shadow-sm main-gradient border-white/10 shadow-black">
          <h3 className="text-lg font-semibold">{`Today's machine utilization: ${hoursAndMinLabel(
            data!.today
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
              <span>{` ${hoursAndMinLabel(data!.lastWeek)}`}</span>
            </li>
            <li className="flex justify-between">
              <h5 className="w-20">Average:</h5>
              <span>{` ${hoursAndMinLabel(data!.avgLastWeek)}`}</span>
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
              <span>{` ${hoursAndMinLabel(data!.lastMonth)}`}</span>
            </li>
            <li className="flex justify-between">
              <h5 className="w-20">Average:</h5>
              <span>{` ${hoursAndMinLabel(data!.avgLastMonth)}`}</span>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
