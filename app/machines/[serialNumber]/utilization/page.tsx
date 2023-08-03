'use client';

import { Suspense, useState } from 'react';
import { UtilizationNavigation } from './UtilizationNavigation';
import { UtilizationGraphTab } from './UtilizationGraphTab';
import { UtilizationStatsTab } from './UtilizationStatsTab';

type Props = {
  params: { serialNumber: string };
};

export default function MachineUtilizationPage({ params }: Props) {
  const [tab, setTab] = useState<'graph' | 'stats'>('graph');

  return (
    <main className="flex flex-col w-full h-full">
      <UtilizationNavigation tab={tab} setTab={setTab} />

      {tab === 'graph' ? (
        <UtilizationGraphTab serialNumber={params.serialNumber} />
      ) : (
        <Suspense fallback={<StatsSkeleton />}>
          <UtilizationStatsTab serialNumber={params.serialNumber} />
        </Suspense>
      )}
    </main>
  );
}

function StatsSkeleton() {
  return (
    <main className="flex flex-col items-center space-y-10">
      <h1 className="text-2xl font-medium text-center">Utilization Summary</h1>
      <div className="flex flex-col w-64 p-5 border border-black h-fit bg-black/10">
        <div className="space-y-5 animate-pulse ">
          <div className="grid grid-cols-3 gap-4">
            <div className="h-3 col-span-2 rounded bg-slate-700"></div>
            <div className="h-3 col-span-1 rounded bg-slate-700"></div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="h-3 col-span-2 rounded bg-slate-700"></div>
            <div className="h-3 col-span-1 rounded bg-slate-700"></div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="h-3 col-span-2 rounded bg-slate-700"></div>
            <div className="h-3 col-span-1 rounded bg-slate-700"></div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="h-3 col-span-2 rounded bg-slate-700"></div>
            <div className="h-3 col-span-1 rounded bg-slate-700"></div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="h-3 col-span-2 rounded bg-slate-700"></div>
            <div className="h-3 col-span-1 rounded bg-slate-700"></div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="h-3 col-span-2 rounded bg-slate-700"></div>
            <div className="h-3 col-span-1 rounded bg-slate-700"></div>
          </div>
        </div>
      </div>
    </main>
  );
}
