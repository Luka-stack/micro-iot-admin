import { Metadata } from 'next';
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return { title: params.serialNumber };
}

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
    if (response.code >= 500) {
      throw new Error(response.messages.join(', '));
    }

    return null;
  }

  return response.fetchedData!.data;
}

export default async function ServiceHistoryPage({ params }: Props) {
  const history = await fetchHistory(params.serialNumber);

  if (!history) {
    return notFound();
  }

  return <HistoryTable machine={history} />;
}
