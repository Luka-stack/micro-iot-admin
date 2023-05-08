'use client';

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
  maintainAspectRatio: true,
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
        label: (context: any) => {
          return `${context.dataset.label}: ${context.parsed.y} [h]`;
        },
      },
    },
  },
  scales: {
    y: {
      max: 24,
      grid: {
        display: true,
        color: '#334155',
      },
      ticks: {
        padding: 8,
        color: '#94a3b8',
        font: {
          size: 16,
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
          size: 16,
        },
      },
    },
  },
};

type Props = {
  data: any;
};

const UtilizationGraph = ({ data }: Props) => {
  return <Bar options={options} data={data} />;
};

export default UtilizationGraph;
