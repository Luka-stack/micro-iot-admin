import Image from 'next/image';
import { useMachinesActions, useMachinesStore } from '../context';

export const MachinesTable = () => {
  const { machines } = useMachinesStore();
  const dispatch = useMachinesActions();

  return (
    <div className="flex flex-col w-full h-[calc(95%-64px)] overflow-hidden">
      <div className="w-full overflow-y-auto scrollbar-thin scrollbar-track-slate-800 scrollbar-thumb-slate-700">
        <table className="min-w-full">
          <thead className="sticky top-0 bg-slate-900">
            <tr>
              <TableHeader text="" />
              <TableHeader text="Serial Number" />
              <TableHeader text="Producent" />
              <TableHeader text="Type" />
              <TableHeader text="Model" />
              <TableHeader text="Rate [s]" />
              <TableHeader text="Status" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {machines.map((machine) => (
              <tr
                key={machine.serialNumber}
                className="hover:bg-slate-800 hover:cursor-pointer"
                onClick={() => dispatch('SET_PREVIEW', machine)}
              >
                <TableImage
                  src={`/${machine.type.imageUrl}`}
                  alt="Machine Image"
                />
                <TableData text={machine.serialNumber} />
                <TableData text={machine.producent} />
                <TableData text={machine.type.name} />
                <TableData text={machine.model.name} />
                <TableData text={machine.productionRate} />
                <TableData text={machine.status} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

function TableHeader({ text }: { text: string }) {
  return (
    <th
      scope="col"
      className="px-6 pb-3 font-medium text-center uppercase text-slate-400"
    >
      {text}
    </th>
  );
}

function TableData({ text }: { text: string | number }) {
  return (
    <td className="px-6 py-4 text-sm text-center whitespace-nowrap text-slate-300">
      {text}
    </td>
  );
}

function TableImage({ src, alt }: { src: string; alt: string }) {
  return (
    <td className="flex items-center justify-center px-3 py-4 text-sm whitespace-nowrap">
      <Image src={src} alt={alt} width={40} height={40} />
    </td>
  );
}
