'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { TableFilters } from './TableFilters';
import { MachineTable } from './MachineTable';
import { BasePagination } from '@/components/ui/BasePagination';
import { MachineEndpoints } from '@/lib/apis';
import { createPaginationUrl } from '@/lib/helpers';
import { Filters, Machine, Pagination, User } from '@/types';
import { useSession } from 'next-auth/react';

type Props = {
  filters: Filters;
  employees: string[];
};

async function fetchMachines(
  pageNumber: number,
  filterUrl: string,
  token?: string
): Promise<{ meta: Pagination; data: Machine[] }> {
  const paginationUrl = createPaginationUrl(pageNumber, 10);
  const url = filterUrl ? `${filterUrl}&${paginationUrl}` : paginationUrl;

  const response = await fetch(MachineEndpoints.filter(url), {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error();
  }

  return response.json();
}

export function MachineAssignment({ filters, employees }: Props) {
  const { data: session } = useSession();
  const [pageNumber, setPageNumber] = useState(1);
  const [filterUrl, setFilterUrl] = useState('');

  const { isPending, data } = useQuery({
    queryKey: ['machines', pageNumber, filterUrl, session?.accessToken],
    queryFn: () => fetchMachines(pageNumber, filterUrl, session?.accessToken),
    enabled: !!session?.accessToken,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return (
    <div className="flex flex-col flex-1 space-y-4">
      <TableFilters
        producents={filters.producents}
        types={filters.types}
        models={filters.models}
        setFilters={setFilterUrl}
      />

      {isPending ? (
        <div>Loading</div>
      ) : (
        <>
          <div className="flex flex-1 w-full overflow-hidden">
            <MachineTable machines={data!.data} employees={employees} />
          </div>

          <BasePagination pagination={data!.meta} changePage={setPageNumber} />
        </>
      )}
    </div>
  );
}