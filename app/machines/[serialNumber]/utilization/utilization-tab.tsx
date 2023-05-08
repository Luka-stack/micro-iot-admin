'use client';

import UtilizationGraph from '@/components/machines/utilization/graph';
import DateFilter from '@/components/ui/date-filter';

type Props = {
  data: any;
};

const UtilizationTab = ({ data }: Props) => {
  return (
    <main className="relative space-y-10">
      <div className="absolute right-0 text-sm top-2">
        <h3>Utilization Summary: 123[h] 23[min]</h3>
      </div>

      <DateFilter />

      <div className="w-full">
        <UtilizationGraph data={data} />
      </div>
    </main>
  );
};

export default UtilizationTab;
