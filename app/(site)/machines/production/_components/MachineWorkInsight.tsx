import clsx from 'clsx';
import { PuffLoader } from 'react-spinners';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

import { Machine } from '@/types';
import { MachineProductionGraph } from '@/components/graphs/MachineProductionGraph';
import { useFetchMachineWork } from '@/hooks/use-fetch-machine-work';
import { differenceInHoursAndMin } from '@/lib/helpers';
import Link from 'next/link';

type Props = {
  machine: Machine;
  size: number;
  onEsc: () => void;
};

export function MachineWorkInsight({ machine, size, onEsc }: Props) {
  const { loading, workData } = useFetchMachineWork(machine.serialNumber);

  const [hours, minutes] = differenceInHoursAndMin(
    new Date(machine.lastStatusUpdate)
  );

  return (
    <main className="flex-1">
      <div className="flex flex-col flex-1 h-full">
        <div className="flex items-center justify-between w-full px-4 py-2 rounded-t-md main-gradient">
          <Link
            href={`/preview/machine-work/${machine.serialNumber}`}
            target="_blank"
            className="px-2 py-1 rounded-md shadow-sm bg-slate-800 shadow-black hover:bg-slate-900"
          >
            <ArrowTopRightOnSquareIcon className="h-5 text-slate-300" />
          </Link>
          <h2 className="font-semibold">{`Machine ${machine.serialNumber}`}</h2>
          <button
            onClick={onEsc}
            className="px-2 py-1 text-xs rounded-md shadow-sm bg-slate-800 shadow-black hover:bg-slate-900 text-slate-300"
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
          {loading ? <Loading /> : <MachineProductionGraph data={workData} />}
        </div>

        <div className="flex items-center justify-around flex-1 p-4 border-t-2 border-white/10">
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

function Loading() {
  return (
    <div className="mx-auto my-auto">
      <PuffLoader color="#7e22ce" size={100} speedMultiplier={0.5} />
    </div>
  );
}
