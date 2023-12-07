'use client';

import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';

import { MACHINE_API } from '@/lib/apis';
import { differenceInHoursAndMin } from '@/lib/helpers';

type Props = {
  serialNumber: string;
};

async function getMachine(serialNumber: string) {
  const response = await fetch(`${MACHINE_API}/${serialNumber}`);

  if (!response.ok) {
    throw new Error('Request failed');
  }

  return response.json();
}

export function MachineDetails({ serialNumber }: Props) {
  const {
    isPending,
    isError,
    data: machine,
  } = useQuery({
    queryKey: ['machine-detail', serialNumber],
    queryFn: () => getMachine(serialNumber),
  });

  if (isPending) {
    return <MachineDetailsSkeleton />;
  }

  if (isError) {
    // TODO Error Page
    return <p>Error</p>;
  }

  const [hours, minutes] = differenceInHoursAndMin(
    new Date(machine.data.lastStatusUpdate)
  );

  return (
    <div className="flex items-center justify-around">
      <Image
        src={`/${machine.data.type.imageUrl}`}
        alt="Machine"
        height={112}
        width={112}
      />

      <section className="space-y-2">
        <p>
          <b>Status:</b> {machine.data.status}
        </p>
        <p>
          <b>Serial Number:</b> {machine.data.serialNumber}
        </p>
      </section>

      <section className="space-y-2">
        <p>
          <b>Production Rate:</b>
          {` ${machine.data.productionRate} [s]`}
        </p>
        <p>
          <b>
            {machine.data.status === 'WORKING'
              ? 'Working hours: '
              : 'Idle hours: '}
          </b>
          {`${hours} [h] ${minutes} [min]`}
        </p>
      </section>

      <section className="space-y-2">
        <p>
          <b>Work Rate:</b> {machine.data.model.workBase}
        </p>
        <p>
          <b>Work Rate Range:</b> +/- {machine.data.model.workRange}
        </p>
      </section>

      <section className="space-y-2">
        <p>
          <b>Producent:</b> {machine.data.producent}
        </p>
      </section>

      <section className="space-y-2">
        <p>
          <b>Type:</b> {machine.data.type.name}
        </p>
        <p>
          <b>Model:</b> {machine.data.model.name}
        </p>
      </section>
    </div>
  );
}

function MachineDetailsSkeleton() {
  return (
    <div className="flex items-center justify-around animate-pulse">
      <div className="rounded-md w-28 aspect-square bg-slate-700" />

      <div className="space-y-7">
        <div className="h-3 rounded-md w-52 bg-slate-700" />
        <div className="h-3 rounded-md w-52 bg-slate-700" />
      </div>

      <div className="space-y-7">
        <div className="h-3 rounded-md w-52 bg-slate-700" />
        <div className="h-3 rounded-md w-52 bg-slate-700" />
      </div>

      <div className="space-y-7">
        <div className="h-3 rounded-md w-52 bg-slate-700" />
        <div className="h-3 rounded-md w-52 bg-slate-700" />
      </div>

      <div className="space-y-7">
        <div className="h-3 rounded-md w-52 bg-slate-700" />
        <div className="h-3 rounded-md w-52 bg-slate-700" />
      </div>

      <div className="space-y-7">
        <div className="h-3 rounded-md w-52 bg-slate-700" />
        <div className="h-3 rounded-md w-52 bg-slate-700" />
      </div>
    </div>
  );
}
