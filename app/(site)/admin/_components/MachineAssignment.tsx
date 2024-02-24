'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { getRequest } from '@/lib/fetch-client';
import { ClientError } from '@/components/ClientError';
import { TableFilters } from './TableFilters';
import { MachineTable } from './MachineTable';
import { BasePagination } from '@/components/ui/BasePagination';
import { MachineEndpoints } from '@/lib/apis';
import { createPaginationUrl } from '@/lib/helpers';
import { Filters, Machine, Pagination } from '@/types';

type Props = {
  filters: Filters;
  employees: string[];
};

async function fetchMachines(
  pageNumber: number,
  filterUrl: string,
  token?: string
) {
  const paginationUrl = createPaginationUrl(pageNumber, 10);
  const url = filterUrl ? `${filterUrl}&${paginationUrl}` : paginationUrl;

  const response = await getRequest<{ meta: Pagination; data: Machine[] }>(
    MachineEndpoints.machines(url),
    { token }
  );

  if (response.hasError) {
    throw new Error('Failed to fetch machines', {
      cause: response.code,
    });
  }

  return response.fetchedData!;
}

export function MachineAssignment({ filters, employees }: Props) {
  const { data: session } = useSession();
  const [pageNumber, setPageNumber] = useState(1);
  const [filterUrl, setFilterUrl] = useState('');

  const { isPending, isError, data } = useQuery({
    queryKey: ['machines', pageNumber, filterUrl, session?.accessToken],
    queryFn: () => fetchMachines(pageNumber, filterUrl, session?.accessToken),
    enabled: !!session?.accessToken,
    placeholderData: keepPreviousData,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  if (isError) {
    return <ClientError />;
  }

  return (
    <div className="flex flex-col flex-1 space-y-4">
      <TableFilters
        producents={filters.producents}
        types={filters.types}
        models={filters.models}
        employees={employees}
        isPending={isPending}
        setFilters={setFilterUrl}
      />

      <div className="flex flex-1 w-full overflow-hidden">
        <MachineTable
          machines={data?.data}
          employees={employees}
          pending={isPending}
        />
      </div>

      {data?.meta ? (
        <BasePagination pagination={data.meta} changePage={setPageNumber} />
      ) : null}
    </div>
  );
}
