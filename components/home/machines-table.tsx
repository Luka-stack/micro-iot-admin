import { Machine } from '@/types';
import clsx from 'clsx';
import Image from 'next/image';

type Props = {
  machines: Machine[];
  selectedMachine: Machine | null;
  selectMachine: (machine: Machine | null) => void;
};

export const MachinesTable = ({
  machines,
  selectedMachine,
  selectMachine,
}: Props) => {
  const onMachineClick = (machine: Machine) => {
    if (selectedMachine === machine) {
      return selectMachine(null);
    }

    selectMachine(machine);
  };

  return (
    <main className="flex flex-col flex-grow-0 flex-shrink h-full p-4 overflow-hidden">
      <div className="w-full overflow-y-auto scrollbar-thin scrollbar-track-slate-800 scrollbar-thumb-slate-700">
        <table className="w-full text-left table-auto">
          <thead className="sticky top-0 shadow-sm bg-slate-900 shadow-slate-800">
            <tr className="">
              <th className="w-16"></th>
              <th className="pb-2">Serial Number</th>
              <th className="pb-2">Producent</th>
              <th className="pb-2">Type</th>
              <th className="pb-2">Model</th>
              <th className="pb-2">Rate [s]</th>
              <th className="pb-2">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-slate-800">
            {machines.map((machine) => (
              <tr
                onClick={() => onMachineClick(machine)}
                key={machine.serialNumber}
                className={clsx(
                  'h-16 cursor-pointer hover:bg-slate-800/50 even:bg-slate-800/10',
                  selectedMachine === machine &&
                    '!bg-indigo-500/20 text-indigo-500'
                )}
              >
                <td>
                  <Image
                    src={`/${machine.type.imageUrl}`}
                    alt="Machine Image"
                    width={40}
                    height={40}
                  />
                </td>
                <td>{machine.serialNumber}</td>
                <td>{machine.producent}</td>
                <td>{machine.type.name}</td>
                <td>{machine.model.name}</td>
                <td>{machine.productionRate}</td>
                <td>{machine.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};
