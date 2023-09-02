import { PresentationChartLineIcon } from '@heroicons/react/24/outline';
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { MachineWork } from '@/types';

type Props = {
  data: MachineWork[];
};

export function MachineWorkGraph({ data }: Props) {
  if (!data.length) {
    return <NoDataFound />;
  }

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
          interval={'preserveStart'}
          axisLine={false}
          tickMargin={10}
          tick={<CustomizedAxisTick />}
        />
        <YAxis tick={{ fill: '#94a3b8' }} />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="work"
          stroke="#1d4ed8"
          fill="#232B52CC"
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

function CustomizedAxisTick({
  x,
  y,
  payload,
}: {
  x?: number;
  y?: number;
  payload?: { index: number; value: number | string };
}) {
  if (x && y && payload) {
    if (payload.index === 0) {
      return null;
    }

    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="middle" fill="#94a3b8">
          {payload.value}
        </text>
      </g>
    );
  }

  return null;
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
