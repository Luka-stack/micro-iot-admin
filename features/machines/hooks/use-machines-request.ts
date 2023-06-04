import { useCallback, useEffect, useState } from 'react';
import { useMachinesActions } from '../context';

const machineUrl = 'http://localhost:5000/api/machines';

export function useMachinesRequest(): {
  loading: boolean;
  changePage: (paginationUrl: string) => Promise<void>;
  filterData: (filterUrl: string) => Promise<void>;
} {
  const dispatch = useMachinesActions();

  const [filters, setFilters] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchData = async (query: string) => {
    const response = await fetch(query);

    try {
      const data = await response.json();
      dispatch('SET_MACHINES', data);
    } catch (err) {
      console.error(err);
    }
  };

  const changePage = useCallback(
    async (paginationUrl: string) => {
      setLoading(true);

      const query = `${machineUrl}?${
        filters ? filters + '&' : ''
      }${paginationUrl}`;

      await fetchData(query);

      setLoading(false);
    },
    [filters]
  );

  const filterData = useCallback(async (filterUrl: string) => {
    setLoading(true);
    setFilters(filterUrl);

    const query = `${machineUrl}?${filterUrl}`;

    await fetchData(query);

    setLoading(false);
  }, []);

  useEffect(() => {
    changePage('limit=10&offset=0');
  }, []);

  return {
    loading,
    changePage,
    filterData,
  };
}
