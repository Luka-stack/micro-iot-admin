import {
  differenceInHoursAndMin,
  getProductionRateLevel,
} from '@/common/helpers';
import { Machine } from '@/types';
import { Metadata } from 'next';
import Image from 'next/image';
import { notFound, useRouter } from 'next/navigation';
import { RefreshButton } from './RefreshButton';
import { RevalidateButton } from './RevalidateButton';

type Props = {
  params: {
    serialNumber: string;
  };
};

export const dynamicParams = true;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return { title: `Micro IoT | Machine ${params.serialNumber}` };
}

async function getMachine(serialNumber: string): Promise<Machine> {
  const [machineRes, statusRes] = await Promise.all([
    fetch(`http://localhost:5000/api/machines/${serialNumber}`),
    fetch(`http://localhost:5000/api/machines/${serialNumber}/status`, {
      cache: 'no-store',
    }),
  ]);

  const [machineData, statusData] = await Promise.all([
    machineRes.json(),
    statusRes.json(),
  ]);

  return { ...machineData.data, otherStatus: statusData.data.status };
}

export default async function Machines({ params }: Props) {
  const machine = await getMachine(params.serialNumber);

  if (!machine) {
    return notFound();
  }

  const hoursLabel = () => {
    const [hours, minutes] = differenceInHoursAndMin(
      new Date(machine.lastStatusUpdate)
    );

    return (
      <>
        <b>{machine.status === 'WORKING' ? 'Working' : 'Idle'} hours:</b>{' '}
        {hours}
        [h] {minutes}[min]
      </>
    );
  };

  return (
    <main>
      <h1>{machine.serialNumber}</h1>
      <h2>{machine.status}</h2>
      <h2>{(machine as any).otherStatus}</h2>
      <RefreshButton />
      <br />
      <RevalidateButton />
    </main>
  );

  // return (
  //   <main className="w-full p-4">
  //     <div className="flex">
  //       <section className="flex flex-col w-1/5 space-y-5">
  //         <div className="relative self-center w-60 h-72">
  //           <Image src={`/${machine.type.imageUrl}`} alt="Machine" fill />
  //         </div>

  //         <div className="space-y-2">
  //           <p>
  //             <b>Machine:</b> {machine.serialNumber}
  //           </p>
  //           <p>
  //             <b>Producent:</b> {machine.producent}
  //           </p>
  //           <p>
  //             <b>Type:</b> {machine.type.name}
  //           </p>
  //           <p>
  //             <b>Model:</b> {machine.model.name}
  //           </p>
  //         </div>
  //       </section>

  //       <div className="flex flex-col w-4/5 justify-evenly">
  //         <section className="flex h-60 justify-evenly">
  //           <div className="px-10 py-4 space-y-2 border border-black rounded-md bg-black/10">
  //             <p>
  //               <b>Status:</b> {machine.status}
  //             </p>
  //             <p>
  //               <b>Production Rate:</b> {machine.productionRate} [s]
  //             </p>
  //             <p>
  //               <b>Production Rate:</b> Level{' '}
  //               {getProductionRateLevel(
  //                 machine.productionRate,
  //                 machine.model.defaultRate,
  //                 machine.model.maxRate
  //               )}
  //               .
  //             </p>
  //             <p>{hoursLabel()}</p>
  //           </div>
  //           <div className="px-10 py-4 space-y-2 border border-black rounded-md bg-black/10">
  //             <p>
  //               <b>Fault Rate:</b> {machine.model.faultRate}
  //             </p>
  //             <p>
  //               <b>Work Rate:</b> {machine.model.workBase}
  //             </p>
  //             <p>
  //               <b>Work Rate Range:</b> +/- {machine.model.workRange}
  //             </p>
  //             <p>
  //               <b>Def Production Rate:</b> {machine.model.defaultRate} [s]
  //             </p>
  //             <p>
  //               <b>Min Production Rate</b> {machine.model.minRate} [s]
  //             </p>
  //             <p>
  //               <b>Max Production Rate</b> {machine.model.maxRate} [s]
  //             </p>
  //           </div>
  //         </section>
  //       </div>
  //     </div>
  //   </main>
  // );
}
