'use client';

import Image from 'next/image';

import { Machine } from '@/types';
import { twMerge } from 'tailwind-merge';
import { SelectAssignee } from './SelectAssignee';

type Props = {
  machines: Machine[];
};

const users = [
  'Unassigned',
  'lukasz@iotfox.pl',
  'taka@iotfox.pl',
  'rafa@iotfox.pl',
  'cos@iotfox.pl',
];

export function MachineTable({ machines }: Props) {
  return (
    <div className="flex-1 overflow-y-auto border rounded-lg border-white/10 table-scrollbar">
      <table className="w-full">
        <thead className="">
          <tr className="sticky top-0 z-40 text-left main-gradient">
            <TableHeader className="w-28" />
            <TableHeader>Serial Number</TableHeader>
            <TableHeader>Producent</TableHeader>
            <TableHeader>Type</TableHeader>
            <TableHeader>Model</TableHeader>
            <TableHeader className="w-64 pl-2">Assigned Employee</TableHeader>
          </tr>
        </thead>

        <tbody>
          {machines.map((machine) => (
            <tr key={machine.serialNumber}>
              <TableData className="w-28">
                <Image
                  alt={machine.serialNumber}
                  src={`/${machine.type.imageUrl}`}
                  width={56}
                  height={56}
                  className="mx-auto w-14 h-14"
                />
              </TableData>
              <TableData className="">{machine.serialNumber}</TableData>
              <TableData className="">{machine.producent}</TableData>
              <TableData className="">{machine.type.name}</TableData>
              <TableData className="">{machine.model.name}</TableData>
              <TableData className="w-64">
                <SelectAssignee selectables={users} />
              </TableData>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TableHeader({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <th
      scope="col"
      className={twMerge(
        'py-2 text-sm font-medium text-left text-slate-400',
        className
      )}
    >
      {children}
    </th>
  );
}

function TableData({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return <td className={twMerge('py-5', className)}>{children}</td>;
}
