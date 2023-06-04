import { MachineUtilization } from '@/types';
import { notFound } from 'next/navigation';
import { MahcineUtilizationTab } from './MachineUtilizationTab';

async function getUtilization(
  serialNumber: string
): Promise<{ data: MachineUtilization[] }> {
  const todayDate = new Date().toISOString().slice(0, 10);
  const sixDaysAgo = new Date();
  sixDaysAgo.setDate(sixDaysAgo.getDate() - 6);
  const sixDaysAgoDate = sixDaysAgo.toISOString().slice(0, 10);

  const response = await fetch(
    `http://localhost:7000/api/analyser/${serialNumber}/utilization?${new URLSearchParams(
      { fromDate: sixDaysAgoDate, toDate: todayDate }
    )}`,
    { next: { revalidate: 3600 } }
  );

  return response.json();
}

export default async function MachineUtilizationPage({
  params,
}: {
  params: { serialNumber: string };
}) {
  const { data } = await getUtilization(params.serialNumber);

  if (!data) {
    return notFound();
  }

  return (
    <MahcineUtilizationTab serialNumber={params.serialNumber} data={data} />
  );
}
