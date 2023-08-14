'use client';

import { Filters } from '@/types';
import { useMachinesRequest } from './hooks/use-machines-request';
import { MachinesSearch } from '@/features/machines/components/MachinesSearch';
import { Preview as MachinePreview } from './components/MachinePreview';
import { BasePagination } from '@/components/ui/base-pagination';
import { MachinesTable } from './components/MachinesTable';
import { useMachinesStore } from './context';

type Props = {
  filters: Filters;
};

export function MachinesView({ filters }: Props) {
  const { pagination } = useMachinesStore();
  const { loading, changePage, filterData } = useMachinesRequest();

  return (
    <main className="flex w-full">
      <section className="flex w-full">
        <MachinesSearch
          filters={filters}
          loading={loading}
          filterData={filterData}
        />

        <div className="flex flex-col w-full p-4">
          <MachinesTable />

          <BasePagination
            pagination={pagination}
            loading={loading}
            changePage={changePage}
          />
        </div>
      </section>

      <MachinePreview />
    </main>
  );
}
