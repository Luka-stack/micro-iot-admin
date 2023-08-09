'use client';

import Image from 'next/image';

import { Machine } from '@/types';
import { MachineWorkContext } from '@/context/machine-work-context';
import clsx from 'clsx';

type Props = {
  machines: Machine[];
};

export function MachineList({ machines }: Props) {
  const state = MachineWorkContext.useState();
  const actions = MachineWorkContext.useActions();

  const isSelected = (serialNumber: string) => {
    return state.find((m) => m.serialNumber === serialNumber) !== undefined;
  };

  return (
    <main className="flex-shrink-0 h-full p-2 space-y-5 overflow-y-auto scrollbar-thin">
      {machines.map((machine) => (
        <button
          key={machine.serialNumber}
          onClick={() => actions({ type: 'ADD_MACHINE', payload: machine })}
          className={clsx(
            'flex items-center py-3 space-x-4 rounded-lg shadow-md cursor-pointer px-7 shadow-slate-800 hover:scale-105',
            isSelected(machine.serialNumber) && 'bg-red-500'
          )}
        >
          <Image
            src={`/${machine.type.imageUrl}`}
            alt={machine.type.name}
            width={30}
            height={30}
          />
          <h3>{machine.serialNumber}</h3>
        </button>
      ))}
    </main>
  );
}
