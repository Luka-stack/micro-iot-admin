import { MiscEndpoints } from '@/lib/apis';
import { Filters } from '@/types';
import { MachinesView } from './machines/_components/MachinesView';

async function fetchFilters(): Promise<{ data: Filters }> {
  const response = await fetch(MiscEndpoints.filters);

  if (!response.ok) {
    throw new Error("Couldn't load filters");
  }

  return response.json();
}

export default async function Home() {
  const { data } = await fetchFilters();

  return <MachinesView filters={data} />;
}
