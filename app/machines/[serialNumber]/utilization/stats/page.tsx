import Image from 'next/image';
import { notFound } from 'next/navigation';

type Statistics = {
  average: number;
  today: number;
  firstSevenDays: number;
  firstMonth: number;
  quater: number;
};

async function getStatistics(
  serialNumber: string
): Promise<{ data: Statistics }> {
  const res = await fetch(
    `http://localhost:7000/api/analyser/f03afd24-b055/statistics`,
    {
      next: { revalidate: 3600 },
    }
  );

  return res.json();
}

export default async function MachineUtilizationStatsPage({
  params,
}: {
  params: { serialNumber: string };
}) {
  const { data } = await getStatistics(params.serialNumber);

  if (!data) {
    return notFound();
  }

  return (
    <main className="flex">
      <section className="flex flex-col w-2/5 space-y-5">
        <div className="relative self-center w-60 h-72">
          <Image src={`/machine1.png`} alt="Machine" fill />
        </div>

        <div className="self-center space-y-2">
          <p>
            <b>Machine:</b> 4c48d884-b055
          </p>
          <p>
            <b>Model:</b> fnc-XGX
          </p>
          <p>
            <b>Type:</b> Grabers
          </p>
          <p>
            <b>Producent:</b> Fanuc
          </p>
        </div>
      </section>

      <section className="flex flex-col items-center w-full space-y-5">
        <h1 className="text-2xl font-medium">Utilization Summary</h1>
        <div className="flex flex-col w-full h-full py-4 border border-black bg-black/10">
          <div className="self-center space-y-3">
            <p>Average per day: {data.average / 60} [min]</p>
            <p>Today: {data.today / 60} [min] </p>
            <p>Last 7 days: {data.firstSevenDays / 60} [min] </p>
            <p>Last month: {data.firstMonth / 60} [min] </p>
            <p>Last quarter: {data.quater / 60} [min]</p>
          </div>
        </div>
      </section>
    </main>
  );
}
