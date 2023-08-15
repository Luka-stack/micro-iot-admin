'use client';

import clsx from 'clsx';
import Image from 'next/image';
import { useDebounce } from 'use-debounce';
import { useCallback, useEffect, useRef, useState } from 'react';

import { BasePagination } from '@/components/ui/base-pagination';
import { MachineWorkContext } from '@/context/machine-work-context';
import { Machine, Pagination } from '@/types';
import { useFetchMachinesPromise } from '@/hooks/use-fetch-machine-promise';

type Props = {
  machinePromise: Promise<{ data: Machine[]; meta: Pagination }>;
};

export function MachineList({ machinePromise }: Props) {
  const { machines, pagination, loading, search } =
    useFetchMachinesPromise(machinePromise);

  const [serialNumber, setSerialNumber] = useSerialNumberFilter(search);

  const state = MachineWorkContext.useState();
  const actions = MachineWorkContext.useActions();

  const isSelected = (serialNumber: string) => {
    return state.find((m) => m.serialNumber === serialNumber) !== undefined;
  };

  const changePage = useCallback(
    (paginationUrl: string) => search(paginationUrl, serialNumber),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [serialNumber]
  );

  return (
    <main className="flex flex-col items-center flex-shrink-0 h-full">
      <div className="w-full px-2 mb-4">
        <input
          type="text"
          id="serialNumber"
          name="serialNumber"
          placeholder="Serial Number"
          onChange={(e) => setSerialNumber(e.target.value)}
          className="w-full px-2 py-2 text-sm rounded-lg shadow-md bg-slate-800 placeholder:text-slate-500 focus:outline-none shadow-black hover:bg-slate-700"
        />
      </div>

      <div className="flex-1 space-y-5 overflow-y-auto scrollbar-thin">
        {machines.map((machine) => (
          <button
            key={machine.serialNumber}
            onClick={() => actions({ type: 'ADD_MACHINE', payload: machine })}
            className={clsx(
              'flex items-center p-3 space-x-4 rounded-lg shadow-md cursor-pointer shadow-slate-800 hover:scale-105 w-60',
              isSelected(machine.serialNumber) && 'bg-red-500'
            )}
          >
            <Image
              src={`/${machine.type.imageUrl}`}
              alt={machine.type.name}
              width={32}
              height={32}
            />
            <h3 className="w-full">{machine.serialNumber}</h3>
          </button>
        ))}
      </div>

      <div className="">
        <BasePagination
          loading={loading}
          pagination={pagination}
          changePage={changePage}
        />
      </div>
    </main>
  );
}

function useSerialNumberFilter(
  search: (val1: undefined, serialNumber: string) => void
): [string, (val: string) => void] {
  let mounted = useRef(false);
  const inputState = useState('');
  const [serialNumber] = useDebounce(inputState[0], 1000);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }

    search(undefined, serialNumber);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serialNumber]);

  return [serialNumber, inputState[1]];
}
