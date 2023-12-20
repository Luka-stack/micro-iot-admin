'use client';

import { Filters, Machine, Pagination } from '@/types';
import { MachinesSearchSidebar } from './MachinesSearchSidebar';
import { createPaginationUrl } from '@/lib/helpers';
import { MachineEndpoints } from '@/lib/apis';
import { useCallback, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { MachinesTable } from './MachinesTable';
import { BasePagination } from '@/components/ui/BasePagination';
import { MachinePreview } from './MachinePreview';

type Props = {
  filters: Filters;
};

async function fetchMachines(
  pageNumber: number,
  filterUrl: string
): Promise<{ meta: Pagination; data: Machine[] }> {
  const paginationUrl = createPaginationUrl(pageNumber, 10);
  const url = filterUrl ? `${filterUrl}&${paginationUrl}` : paginationUrl;

  const response = await fetch(MachineEndpoints.filter(url));

  if (!response.ok) {
    throw new Error();
  }

  return response.json();
}

export function MachinesView({ filters }: Props) {
  const [pageNumber, setPageNumber] = useState(1);
  const [filterUrl, setFilterUrl] = useState('');
  const [machinePreview, setMachinePreview] = useState<{
    machine: Machine | null;
    open: boolean;
  }>({ machine: null, open: false });

  const { isPending, data } = useQuery({
    queryKey: ['machines', pageNumber, filterUrl],
    queryFn: () => fetchMachines(pageNumber, filterUrl),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const handleShowPreview = useCallback((machine: Machine) => {
    setMachinePreview({ machine, open: true });
  }, []);

  return (
    <div className="flex flex-1 space-x-4 full-page">
      <MachinesSearchSidebar
        pending={isPending}
        {...filters}
        setFilters={setFilterUrl}
      />

      {isPending ? (
        <div>Loading</div>
      ) : (
        <div className="flex flex-col flex-1 space-y-4">
          <div className="flex flex-1 overflow-hidden">
            <MachinesTable
              machines={data!.data}
              updatePreview={handleShowPreview}
            />
          </div>

          <BasePagination pagination={data!.meta} changePage={setPageNumber} />
        </div>
      )}

      <MachinePreview {...machinePreview} updatePreview={setMachinePreview} />
    </div>
  );
}
