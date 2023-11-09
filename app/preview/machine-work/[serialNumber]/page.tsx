import { Suspense } from 'react';

import { MachineChart } from './_components/MachineChart';
import { MachineDetails } from './_components/MachineDetails';
import { ANALYSER_API, MACHINE_API } from '@/lib/apis';

type Props = {
  params: { serialNumber: string };
};

async function getMachine(serialNumber: string) {
  return fetch(`${MACHINE_API}/${serialNumber}`, { cache: 'no-cache' }).then(
    (response) => response.json()
  );
}

async function getMachineWork(serialNumber: string) {
  return fetch(`${ANALYSER_API}/${serialNumber}/work`).then((response) =>
    response.json()
  );
}

export default async function MachineWorkDetailPage({ params }: Props) {
  const machine = getMachine(params.serialNumber);
  const work = getMachineWork(params.serialNumber);

  return (
    <div className="w-full p-4">
      <h1 className="text-2xl font-bold text-center">
        Amount of work the machine did over its lifespan
      </h1>

      <Suspense fallback={<MachineChartLoading />}>
        <MachineChart dataPromise={work} />
      </Suspense>

      <div className="w-5/6 h-1 mx-auto mt-4 mb-10 rounded-md bg-white/10" />

      <Suspense fallback={<MachineDetailsSkeleton />}>
        <MachineDetails dataPromise={machine} />
      </Suspense>
    </div>
  );
}

function MachineDetailsSkeleton() {
  return (
    <div className="flex items-center justify-around animate-pulse">
      <div className="rounded-md w-28 aspect-square bg-slate-700" />

      <div className="space-y-7">
        <div className="h-3 rounded-md w-52 bg-slate-700" />
        <div className="h-3 rounded-md w-52 bg-slate-700" />
      </div>

      <div className="space-y-7">
        <div className="h-3 rounded-md w-52 bg-slate-700" />
        <div className="h-3 rounded-md w-52 bg-slate-700" />
      </div>

      <div className="space-y-7">
        <div className="h-3 rounded-md w-52 bg-slate-700" />
        <div className="h-3 rounded-md w-52 bg-slate-700" />
      </div>

      <div className="space-y-7">
        <div className="h-3 rounded-md w-52 bg-slate-700" />
        <div className="h-3 rounded-md w-52 bg-slate-700" />
      </div>

      <div className="space-y-7">
        <div className="h-3 rounded-md w-52 bg-slate-700" />
        <div className="h-3 rounded-md w-52 bg-slate-700" />
      </div>
    </div>
  );
}

function MachineChartLoading() {
  return (
    <div className="flex items-center justify-center w-full space-x-20 work-graph-preview">
      <div className="w-5 h-5 bg-purple-700 rounded-full bounce-loading first-ball" />
      <div className="w-5 h-5 bg-purple-700 rounded-full bounce-loading second-ball" />
      <div className="w-5 h-5 bg-purple-700 rounded-full bounce-loading third-ball" />
    </div>
  );
}
