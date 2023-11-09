import { MACHINE_API } from '@/lib/apis';
import { useMachineStore } from '@/store';
import { useCallback, useState } from 'react';

export function useMachinesRequest(): {
  loading: boolean;
  changePage: (paginationUrl: string) => Promise<void>;
  filterData: (filterUrl: string) => Promise<void>;
} {
  const setMachines = useMachineStore((state) => state.setMachines);

  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState('');

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

  const changePage = useCallback(
    async (paginationUrl: string) => {
      setLoading(true);

      const query = `${MACHINE_API}?${
        filters ? filters + '&' : ''
      }${paginationUrl}`;

      await fetchData(query);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filters]
  );

  const filterData = useCallback(async (filterUrl: string) => {
    setLoading(true);
    setFilters(filterUrl);

    const query = `${MACHINE_API}?${filterUrl}`;

    await fetchData(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    loading,
    changePage,
    filterData,
  };
}
