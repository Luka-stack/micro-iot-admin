'use client';

import clsx from 'clsx';
import { useMemo, useState, useTransition } from 'react';

import { Machine } from '@/types';
import { updateMachine } from '@/app/actions';
import { getProductionRateLevel } from '@/lib/helpers';
import { MachineProductionModal } from '@/components/modals/MachineProductionModal';

type Props = {
  machine: Machine;
};

export function MachineProduction({ machine }: Props) {
  const [visible, setVisible] = useState(false);
  const [isPending, startTransition] = useTransition();

  const productionLevel = useMemo(
    () =>
      getProductionRateLevel(
        machine.productionRate,
        machine.model.defaultRate,
        machine.model.maxRate
      ),
    [machine]
  );

  const changeProductionRate = (productionRate: number) => {
    startTransition(() => {
      updateMachine(machine.serialNumber, { productionRate });
    });
  };

  return (
    <>
      <section className="px-10 py-4 border rounded-md shadow-md border-white/10 shadow-black">
        <h3 className="mb-5 text-lg font-semibold tracking-wider text-center">
          Production
        </h3>
        <div className="flex space-x-10">
          <div className="w-56 my-auto">
            <ul className="space-y-5">
              <li className="flex justify-between space-x-1">
                <h5 className="w-28">Default Rate:</h5>
                <span>{` ${machine.model.defaultRate} [s]`}</span>
              </li>
              <li className="flex justify-between space-x-1">
                <h5 className="w-28">Minimum Rate:</h5>
                <span>{` ${machine.model.minRate} [s]`}</span>
              </li>
              <li className="flex justify-between space-x-1">
                <h5 className="w-28">Maximum Rate:</h5>
                <span>{` ${machine.model.maxRate} [s]`}</span>
              </li>
            </ul>
          </div>

          <div className="px-2">
            <button
              onClick={() => setVisible(true)}
              disabled={isPending}
              className={clsx(
                'flex items-center justify-center mx-auto border-8 rounded-full w-28 aspect-square hover:scale-105',
                isPending && '!border-slate-500',
                productionLevel === 0 && 'border-slate-200',
                productionLevel === 1 && 'border-green-700',
                productionLevel === 2 && 'border-amber-700',
                productionLevel === 3 && 'border-red-700'
              )}
            >
              <h2 className="text-4xl font-bold">{productionLevel}</h2>
            </button>
            <p className="mt-3">
              {`Production Rate: ${machine.productionRate} [s]`}
            </p>
          </div>

          <div className="w-56 my-auto">
            <ul className="space-y-5">
              <li className="flex justify-between space-x-1">
                <h5 className="w-36">Fault Indicator:</h5>
                <span>{` ${machine.model.faultRate} [s]`}</span>
              </li>
              <li className="flex justify-between space-x-1">
                <h5 className="w-36">Productivity:</h5>
                <span>{` ${machine.model.workBase} [s]`}</span>
              </li>
              <li className="flex justify-between space-x-1">
                <h5 className="w-36">Productivity Spread:</h5>
                <span>{` ${machine.model.workRange} [s]`}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <MachineProductionModal
        close={() => setVisible(false)}
        machine={machine}
        visible={visible}
        updateAction={changeProductionRate}
      />
    </>
  );
}
