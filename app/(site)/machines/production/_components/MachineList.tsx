'use client';

import clsx from 'clsx';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { useEffect, useState } from 'react';

import { MACHINE_API } from '@/lib/apis';
import { BasePagination } from '@/components/ui/BasePagination';
import { LoadingIndicator } from '@/components/ui/LoadingIndicator';
import { Machine, Pagination } from '@/types';
import { createPaginationUrl } from '@/lib/helpers';
import { useProductionContext } from './ProductionProvider';

type Props = {
  machines: { data: Machine[]; meta: Pagination };
};

async function getData(
  pageNumber: number,
  serialNumber: string
): Promise<{ data: Machine[]; meta: Pagination }> {
  const paginationUrl = createPaginationUrl(pageNumber, 10);
  const filter = `serialNumber=${serialNumber}&`;

  const response = await fetch(
    `${MACHINE_API}?${serialNumber ? filter : ''}${paginationUrl}`
  );

  return await response.json();
}

export function MachineList({ machines }: Props) {
  const [_, setState] = useProductionContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [input, setInput] = useState('');
  const [filter] = useDebounce(input, 500);

  const { isPending, data } = useQuery({
    queryKey: ['machines', currentPage, filter],
    queryFn: () => getData(currentPage, filter),
    initialData: machines,
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    if (!data.data.length) return;

    setState((prev) => {
      if (!prev.length) return prev;

      const newSelected = [...prev];

      data.data.forEach((machine) => {
        if (machine.serialNumber === newSelected[0].serialNumber) {
          newSelected[0] = machine;
        } else if (
          newSelected.length > 1 &&
          machine.serialNumber === newSelected[1].serialNumber
        ) {
          newSelected[1] = machine;
        }
      });

      return newSelected;
    });
  }, [data, setState]);

  return (
    <main className="flex flex-col items-center flex-shrink-0 p-4 border rounded-md main-gradient border-white/10 w-72">
      <div className="w-full pb-5 mb-5 border-b border-white/10">
        <input
          type="text"
          id="serialNumber"
          name="serialNumber"
          placeholder="Serial Number"
          onChange={(e) => setInput(e.target.value)}
          className="w-full px-2 py-2 text-sm rounded-lg shadow-md bg-slate-800 placeholder:text-slate-500 focus:outline-none shadow-black hover:bg-slate-700"
        />
      </div>

      {isPending ? (
        <LoadingIndicator className="w-32" />
      ) : (
        <>
          <div className="flex-1 py-2 space-y-5 overflow-y-auto scrollbar-none">
            {data.data.map((machine) => (
              <MachineListCard key={machine.serialNumber} machine={machine} />
            ))}
          </div>

          <BasePagination
            pagination={data.meta}
            classes="pt-4"
            changePage={setCurrentPage}
          />
        </>
      )}
    </main>
  );
}

function MachineListCard({ machine }: { machine: Machine }) {
  const [state, setState] = useProductionContext();

  const handleSelect = () => {
    setState((prevState) => {
      const newMachines = state.filter(
        (m) => m.serialNumber !== machine.serialNumber
      );

      if (newMachines.length !== state.length) {
        return newMachines;
      }

      if (prevState.length > 1) {
        newMachines.shift();
      }

      newMachines.push(machine);

      return newMachines;
    });
  };

  const isSelected =
    state.find((m) => m.serialNumber === machine.serialNumber) !== undefined;

  return (
    <button
      key={machine.serialNumber}
      onClick={handleSelect}
      className={clsx(
        'flex items-center p-2 space-x-2 rounded-lg shadow-sm border border-black/10 cursor-pointer hover:bg-slate-900/30 w-60 pl-4 shadow-black mx-2',
        isSelected && '!bg-slate-900/50'
      )}
    >
      <div className="relative h-12 aspect-square">
        <Image src={`/${machine.type.imageUrl}`} alt={machine.type.name} fill />
      </div>
      <h3 className="w-full">{machine.serialNumber}</h3>
    </button>
  );
}
