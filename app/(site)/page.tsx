import { MachinesView } from '@/features/machines';
import { MachinesProvider } from '@/features/machines/context';

async function getFilters() {
  const res = await fetch('http://localhost:5000/api/misc/filters');
  return res.json();
}

export default async function Home() {
  const { data } = await getFilters();

  return (
    <MachinesProvider filters={data}>
      <main className="flex w-full xxl:overflow-x-hidden full-page">
        <MachinesView />
      </main>
    </MachinesProvider>
  );
}
