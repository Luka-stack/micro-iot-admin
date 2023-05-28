import { MachineStatusButton } from '@/components/buttons/MachineStatusButton';
import { useMachineUpdate } from '@/hooks/use-machine-update';
import { Machine } from '@/types';
import { useMachinesActions } from '../context';
import { MachineProductionButton } from '@/components/buttons/MachineProductionButton';
import { MachineReportButton } from '@/components/buttons/MachineReportButton';
import { MachineMaintainButton } from '@/components/buttons/MachineMaintainButton';

type Props = {
  machine: Machine;
};

export function PreviewTools({ machine }: Props) {
  const dispatch = useMachinesActions();
  const { loading, doRequest } = useMachineUpdate();

  const changeMachineStatus = async () => {
    const updatedMachine = await doRequest(machine.serialNumber, {
      status: machine.status === 'IDLE' ? 'WORKING' : 'IDLE',
    });

    dispatch('UPDATE_MACHINE', updatedMachine);
  };

  const changeProductionRate = async (productionRate: number) => {
    const updatedMachine = await doRequest(machine.serialNumber, {
      productionRate,
    });

    dispatch('UPDATE_MACHINE', updatedMachine);
  };

  return (
    <section className="flex flex-col mt-5 space-y-5">
      <MachineStatusButton
        loading={loading}
        onClick={changeMachineStatus}
        status={machine.status}
      />

      <MachineProductionButton
        machine={machine}
        loading={loading}
        updateAction={changeProductionRate}
      />

      <MachineReportButton />

      <MachineMaintainButton />
    </section>
  );
}
