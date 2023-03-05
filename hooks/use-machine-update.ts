import { useCallback, useState } from 'react';

const machineUrl = 'http://localhost:5000/api/machines';

export function useMachineUpdate() {
  const [loading, setLoading] = useState(false);

  const doRequest = useCallback(
    async (serialNumber: string, newData: { status: string }) => {
      setLoading(true);

      try {
        const response = await fetch(`${machineUrl}/${serialNumber}`, {
          method: 'PATCH',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
          body: JSON.stringify(newData),
        });

        const { data } = await response.json();
        setLoading(false);

        return data;
      } catch (err) {
        console.error(err);
      }

      setLoading(false);
    },
    []
  );

  return {
    loading,
    doRequest,
  };
}
