import { getProductionRateLevel } from '@/common/helpers';
import { Machine } from '@/types';
import { useMemo, useState } from 'react';
import { useMachinesActions } from '../context';
import clsx from 'clsx';
import { useMachineUpdate } from '@/hooks/use-machine-update';
import { revalidateMachines } from '@/app/actions';
import { MachineProductionModal } from '@/components/modals/machine-production-modal';

type Props = {
  machine: Machine;
};

export function MachineProduction({ machine }: Props) {
  const dispatch = useMachinesActions();
  const [visible, setVisible] = useState(false);
  const { loading, doRequest } = useMachineUpdate();

  const productionLevel = useMemo(
    () =>
      getProductionRateLevel(
        machine.productionRate,
        machine.model.defaultRate,
        machine.model.maxRate
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [machine.productionRate]
  );

  const changeProductionRate = async (productionRate: number) => {
    const updatedMachine = await doRequest(machine.serialNumber, {
      productionRate,
    });

    dispatch('UPDATE_MACHINE', updatedMachine);
    revalidateMachines();
  };

  return (
    <div>
      <h3 className="mb-2 font-semibold tracking-wider text-center">
        Production
      </h3>
      <button
        onClick={() => setVisible(true)}
        disabled={loading}
        className={clsx(
          'flex items-center justify-center mx-auto border-8 border-green-700 rounded-full w-20 aspect-square hover:scale-105',
          loading && '!border-slate-500',
          productionLevel === 0 && 'border-slate-200',
          productionLevel === 1 && 'border-green-700',
          productionLevel === 2 && 'border-amber-700',
          productionLevel === 3 && 'border-red-700'
        )}
      >
        <h2 className="text-2xl font-bold">2</h2>
      </button>
      <p className="mt-3 text-sm whitespace-nowrap">{`Production Rate: ${machine.productionRate} [s]`}</p>

      <MachineProductionModal
        close={() => setVisible(false)}
        machine={machine}
        visible={visible}
        updateAction={changeProductionRate}
      />
    </div>
  );
}
