import { Machine, MachinesResponse } from '@/types';
import { useCallback, useState } from 'react';

const machineUrl = 'http://localhost:5000/api/machines';

export function useMachinesRequest(data: MachinesResponse): {
  machines: MachinesResponse;
  loading: boolean;
  changePage: (paginationUrl: string) => Promise<void>;
  filterData: (filterUrl: string) => Promise<void>;
} {
  const [machines, setMachines] = useState(data);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState('');

  const changePage = useCallback(
    async (paginationUrl: string) => {
      setLoading(true);

      const query = `${machineUrl}?${
        filters ? filters + '&' : ''
      }${paginationUrl}`;

      await fetchData(query);
    },
    [filters]
  );

  const filterData = useCallback(async (filterUrl: string) => {
    setLoading(true);
    setFilters(filterUrl);

    const query = `${machineUrl}?${filterUrl}`;

    await fetchData(query);
  }, []);

  const fetchData = async (query: string) => {
    const response = await fetch(query);

    try {
      const data = await response.json();
      setMachines(data);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return {
    machines,
    loading,
    changePage,
    filterData,
  };
}
