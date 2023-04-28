import {
  differenceInHoursAndMin,
  getProductionRateLevel,
} from '@/common/helpers';
import StatusToggle from '@/components/ui/status-toggle';
import { Machine } from '@/types';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export const dynamicParams = true;

async function getMachine(serialNumber: string): Promise<{ data: Machine }> {
  const res = await fetch(
    `http://localhost:5000/api/machines/${serialNumber}`,
    {
      cache: 'no-store',
    }
  );

  return res.json();
}

export default async function Machines({
  params,
}: {
  params: { serialNumber: string };
}) {
  const { data } = await getMachine(params.serialNumber);

  if (!data) {
    return notFound();
  }

  const hoursLabel = () => {
    const [hours, minutes] = differenceInHoursAndMin(
      new Date(data.lastStatusUpdate)
    );

    return (
      <>
        <b>{data.status === 'WORKING' ? 'Working' : 'Idle'} hours:</b> {hours}
        [h] {minutes}[min]
      </>
    );
  };

  return (
    <main className="w-full p-5 border border-black rounded-md shadow-sm shadow-black">
      <div className="flex">
        <section className="flex flex-col w-1/5 space-y-5 border-r border-black">
          <div className="relative self-center w-60 h-72">
            <Image src={`/${data.type.imageUrl}`} alt="Machine" fill />
          </div>

          <div className="space-y-2">
            <p>
              <b>Machine:</b> {data.serialNumber}
            </p>
            <p>
              <b>Producent:</b> {data.producent}
            </p>
            <p>
              <b>Type:</b> {data.type.name}
            </p>
            <p>
              <b>Model:</b> {data.model.name}
            </p>
          </div>
        </section>

        <div className="flex flex-col w-4/5 justify-evenly">
          <section className="flex h-60 justify-evenly">
            <div className="px-10 py-4 space-y-2 border border-black rounded-md bg-black/10">
              <p>
                <b>Status:</b> {data.status}
              </p>
              <p>
                <b>Production Rate:</b> {data.productionRate} [s]
              </p>
              <p>
                <b>Production Rate:</b> Level{' '}
                {getProductionRateLevel(
                  data.productionRate,
                  data.model.defaultRate,
                  data.model.maxRate
                )}
                .
              </p>
              <p>{hoursLabel()}</p>
            </div>
            <div className="px-10 py-4 space-y-2 border border-black rounded-md bg-black/10">
              <p>
                <b>Fault Rate:</b> {data.model.faultRate}
              </p>
              <p>
                <b>Work Rate:</b> {data.model.workBase}
              </p>
              <p>
                <b>Work Rate Range:</b> +/- {data.model.workRange}
              </p>
              <p>
                <b>Def Production Rate:</b> {data.model.defaultRate} [s]
              </p>
              <p>
                <b>Min Production Rate</b> {data.model.minRate} [s]
              </p>
              <p>
                <b>Max Production Rate</b> {data.model.maxRate} [s]
              </p>
            </div>
          </section>

          <section className="mx-auto">
            <StatusToggle machine={data} direction="row" />
          </section>
        </div>
      </div>
    </main>
  );
}
