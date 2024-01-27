import Image from 'next/image';
import { memo } from 'react';

import { Machine, MachineStatus } from '@/types';
import { TableData } from '@/components/ui/TableData';
import { TableHeader } from '@/components/ui/TableHeader';
import clsx from 'clsx';

type Props = {
  updatePreview: (machine: Machine) => void;
  machines: Machine[];
};

export const MachinesTable = memo(function MachinesTable({
  machines,
  updatePreview,
}: Props) {
  return (
    <div className="flex-1 overflow-y-auto border rounded-lg border-white/10 table-scrollbar">
      <table className="w-full">
        <thead>
          <tr className="sticky top-0 z-40 text-left main-gradient">
            <TableHeader className="w-28" />
            <TableHeader>Serial Number</TableHeader>
            <TableHeader>Producent</TableHeader>
            <TableHeader>Type</TableHeader>
            <TableHeader>Model</TableHeader>
            <TableHeader>Rate [s]</TableHeader>
            <TableHeader className="w-32 text-center">
              Next Maintenance
            </TableHeader>
            <TableHeader className="text-center w-36">Status</TableHeader>
          </tr>
        </thead>

        <tbody>
          {machines.map((machine) => (
            <tr
              key={machine.serialNumber}
              onClick={() => updatePreview(machine)}
              className="main-gradient-hover hover:cursor-pointer"
            >
              <TableData>
                <Image
                  alt={machine.serialNumber}
                  src={`/${machine.type.imageUrl}`}
                  width={56}
                  height={56}
                  className="mx-auto w-14 h-14"
                />
              </TableData>
              <TableData>{machine.serialNumber}</TableData>
              <TableData>{machine.producent}</TableData>
              <TableData>{machine.type.name}</TableData>
              <TableData>{machine.model.name}</TableData>
              <TableData>{machine.productionRate}</TableData>
              <TableData className="text-center">
                {new Date(
                  machine.maintainInfo.maintenance
                ).toLocaleDateString()}
              </TableData>
              <TableData>
                <StatusBadge status={machine.status} />
              </TableData>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

function StatusBadge({ status }: { status: MachineStatus }) {
  return (
    <div
      className={clsx(
        'px-2 py-1 text-xs font-semibold text-center border rounded-full w-28 mx-auto',
        status === 'IDLE' && 'border-slate-600 stripes-idle',
        status === 'BROKEN' && 'border-red-600 stripes-broken',
        status === 'MAINTENANCE' && 'border-yellow-600 stripes-main',
        status === 'WORKING' && 'border-green-600 stripes-working'
      )}
    >
      {status}
    </div>
  );
}
