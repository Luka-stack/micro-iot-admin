'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';

import { Machine } from '@/types';
import { updateProductionRate } from '../../actions';
import { MachineReportButton } from '@/components/buttons/MachineReportButton';
import { MachineStatusButton } from '@/components/buttons/MachineStatusButton';
import { MachineProductionButton } from '@/components/buttons/MachineProductionButton';
import { MachineMaintainButton } from '@/components/buttons/MachineMaintainButton';
import { useMachineUpdate } from '@/hooks/use-machine-update';

type Props = {
  machine: Machine;
};

export function MachineTools({ machine }: Props) {
  console.log('Machine Tools');

  const router = useRouter();
  const { loading, doRequest } = useMachineUpdate();
  const [isPending, startTransition] = useTransition();

  const changeMachineStatus = async () => {
    await doRequest(machine.serialNumber, {
      status: machine.status === 'IDLE' ? 'WORKING' : 'IDLE',
    });

    router.refresh();
  };

  const changeProductionRate = (productionRate: number) => {
    startTransition(() =>
      // @ts-ignore
      updateProductionRate(machine.serialNumber, productionRate)
    );
  };

  return (
    <section className="flex self-center space-x-5">
      <MachineStatusButton
        loading={loading}
        updateAction={changeMachineStatus}
        status={machine.status}
      />

      <MachineProductionButton
        machine={machine}
        loading={isPending}
        updateAction={changeProductionRate}
      />

      <MachineReportButton />

      <MachineMaintainButton />
    </section>
  );
}
