import { AnalyserEndpoints } from '@/lib/apis';
import { getRequest } from '@/lib/fetch-client';
import { MachineUtilization } from '@/types';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

async function getUtilization(
  serialNumber: string,
  from: Date,
  to: Date,
  token?: string
) {
  const query = new URLSearchParams({
    fromDate: from.toISOString().slice(0, 10),
    toDate: to.toISOString().slice(0, 10),
  }).toString();

  const response = await getRequest<{ data: MachineUtilization[] }>(
    AnalyserEndpoints.utilization(serialNumber, query),
    {
      token,
    }
  );

  if (response.hasError) {
    throw new Error("Couldn't fetch utilization");
  }

  return response.fetchedData!.data;
}

export function useUtilization(
  serialNumber: string,
  searchDate: { from: Date; to: Date }
) {
  const { data: session } = useSession();

  const { isPending, isError, data, error } = useQuery({
    queryKey: [
      'machine-utilization',
      serialNumber,
      searchDate.from,
      searchDate,
      session?.accessToken,
    ],
    queryFn: () =>
      getUtilization(
        serialNumber,
        searchDate.from,
        searchDate.to,
        session?.accessToken
      ),
    enabled: !!session?.accessToken,
    placeholderData: keepPreviousData,
    refetchOnMount: false,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    // refetchInterval: 60000,
    retry(failureCount, error) {
      if (error.cause === 404 || error.cause === 401) {
        return false;
      }

      return failureCount < 3;
    },
  });

  return {
    isPending,
    isError,
    data,
    error,
  };
}
