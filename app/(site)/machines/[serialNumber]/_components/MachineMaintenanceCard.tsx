'use client';

import { Machine } from '@/types';
import { useMemo, useOptimistic } from 'react';
import { RaportDefectDialog } from './RaportDefectDialog';
import { PriorityDialog } from './PriorityDialog';
import { differenceInDays } from '@/lib/helpers';
import { twMerge } from 'tailwind-merge';

type Props = {
  machine: Machine;
};

export function MachineMaintenanceCard({ machine }: Props) {
  const [optimisticMachine, updateOptimistic] = useOptimistic(
    machine,
    (state, newState: Partial<Machine>) => ({ ...state, ...newState })
  );

  const canUpdateStatus =
    machine.status === 'WORKING' || machine.status === 'IDLE';

  const overtimeClassName = useMemo(() => {
    const days = differenceInDays(
      new Date(machine.maintainInfo.maintenance),
      new Date()
    );

    if (days > 10) {
      return '';
    }

    if (days > 3 && days <= 10) {
      return 'border-yellow-500 animate-pulse';
    }

    return 'border-red-500 animate-pulse';
  }, [machine]);

  return (
    <section
      className={twMerge(
        'flex flex-col items-center p-4 space-y-5 border rounded-md shadow-md w-fit border-white/10 shadow-black',
        overtimeClassName
      )}
    >
      <h3 className="mb-5 text-lg font-semibold tracking-wider text-center">
        Machine Maintenance
      </h3>

      <div className="text-center">
        <p className="text-sm text-slate-400">Next Maintenance Period is</p>
        <h4 className="font-semibold">
          {new Date(machine.maintainInfo.maintenance).toLocaleDateString()}
        </h4>
      </div>

      <div className="flex items-center justify-center space-x-5">
        <RaportDefectDialog
          disabled={!canUpdateStatus}
          machine={optimisticMachine}
          update={updateOptimistic}
        />

        <PriorityDialog machine={optimisticMachine} update={updateOptimistic} />
      </div>
    </section>
  );
}
