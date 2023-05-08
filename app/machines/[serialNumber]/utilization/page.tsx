import UtilizationTab from './utilization-tab';

const labels = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const data = {
  labels,
  datasets: [
    {
      label: 'Utilization',
      data: labels.map(() => Math.floor(Math.random() * (24 - 0 + 1) + 0)),
      backgroundColor: '#3730a3',
      hoverBackgroundColor: '#4338ca',
    },
  ],
};

export default async function MachineUtilizationPage({
  params,
}: {
  params: { serialNumber: string };
}) {
  return (
    <main className="w-full h-[90%]">
      <UtilizationTab data={data} />
    </main>
  );
}
