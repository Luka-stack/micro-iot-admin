import { AnalyserEndpoints } from '@/lib/apis';
import { getRequest } from '@/lib/fetch-client';
import { Statistics } from '@/types';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

async function getStatistics(serialNumber: string, token?: string) {
  const response = await getRequest<{ data: Statistics }>(
    AnalyserEndpoints.statistics(serialNumber),
    {
      token,
    }
  );

  if (response.hasError) {
    throw new Error(response.messages.join(', '), {
      cause: response.code,
    });
  }

  return response.fetchedData!.data;
}

export function useStatistics(serialNumber: string) {
  const { data: session } = useSession();

  const { isPending, data, isError, error } = useQuery({
    queryKey: ['statistics', serialNumber, session?.accessToken],
    queryFn: () => getStatistics(serialNumber, session?.accessToken),
    enabled: !!session?.accessToken,
    placeholderData: keepPreviousData,
    refetchOnMount: false,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    retry(failureCount, error) {
      if (error.cause === 404 || error.cause === 401) {
        return false;
      }

      return failureCount < 3;
    },
    // refetchInterval: 60000,
  });

  return {
    isPending,
    data,
    isError,
    error,
  };
}
