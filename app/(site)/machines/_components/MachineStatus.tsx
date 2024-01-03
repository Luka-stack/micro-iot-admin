import clsx from 'clsx';
import { useState } from 'react';
import { PowerIcon } from '@heroicons/react/24/outline';
import { useQueryClient } from '@tanstack/react-query';

import { Machine } from '@/types';
import { updateMachine } from '@/app/actions';
import { differenceInHoursAndMin } from '@/lib/helpers';

type Props = {
  machine: Machine;
  setPreviewMachine: (machine: Machine) => void;
};

export function MachineStatus({ machine, setPreviewMachine }: Props) {
  const queryClient = useQueryClient();
  const [pending, setPending] = useState(false);

  const canUpdate = machine.status === 'IDLE' || machine.status === 'WORKING';

  const changeMachineStatus = async () => {
    setPending(true);

    const response = await updateMachine(machine.serialNumber, {
      status: machine.status === 'IDLE' ? 'WORKING' : 'IDLE',
    });
    queryClient.invalidateQueries({ queryKey: ['machines'] });
    setPreviewMachine(response.data);

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

  return (
    <div className="flex flex-col items-center p-4">
      <h3 className="mb-2 font-semibold tracking-wider text-center">
        Machine Status
      </h3>
      <button onClick={changeMachineStatus} disabled={pending || !canUpdate}>
        <PowerIcon
          className={clsx(
            'h-20 hover:scale-105',
            pending && '!text-slate-500',
            machine.status === 'WORKING' && 'text-green-500 animate-pulse',
            machine.status === 'IDLE' && 'text-slate-500',
            machine.status === 'BROKEN' && 'text-red-500 animate-pulse',
            machine.status === 'MAINTENANCE' && 'text-orange-500'
          )}
        />
      </button>
      <p className="mt-3 text-sm whitespace-nowrap">{hoursLabel()}</p>
    </div>
  );
}
