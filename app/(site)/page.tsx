import { auth } from '@/auth';
import { Filters } from '@/types';
import { getRequest } from '@/lib/fetch-client';
import { MachinesView } from './machines/_components/MachinesView';
import { MiscEndpoints } from '@/lib/apis';

async function fetchFilters(): Promise<Filters> {
  const session = await auth();

  const response = await getRequest<{ data: Filters }>(MiscEndpoints.filters, {
    token: session?.accessToken,
  });

  if (response.hasError) {
    throw new Error("Couldn't fetch filters");
  }

  return response.fetchedData!.data;
}

export default async function Home() {
  const filters = await fetchFilters();

  return <MachinesView filters={filters} />;
}
