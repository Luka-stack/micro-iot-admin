import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MachineInfo } from './_components/MachineInfo';
import { MachineStatus } from './_components/MachineStatus';
import { MachineProduction } from './_components/MachineProduction';

type Props = {
  params: {
    serialNumber: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return { title: params.serialNumber };
}

// async function getMachine(serialNumber: string): Promise<Machine> {
//   const [machineRes, statusRes] = await Promise.all([
//     fetch(`http://localhost:5000/api/machines/${serialNumber}`, {
//       next: { tags: ['machine'] },
//     }),
//     fetch(`http://localhost:5000/api/machines/${serialNumber}/status`, {
//       cache: 'no-store',
//     }),
//   ]);

//   const [machineData, statusData] = await Promise.all([
//     machineRes.json(),
//     statusRes.json(),
//   ]);

//   return { ...machineData.data, status: statusData.data.status };
// }

async function getMachine(serialNumber: string) {
  const response = await fetch(
    `http://localhost:5000/api/machines/${serialNumber}`,
    { next: { tags: [serialNumber] } }
  );

  return await response.json();
}

export default async function Machines({ params }: Props) {
  const machine = await getMachine(params.serialNumber);

  if (!machine) {
    return notFound();
  }

  return (
    <main className="flex-1 p-4 border rounded-md border-white/10">
      <div className="flex flex-col items-center w-full h-full justify-evenly">
        <div className="flex w-full justify-evenly">
          <MachineInfo machine={machine.data} />
          <MachineStatus machine={machine.data} />
        </div>

        <MachineProduction machine={machine.data} />
      </div>
    </main>
  );
}
