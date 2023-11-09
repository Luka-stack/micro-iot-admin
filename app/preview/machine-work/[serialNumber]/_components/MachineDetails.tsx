'use client';

import Image from 'next/image';
import { use } from 'react';

import { Machine } from '@/types';
import { differenceInHoursAndMin } from '@/lib/helpers';

type Props = {
  dataPromise: Promise<{ data: Machine }>;
};

export function MachineDetails({ dataPromise }: Props) {
  const { data } = use(dataPromise);

  const [hours, minutes] = differenceInHoursAndMin(
    new Date(data.lastStatusUpdate)
  );

  return (
    <div className="flex items-center justify-around">
      <Image
        src={`/${data.type.imageUrl}`}
        alt="Machine"
        height={112}
        width={112}
      />

      <section className="space-y-2">
        <p>
          <b>Status:</b> {data.status}
        </p>
        <p>
          <b>Serial Number:</b> {data.serialNumber}
        </p>
      </section>

      <section className="space-y-2">
        <p>
          <b>Production Rate:</b>
          {` ${data.productionRate} [s]`}
        </p>
        <p>
          <b>
            {data.status === 'WORKING' ? 'Working hours: ' : 'Idle hours: '}
          </b>
          {`${hours} [h] ${minutes} [min]`}
        </p>
      </section>

      <section className="space-y-2">
        <p>
          <b>Work Rate:</b> {data.model.workBase}
        </p>
        <p>
          <b>Work Rate Range:</b> +/- {data.model.workRange}
        </p>
      </section>

      <section className="space-y-2">
        <p>
          <b>Producent:</b> {data.producent}
        </p>
      </section>

      <section className="space-y-2">
        <p>
          <b>Type:</b> {data.type.name}
        </p>
        <p>
          <b>Model:</b> {data.model.name}
        </p>
      </section>
    </div>
  );
}
