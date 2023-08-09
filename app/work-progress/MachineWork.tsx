'use client';

import { differenceInHoursAndMin } from '@/common/helpers';
import { MachineWorkContext } from '@/context/machine-work-context';
import { Machine } from '@/types';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

export function MachineWork() {
  const state = MachineWorkContext.useState();
  const actions = MachineWorkContext.useActions();

  if (state.length === 0) {
    return <NoMachineSelected />;
  }

  return (
    <main className="flex flex-col w-full space-y-4">
      {state.map((machine) => (
        <SelectedMachine
          key={machine.serialNumber}
          machine={machine}
          onEsc={() =>
            actions({ type: 'REMOVE_MACHINE', payload: machine.serialNumber })
          }
        />
      ))}
    </main>
  );
}

function NoMachineSelected() {
  return (
    <main>
      <h1>Select up to two machines</h1>
    </main>
  );
}

function SelectedMachine({
  machine,
  onEsc,
}: {
  machine: Machine;
  onEsc: () => void;
}) {
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

        <div className="flex-1 bg-black"></div>

        <div className="flex items-center justify-around p-4 border-t-2 border-slate-950">
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
