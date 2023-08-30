import Image from 'next/image';
import { useMachinesActions, useMachinesStore } from '../context';

export const MachinesTable = () => {
  const { machines } = useMachinesStore();
  const dispatch = useMachinesActions();

  return (
    <div className="grid flex-1 overflow-y-auto auto-cols-fr auto-rows-fr scrollbar-thin scrollbar-track-slate-800 scrollbar-thumb-slate-950">
      <table className="">
        <thead className="sticky top-0 main-gradient">
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

        <tbody className="divide-y divide-white/10">
          {machines.map((machine) => (
            <tr
              key={machine.serialNumber}
              className="main-gradient-hover hover:cursor-pointer"
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
  );
};

function TableHeader({ text }: { text: string }) {
  return (
    <th scope="col" className="px-6 py-2 font-medium text-center uppercase">
      {text}
    </th>
  );
}

function TableData({ text }: { text: string | number }) {
  return (
    <td className="px-6 py-4 text-sm text-center whitespace-nowrap">{text}</td>
  );
}

function TableImage({ src, alt }: { src: string; alt: string }) {
  return (
    <td className="flex justify-center py-2">
      <div className="relative flex items-center justify-center text-sm h-14 whitespace-nowrap aspect-square">
        <Image src={src} alt={alt} fill={true} />
      </div>
    </td>
  );
}
