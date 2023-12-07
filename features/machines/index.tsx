'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { MACHINE_API } from '@/lib/apis';
import { MachinesTable } from './components/MachinesTable';
import { BasePagination } from '@/components/ui/BasePagination';
import { MachinePreview } from './components/MachinePreview';
import { MachinesSearch } from './components/MachinesSearch';
import { createPaginationUrl } from '@/lib/helpers';
import { useMachinesActions, useMachinesStore } from './context';

async function fetchMachines(
  pageNumber: number,
  pageLimit: number,
  filters: string
) {
  const paginatinUrl = createPaginationUrl(pageNumber, pageLimit);

  const response = await fetch(
    `${MACHINE_API}?${filters ? filters + '&' : ''}${paginatinUrl}`
  );

  if (!response.ok) {
    throw new Error();
  }

  return response.json();
}

export function MachinesView() {
  const dispatch = useMachinesActions();
  const { pageNumber, pageLimit, currentFilters } = useMachinesStore();

  const { isPending, data } = useQuery({
    queryKey: ['machines', pageNumber, pageLimit, currentFilters],
    queryFn: () => fetchMachines(pageNumber, pageLimit, currentFilters),
    placeholderData: keepPreviousData,
  });

  return (
    <section className="flex w-full space-x-4">
      <MachinesSearch pending={isPending} />

      {isPending ? (
        <TableSkeleton />
      ) : (
        <div className="flex flex-col flex-1 overflow-hidden border rounded-md border-white/10">
          <MachinesTable machines={data.data} />

          <BasePagination
            pagination={data.meta}
            classes="p-2"
            changePage={() => dispatch('SET_PAGINATION', { pageNumber })}
          />
        </div>
      )}

      <MachinePreview />
    </section>
  );
}

function TableSkeleton() {
  return (
    <div className="flex flex-col flex-1 overflow-hidden border rounded-md border-white/10">
      <div className="flex space-x-16 justify-evenly main-gradient">
        <div className="px-6 py-2 font-medium text-center uppercase w-14" />
        <div className="px-6 py-2 font-medium text-center uppercase w-fit">
          Serial Number
        </div>
        <div className="px-6 py-2 font-medium text-center uppercase w-fit">
          Producent
        </div>
        <div className="px-6 py-2 font-medium text-center uppercase w-fit">
          Type
        </div>
        <div className="px-6 py-2 font-medium text-center uppercase w-fit">
          Model
        </div>
        <div className="px-6 py-2 font-medium text-center uppercase w-fit">
          Rate [s]
        </div>
        <div className="px-6 py-2 font-medium text-center uppercase w-fit">
          Status
        </div>
      </div>

      <div className="divide-y divide-white/10">
        {[1, 2, 3, 4, 5].map((id) => (
          <div
            key={id}
            className="flex items-center py-4 space-x-16 animate-pulse justify-evenly"
          >
            <div className="px-6 h-14 bg-slate-700 aspect-square" />
            <div className="w-32 h-5 px-6 rounded bg-slate-700" />
            <div className="w-32 h-5 px-6 rounded bg-slate-700" />
            <div className="w-20 h-5 px-6 rounded bg-slate-700" />
            <div className="w-20 h-5 px-6 rounded bg-slate-700" />
            <div className="w-20 h-5 px-6 rounded bg-slate-700" />
            <div className="w-20 h-5 px-6 rounded bg-slate-700" />
          </div>
        ))}
      </div>
    </div>
  );
}
