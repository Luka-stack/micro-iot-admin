import Image from 'next/image';

import { ManagingSection } from '@/components/machines/overview/managing-section';
import { PropertyTable } from '@/components/machines/overview/property-table';

async function getMachine(serialNumber: string) {
  const res = await fetch(
    `http://localhost:5000/api/machines/${serialNumber}`,
    {
      next: { revalidate: 3600 },
    }
  );

  return res.json();
}

export default async function Machines({
  params,
}: {
  params: { serialNumber: string };
}) {
  const { data } = await getMachine(params.serialNumber);

  return (
    <main className="flex flex-col w-full p-4">
      <div className="flex justify-evenly">
        <section className="w-1/4 max-w-xs">
          <div className="w-full p-5 border rounded-md shadow-md h-72 shadow-black border-slate-800">
            <div className="relative w-full h-full">
              <Image src={`/${data.imageUrl}`} alt="Machine Image" fill />
            </div>
          </div>
        </section>

        <PropertyTable
          serialNumber={data.serialNumber}
          producent={data.producent}
          model={data.model}
          type={data.type}
          status={data.status}
          startedAt={data.startedAt}
        />
      </div>

      <div className="w-full h-0.5 bg-slate-800 my-14"></div>

      <ManagingSection
        status={data.status}
        productionRate={data.productionRate}
      />
    </main>
  );
}
