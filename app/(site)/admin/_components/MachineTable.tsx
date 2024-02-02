'use client';

import Image from 'next/image';
import { BeatLoader } from 'react-spinners';

import { Machine } from '@/types';
import { TableData } from '@/components/ui/TableData';
import { TableHeader } from '@/components/ui/TableHeader';
import { SelectAssignee } from './SelectAssignee';

type Props = {
  pending: boolean;
  machines?: Machine[];
  employees: string[];
};

export function MachineTable({ pending, machines, employees }: Props) {
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
          {pending ? (
            <tr>
              <td colSpan={8}>
                <div className="flex flex-col items-center justify-center pt-20 space-y-5">
                  <BeatLoader color="#64748b" speedMultiplier={0.5} size={24} />
                  <h4 className="text-lg text-slate-500">
                    Searching database for machines
                  </h4>
                </div>
              </td>
            </tr>
          ) : (
            machines!.map((machine) => (
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
                  <SelectAssignee
                    selectables={employees}
                    employee={machine.assignedEmployee}
                    serialNumber={machine.serialNumber}
                  />
                </TableData>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
