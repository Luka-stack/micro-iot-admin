'use client';

import { BaseLoadingButton } from '@/components/ui/base-loading-button';
import BaseModal from '@/components/ui/base-modal';
import { useMachineUpdate } from '@/hooks/use-machine-update';
import { Machine } from '@/types';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { UpdateProductionRate } from '../update-production-rate';

type Props = {
  serialNumber: string;
  status: Machine['status'];
  productionRate: number;
};

export const ManagingSection = ({
  serialNumber,
  status,
  productionRate,
}: Props) => {
  const router = useRouter();
  const { loading, doRequest } = useMachineUpdate();
  const [open, setOpen] = useState(false);

  const isWorking = useMemo(() => status === 'WORKING', [status]);

  const onStatusChange = async () => {
    await doRequest(serialNumber, {
      status: status === 'IDLE' ? 'WORKING' : 'IDLE',
    });

    router.refresh();
  };

  const onRateChange = async (rate: number) => {
    await doRequest(serialNumber, {
      productionRate: rate,
    });

    router.refresh();
  };

  return (
    <>
      <main className="flex pb-10 justify-evenly">
        <BaseLoadingButton
          onClick={onStatusChange}
          loading={loading}
          style={clsx(
            'py-2 text-sm border rounded-md shadow-md w-48 flex justify-center',
            isWorking
              ? 'text-red-700 border-red-700 bg-red-900/10 hover:bg-red-900/30'
              : 'text-green-700 border-green-700 bg-green-900/10 hover:bg-green-900/30'
          )}
          text={`${isWorking ? 'Stop' : 'Start'} Machine`}
          loadingText={false}
        />

        <BaseLoadingButton
          onClick={() => setOpen(true)}
          loading={loading}
          style={
            'w-48 py-2 text-sm border rounded-md shadow-md border-slate-400 text-slate-400 bg-slate-600/10 hover:bg-slate-600/30'
          }
          text={'Production rate'}
          loadingText={false}
        />

        <button
          onClick={() => setOpen(true)}
          className="w-48 py-2 text-sm border rounded-md shadow-md border-slate-400 text-slate-400 bg-slate-600/10 hover:bg-slate-600/30"
        >
          Report Defect
        </button>

        <button className="w-48 py-2 text-sm border rounded-md shadow-md border-slate-400 text-slate-400 bg-slate-600/10 hover:bg-slate-600/30">
          Assign Maintenance
        </button>
      </main>

      <BaseModal
        title={'Update production rate'}
        open={open}
        close={() => setOpen(false)}
      >
        <UpdateProductionRate
          productionRate={productionRate}
          update={onRateChange}
          close={() => setOpen(false)}
        />
      </BaseModal>
    </>
  );
};
