import { notFound } from 'next/navigation';

import { auth } from '@/auth';
import { getRequest } from '@/lib/fetch-client';
import { HistoryTable } from './_components/HistoryTable';
import { MachineEndpoints } from '@/lib/apis';
import { MachineWithHistory } from '@/types';

type Props = {
  params: {
    serialNumber: string;
  };
};

async function fetchHistory(serialNumber: string) {
  const session = await auth();

  const response = await getRequest<{ data: MachineWithHistory }>(
    MachineEndpoints.machineHistory(serialNumber),
    {
      token: session?.accessToken,
      next: {
        revalidate: 3600,
      },
    }
  );

  if (response.hasError) {
    return null;
  }

  return response.fetchedData;
}

export default async function ServiceHistoryPage({ params }: Props) {
  const history = await fetchHistory(params.serialNumber);

  if (!history) {
    return notFound();
  }

  return <HistoryTable machine={history.data} />;
}
