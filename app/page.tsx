import { MachinesView } from '@/components/home/machines-view';
import { SidebarNavigation } from '@/components/home/sidebar-navigation';

async function getData() {
  const machines = await fetch('http://localhost:5000/api/machines?limit=10', {
    next: { revalidate: 60 },
  });
  const filters = await fetch('http://localhost:5000/api/misc/filters');

  const [machinesResponse, producentsResponse] = await Promise.all([
    machines,
    filters,
  ]);

  return Promise.all([machinesResponse.json(), producentsResponse.json()]);
}

export default async function Home() {
  const [machines, filters] = await getData();

  return (
    <main className="flex h-full">
      <SidebarNavigation />

      <MachinesView data={machines} filters={filters.data} />
    </main>
  );
}
