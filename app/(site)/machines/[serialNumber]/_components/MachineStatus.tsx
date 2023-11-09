'use client';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import {
  BellAlertIcon,
  PowerIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline';

import { Machine } from '@/types';
import { differenceInHoursAndMin } from '@/lib/helpers';
import { useMachineUpdate } from '@/hooks/use-machine-update';

type Props = {
  machine: Machine;
};

export function MachineStatus({ machine }: Props) {
  const router = useRouter();
  const { loading, doRequest } = useMachineUpdate();

  const changeMachineStatus = async () => {
    await doRequest(machine.serialNumber, {
      status: machine.status === 'IDLE' ? 'WORKING' : 'IDLE',
    });

    router.refresh();
  };

  const hoursLabel = () => {
    const [hours, minutes] = differenceInHoursAndMin(
      new Date(machine.lastStatusUpdate)
    );

    return `${
      machine.status === 'WORKING' ? 'Working' : 'Idle'
    } hours: ${hours} [h] ${minutes} [min]`;
  };

  return (
    <section className="flex p-4 px-10 space-x-10 border rounded-md shadow-md w-fit border-white/10 shadow-black">
      <div className="flex flex-col items-center">
        <h3 className="mb-5 text-lg font-semibold tracking-wider text-center">
          Machine Status
        </h3>
        <button onClick={changeMachineStatus} disabled={loading}>
          <PowerIcon
            className={clsx(
              'h-28 hover:scale-105',
              loading && '!text-yellow-700',
              machine.status === 'WORKING'
                ? 'text-green-500 animate-pulse'
                : 'text-slate-500'
            )}
          />
        </button>
        <p className="mt-3">{hoursLabel()}</p>
      </div>

      <div className="flex flex-col justify-between">
        <button className="flex flex-col items-center text-slate-500 hover:text-slate-300">
          <BellAlertIcon className="h-12" />
          <p className="">Report defect</p>
        </button>

        <button className="flex flex-col items-center text-slate-500 hover:text-slate-300">
          <WrenchScrewdriverIcon className="h-12" />
          <p>Plan Service</p>
        </button>
      </div>
    </section>
  );
}
