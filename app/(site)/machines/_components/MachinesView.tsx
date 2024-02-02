'use client';

import { useSession } from 'next-auth/react';
import { useCallback, useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { getRequest } from '@/lib/fetch-client';
import { MachinesTable } from './MachinesTable';
import { MachinePreview } from './MachinePreview';
import { BasePagination } from '@/components/ui/BasePagination';
import { MachineEndpoints } from '@/lib/apis';
import { createPaginationUrl } from '@/lib/helpers';
import { MachinesSearchSidebar } from './MachinesSearchSidebar';
import { Filters, Machine, Pagination } from '@/types';

type Props = {
  filters: Filters;
};

async function fetchMachines(
  pageNumber: number,
  filterUrl: string,
  token?: string
): Promise<{ meta: Pagination; data: Machine[] }> {
  const paginationUrl = createPaginationUrl(pageNumber, 10);
  const url = filterUrl ? `${filterUrl}&${paginationUrl}` : paginationUrl;

  const response = await getRequest<{ meta: Pagination; data: Machine[] }>(
    MachineEndpoints.machines(url),
    {
      token,
    }
  );

  if (response.hasError) {
    throw new Error("Couldn't fetch machines");
  }

  return response.fetchedData!;
}

export function MachinesView({ filters }: Props) {
  const { data: session } = useSession();

  const [pageNumber, setPageNumber] = useState(1);
  const [filterUrl, setFilterUrl] = useState('');
  const [machinePreview, setMachinePreview] = useState<{
    machine: Machine | null;
    open: boolean;
  }>({ machine: null, open: false });

  const { isPending, data } = useQuery({
    queryKey: ['machines', pageNumber, filterUrl, session?.accessToken],
    queryFn: () => fetchMachines(pageNumber, filterUrl, session?.accessToken),
    enabled: !!session?.accessToken,
    placeholderData: keepPreviousData,
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
        {...filters}
        pending={isPending}
        setFilters={setFilterUrl}
      />

      <div className="flex flex-col flex-1 space-y-4">
        <div className="flex flex-1 overflow-hidden">
          <MachinesTable
            pending={isPending}
            machines={data?.data}
            updatePreview={handleShowPreview}
          />
        </div>

        {data?.meta ? (
          <BasePagination pagination={data.meta} changePage={setPageNumber} />
        ) : null}
      </div>

      <MachinePreview {...machinePreview} updatePreview={setMachinePreview} />
    </div>
  );
}
