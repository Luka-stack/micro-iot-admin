'use client';
import { useState } from 'react';

import { useMachinesRequest } from '@/hooks/use-machines-request';
import { Filters, Machine, MachinesResponse } from '@/types';
import { BasePagination } from '../ui/base-pagination';
import { MachinePreview } from './machine-preview';
import { MachinesSearch } from './machines-search';
import { MachinesTable } from './machines-table';

type Props = {
  data: MachinesResponse;
  filters: Filters;
};

export const MachinesView = ({ data, filters }: Props) => {
  const { machines, loading, changePage, filterData } =
    useMachinesRequest(data);

  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);

  return (
    <main className="flex w-full mt-4 h-5/6">
      <section className="flex w-full mx-4 border divide-x-2 rounded-lg shadow-md shadow-black border-slate-800 divide-slate-800">
        <MachinesSearch
          filters={filters}
          loading={loading}
          filterData={filterData}
        />

        <div className="flex flex-col w-full">
          <MachinesTable
            machines={machines.data}
            selectedMachine={selectedMachine}
            selectMachine={setSelectedMachine}
          />

          <div className="h-16 pb-4 pr-4">
            <BasePagination
              pagination={machines.meta}
              loading={loading}
              changePage={changePage}
            />
          </div>
        </div>
      </section>

      {selectedMachine ? (
        <MachinePreview
          machine={selectedMachine}
          close={() => setSelectedMachine(null)}
        />
      ) : null}
    </main>
  );
};
