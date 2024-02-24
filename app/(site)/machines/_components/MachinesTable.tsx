import clsx from 'clsx';
import Image from 'next/image';
import { memo } from 'react';
import { BeatLoader } from 'react-spinners';

import { TableData } from '@/components/ui/TableData';
import { TableHeader } from '@/components/ui/TableHeader';
import { Machine, MachineStatus } from '@/types';

type Props = {
  pending: boolean;
  machines?: Machine[];
  updatePreview: (machine: Machine) => void;
};

export const MachinesTable = memo(function MachinesTable({
  pending,
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
          {pending ? (
            <LoadingInformation />
          ) : machines?.length === 0 ? (
            <MachinesNotFound />
          ) : (
            machines!.map((machine) => (
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
            ))
          )}
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

function LoadingInformation() {
  return (
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
  );
}

function MachinesNotFound() {
  return (
    <tr>
      <td colSpan={8}>
        <div className="flex flex-col items-center justify-center pt-20 space-y-5">
          <h4 className="text-lg text-slate-500">
            No machines found in the database
          </h4>
        </div>
      </td>
    </tr>
  );
}
