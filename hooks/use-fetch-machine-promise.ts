import { use, useState } from 'react';

import { filterMachines } from '@/app/actions';
import { Machine, Pagination } from '@/types';
import { createPaginationUrl } from '@/lib/helpers';

export function useFetchMachinesPromise(
  promise: Promise<{ data: Machine[]; meta: Pagination }>
) {
  const machineData = use(promise);
  const [loading, setLoading] = useState(false);
  const [machines, setMachines] = useState<Machine[]>(machineData.data);
  const [pagination, setPagination] = useState<Pagination>(machineData.meta);

  const search = async (paginationUrl?: string, serialNumber?: string) => {
    setLoading(true);

    const query = createQueryString(paginationUrl, serialNumber);

    const { data, meta } = await filterMachines(query.join('&'));

    setMachines(data);
    setPagination(meta);
    setLoading(false);
  };

  const createQueryString = (paginationUrl?: string, serialNumber?: string) => {
    const query: string[] = [];

    if (paginationUrl) {
      query.push(paginationUrl);
    } else {
      const page = pagination.offset / pagination.limit + 1;
      query.push(createPaginationUrl(page, pagination.limit));
    }

    if (serialNumber) {
      query.push(`serialNumber=${serialNumber}`);
    }

    return query;
  };

  return { machines, pagination, loading, search };
}
