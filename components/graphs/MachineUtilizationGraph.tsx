'use client';

import {
  calculateMonthDay,
  toDecimalHours,
  toHoursAndMinutes,
} from '@/common/date-helpers';
import { MachineUtilization } from '@/types';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
    tooltip: {
      displayColors: false,
      caretSize: 10,
      titleFont: {
        size: 14,
      },
      bodyFont: {
        size: 14,
      },
      callbacks: {
        title: (context: any) => {
          return `Date: ${context[0].dataset.rawDates[context[0].dataIndex]}`;
        },
        label: (context: any) => {
          const { hours, minutes } = toHoursAndMinutes(context.parsed.y);

          return `${context.dataset.label}: ${hours} [h] ${minutes} [min]`;
        },
      },
    },
  },
  scales: {
    y: {
      max: 8,
      grid: {
        display: true,
        color: '#334155',
      },
      ticks: {
        padding: 8,
        color: '#94a3b8',
        font: {
          size: 14,
        },
        callback: (value: any) => `${value} [h]`,
      },
    },
    x: {
      grid: {
        display: false,
        color: '#FFF',
        lineWidth: 0,
      },
      ticks: {
        color: '#94a3b8',
        font: {
          size: 14,
        },
      },
    },
  },
};

type Props = {
  data: MachineUtilization[];
};

export function MachineUtilizationGraph({ data }: Props) {
  const utilization = useTransformData(data);

  return (
    <div className="grid w-full mt-10 auto-rows-fr auto-cols-fr util-graph-height">
      <Bar options={options} data={utilization} />
    </div>
  );
}

function useTransformData(data: MachineUtilization[]) {
  const labels: string[] = [];
  const rawDates: string[] = [];
  const chartData: number[] = [];

  data.forEach(({ date, utilization }) => {
    rawDates.push(date);
    labels.push(calculateMonthDay(date));
    chartData.push(toDecimalHours(utilization));
  });

  return {
    labels,
    datasets: [
      {
        label: 'Utilization',
        rawDates,
        data: chartData,
        backgroundColor: '#3730A3',
        hoverBackgroundColor: '#4338CA',
      },
    ],
  };
}
