'use client';

import { useMachineUpdate } from '@/hooks/use-machine-update';
import { useMachineStore } from '@/store';
import { Machine } from '@/types';
import clsx from 'clsx';
import { useMemo } from 'react';
import { BaseLoadingButton } from './base-loading-button';

type Props = {
  machine: Machine;
};

export const StatusToggle = ({ machine }: Props) => {
  const addMachine = useMachineStore((state) => state.addMachine);
  const { loading, doRequest } = useMachineUpdate();

  const onStatusChange = async () => {
    const updatedMachine = await doRequest(machine.serialNumber, {
      status: machine.status === 'IDLE' ? 'WORKING' : 'IDLE',
    });
    addMachine(updatedMachine);
  };

  const isWorking = useMemo(() => machine.status === 'WORKING', [machine]);

  return (
    <div className="flex flex-col mt-8 space-y-5">
      <BaseLoadingButton
        onClick={onStatusChange}
        loading={loading}
        style={clsx(
          'py-2 text-sm border rounded-md shadow-md w-40 flex justify-center',
          isWorking
            ? 'text-red-700 border-red-700 bg-red-900/10 hover:bg-red-900/30'
            : 'text-green-700 border-green-700 bg-green-900/10 hover:bg-green-900/30'
        )}
        text={`${isWorking ? 'Stop' : 'Start'} Machine`}
        loadingText={false}
      />

      <button className="w-40 py-2 text-sm border rounded-md shadow-md border-slate-400 text-slate-400 bg-slate-600/10 hover:bg-slate-600/30">
        Production rate
      </button>

      <button className="w-40 py-2 text-sm border rounded-md shadow-md border-slate-400 text-slate-400 bg-slate-600/10 hover:bg-slate-600/30">
        Report Defect
      </button>

      <button className="w-40 py-2 text-sm border rounded-md shadow-md border-slate-400 text-slate-400 bg-slate-600/10 hover:bg-slate-600/30">
        Assign Maintenance
      </button>
    </div>
  );
};
