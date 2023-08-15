import { MachinesView } from '@/features/machines';
import { MachinesProvider } from '@/features/machines/context';

async function getFilters() {
  const res = await fetch('http://localhost:5000/api/misc/filters', {
    cache: 'force-cache',
  });
  return res.json();
}

export default async function Home() {
  const filters = await getFilters();

  return (
    <MachinesProvider>
      <MachinesView filters={filters.data} />
    </MachinesProvider>
  );
}
