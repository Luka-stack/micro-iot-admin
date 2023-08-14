'use client';

import { differenceInHoursAndMin } from '@/common/helpers';
import { Machine, MachineWork } from '@/types';
import {
  ArrowTopRightOnSquareIcon,
  PresentationChartLineIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export function MachineWorkInsight({
  machine,
  size,
  onEsc,
}: {
  machine: Machine;
  size: number;
  onEsc: () => void;
}) {
  const workData = useFetchMachineWork(machine.serialNumber);

  const [hours, minutes] = differenceInHoursAndMin(
    new Date(machine.lastStatusUpdate)
  );

  return (
    <main className="flex-1">
      <div className="flex flex-col flex-1 h-full border border-t-0 rounded-md shadow-md border-slate-950 shadow-black">
        <div className="flex items-center justify-between w-full px-4 py-2 bg-slate-950/50 rounded-t-md">
          <button className="px-2 py-1 rounded-md shadow-sm bg-slate-800 shadow-black hover:bg-slate-700">
            <ArrowTopRightOnSquareIcon className="h-5 text-slate-300" />
          </button>
          <h2 className="font-semibold">{machine.serialNumber}</h2>
          <button
            onClick={onEsc}
            className="px-2 py-1 text-xs rounded-md shadow-sm bg-slate-800 shadow-black hover:bg-slate-700 text-slate-300"
          >
            ESC
          </button>
        </div>

        <div
          className={clsx(
            'grid w-full h-full auto-rows-fr auto-cols-fr',
            size === 1 ? 'work-graph-multiple-height' : 'work-graph-height'
          )}
        >
          {workData.length ? (
            <WorkAreaChart data={workData} />
          ) : (
            <NoDataFound />
          )}
        </div>

        <div className="flex items-center justify-around flex-1 p-4 border-t-2 border-slate-950">
          <section className="space-y-2">
            <p>
              <b>Status:</b> {machine.status}
            </p>
          </section>

          <section className="space-y-2">
            <p>
              <b>Production Rate:</b>
              {` ${machine.productionRate} [s]`}
            </p>
            <p>
              <b>
                {machine.status === 'WORKING'
                  ? 'Working hours: '
                  : 'Idle hours: '}
              </b>
              {`${hours} [h] ${minutes} [min]`}
            </p>
          </section>

          <section className="space-y-2">
            <p>
              <b>Work Rate:</b> {machine.model.workBase}
            </p>
            <p>
              <b>Work Rate Range:</b> +/- {machine.model.workRange}
            </p>
          </section>

          <section className="space-y-2">
            <p>
              <b>Producent:</b> {machine.producent}
            </p>
          </section>

          <section className="space-y-2">
            <p>
              <b>Type:</b> {machine.type.name}
            </p>
            <p>
              <b>Model:</b> {machine.model.name}
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

function useFetchMachineWork(serialNumber: string) {
  const [workData, setWorkData] = useState<MachineWork[]>([]);

  const fetchData = async () => {
    const data = await fetch(
      `http://localhost:7000/api/analyser/${serialNumber}/work`,
      { cache: 'no-cache' }
    );
    const response: MachineWork[] = await data.json();

    setWorkData(
      response.map((machine) => ({
        timestamp: new Date(machine.timestamp).toLocaleString(),
        work: parseFloat(machine.work.toFixed(2)),
      }))
    );
  };

  useEffect(() => {
    fetchData();
  }, [serialNumber]);

  return workData;
}

function NoDataFound() {
  return (
    <div className="flex flex-col items-center justify-center space-y-3">
      <PresentationChartLineIcon className="h-20 stroke-slate-400" />
      <h2 className="text-2xl font-semibold">No data</h2>
      <p>The specified machine has no registered work history.</p>
    </div>
  );
}

function WorkAreaChart({ data }: { data: MachineWork[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{
          top: 30,
          right: 30,
          left: 20,
          bottom: 30,
        }}
      >
        <XAxis
          dataKey="timestamp"
          interval={6}
          axisLine={false}
          tickMargin={10}
        />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="work"
          stroke="#7e22ce"
          fill="#7E22CE4C"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number | string }[];
  label?: string;
}) {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 rounded-lg shadow-md bg-slate-900 shadow-black">
        <h3 className="">{label}</h3>
        <p className="">
          <b>Work</b>
          {`: ${payload[0].value}`}
        </p>
      </div>
    );
  }

  return null;
}
