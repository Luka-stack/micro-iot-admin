import { MachinesView } from '@/components/home/machines-view';

async function getMachines() {
  const res = await fetch('http://localhost:5000/api/machines?limit=10', {
    cache: 'no-store',
  });
  return res.json();
}

async function getFilters() {
  const res = await fetch('http://localhost:5000/api/misc/filters');
  return res.json();
}

export default async function Home() {
  const machinesData = getMachines();
  const filtersData = getFilters();

  const [machines, filters] = await Promise.all([machinesData, filtersData]);

  return <MachinesView data={machines} filters={filters.data} />;
}
