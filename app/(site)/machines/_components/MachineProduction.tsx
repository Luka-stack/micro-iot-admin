import clsx from 'clsx';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

import { Machine } from '@/types';
import { updateMachine } from '@/app/actions';
import { getProductionRateLevel } from '@/lib/helpers';
import { MachineProductionModal } from '@/components/modals/MachineProductionModal';

type Props = {
  setPreviewMachine: (machine: Machine) => void;
  machine: Machine;
};

export function MachineProduction({ machine, setPreviewMachine }: Props) {
  const queryClient = useQueryClient();
  const [visible, setVisible] = useState(false);
  const [pending, setPending] = useState(false);

  const canUpdate = machine.status === 'IDLE' || machine.status === 'WORKING';

  const productionLevel = useMemo(
    () =>
      getProductionRateLevel(
        machine.productionRate,
        machine.model.defaultRate,
        machine.model.maxRate
      ),
    [machine]
  );

  const changeProductionRate = async (productionRate: number) => {
    setPending(true);

    const response = await updateMachine<Machine>(machine.serialNumber, {
      productionRate,
    });

    if (response.error) {
      toast.error('Error while updating machine production rate');
    } else {
      setPreviewMachine(response.data!);
      queryClient.invalidateQueries({ queryKey: ['machines'] });
    }

    setPending(false);
  };

  return (
    <div>
      <h3 className="mb-2 font-semibold tracking-wider text-center">
        Production
      </h3>

      <button
        onClick={() => setVisible(true)}
        disabled={pending || !canUpdate}
        className={clsx(
          'flex items-center justify-center mx-auto border-8 rounded-full w-20 aspect-square hover:scale-105',
          pending && '!border-slate-500',
          productionLevel === 0 && 'border-slate-200',
          productionLevel === 1 && 'border-green-700',
          productionLevel === 2 && 'border-amber-700',
          productionLevel === 3 && 'border-red-700'
        )}
      >
        <h2 className="text-2xl font-bold">{productionLevel}</h2>
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
