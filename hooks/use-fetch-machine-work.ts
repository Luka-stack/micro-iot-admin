import { ANALYSER_API } from '@/lib/apis';
import { MachineWork } from '@/types';
import { useEffect, useState } from 'react';

export function useFetchMachineWork(serialNumber: string) {
  const [workData, setWorkData] = useState<MachineWork[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);

    const data = await fetch(`${ANALYSER_API}/${serialNumber}/work`, {
      cache: 'no-cache',
    });
    const response: MachineWork[] = await data.json();

    setWorkData(
      response.map((machine) => ({
        timestamp: new Date(machine.timestamp).toLocaleString(),
        work: parseFloat(machine.work.toFixed(2)),
      }))
    );

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serialNumber]);

  return { workData, loading };
}
