'use client';

import clsx from 'clsx';
import { toast } from 'sonner';
import { PowerIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

import { Machine } from '@/types';
import { updateMachine } from '@/app/actions';
import { MACHINE_STATUSES } from '@/lib/constants';
import { differenceInHoursAndMin } from '@/lib/helpers';

type Props = {
  machine: Machine;
};

export function MachineStatusCard({ machine }: Props) {
  const [pending, setPending] = useState(false);

  const changeMachineStatus = async () => {
    setPending(true);

    const updatedStatus = {
      status:
        machine.status === 'IDLE'
          ? MACHINE_STATUSES.WORKING
          : MACHINE_STATUSES.IDLE,
    };

    const response = await updateMachine(machine.serialNumber, updatedStatus);

    if (response.error) {
      toast.error('Error while updating machine status');
    }

    setPending(false);
  };

  const hoursLabel = () => {
    const [hours, minutes] = differenceInHoursAndMin(
      new Date(machine.lastStatusUpdate)
    );

    return `${
      machine.status === 'WORKING' ? 'Working' : 'Idle'
    } hours: ${hours} [h] ${minutes} [min]`;
  };

  const canUpdateStatus =
    machine.status === 'WORKING' || machine.status === 'IDLE';

  return (
    <section className="flex items-center p-4 px-10 space-x-10 border rounded-md shadow-md w-fit border-white/10 shadow-black">
      <div className="flex flex-col items-center">
        <h3 className="mb-5 text-lg font-semibold tracking-wider text-center">
          Machine Status
        </h3>
        <button
          onClick={changeMachineStatus}
          disabled={pending || !canUpdateStatus}
          className="disabled:pointer-events-none"
        >
          <PowerIcon
            className={clsx(
              'h-28 hover:scale-105',
              pending && '!text-yellow-700',
              machine.status === 'WORKING' && 'text-green-500 animate-pulse',
              machine.status === 'IDLE' && 'text-slate-500',
              machine.status === 'BROKEN' && 'text-red-500 animate-pulse',
              machine.status === 'MAINTENANCE' && 'text-orange-500'
            )}
          />
        </button>
        <p className="mt-3">{hoursLabel()}</p>
      </div>
    </section>
  );
}
