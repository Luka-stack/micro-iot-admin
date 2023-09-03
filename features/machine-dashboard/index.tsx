import { Machine } from '@/types';
import { MachineInfo } from './components/MachineInfo';
import { MachineStatus } from './components/MachineStatus';
import { MachineProduction } from './components/MachineProduction';

type Props = {
  machine: Machine;
};

export function MachineDashboard({ machine }: Props) {
  return (
    <div className="flex flex-col items-center w-full h-full justify-evenly">
      <div className="flex w-full justify-evenly">
        <MachineInfo machine={machine} />
        <MachineStatus machine={machine} />
      </div>

      <MachineProduction machine={machine} />
    </div>
  );
}
