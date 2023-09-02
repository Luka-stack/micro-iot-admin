import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';

import { PreviewTools } from './PreviewTools';
import { DetailSection } from './PreviewDetails';
import { useMachinesActions, useMachinesStore } from '../context';
import { useRouter } from 'next/navigation';
import { Machine } from '@/types';
import {
  ArrowTopRightOnSquareIcon,
  PowerIcon,
} from '@heroicons/react/24/outline';
import {
  differenceInHoursAndMin,
  getProductionRateLevel,
} from '@/common/helpers';
import { useMemo } from 'react';

export function MachinePreview() {
  const dispatch = useMachinesActions();
  const {
    machinePreview: { machine, visible },
  } = useMachinesStore();

  const close = () => {
    dispatch('SET_PREVIEW', machine);
  };

  if (!machine) {
    return <div>Machine not selected</div>;
  }

  return (
    <>
      {/* {visible && (
        <div
          className="fixed inset-0 z-50 transition bg-gray-900 bg-opacity-50 duration dark:bg-opacity-80"
          onClick={close}
        ></div>
      )} */}

      <div className={clsx('h-full z-[60] border border-white/10 rounded-md')}>
        <div className="flex flex-col items-center h-full">
          <section className="flex items-center justify-end w-full p-2 space-x-2 main-gradient">
            <Link
              href={`/machines/${machine.serialNumber}`}
              className="px-2 py-1 rounded-md shadow-sm bg-slate-800 shadow-black hover:bg-slate-900"
            >
              <ArrowTopRightOnSquareIcon className="h-4 text-slate-300" />
            </Link>
            <button
              onClick={close}
              className="px-1.5 rounded-md bg-slate-800 py-1 text-xs hover:bg-slate-900 shadow-sm shadow-black"
            >
              ESC
            </button>
          </section>

          <section className="flex flex-col items-center h-full p-4 justify-evenly">
            <div className="flex flex-col items-center space-y-4">
              <h3>
                <Link
                  href={`/machines/${machine.serialNumber}`}
                  className="font-semibold underline cursor-pointer hover:text-slate-400 underline-offset-4"
                >
                  {`Machine ${machine.serialNumber}`}
                </Link>
              </h3>
              <Image
                src={`/${machine.type.imageUrl}`}
                alt="Machine Image"
                width={128}
                height={128}
              />
            </div>

            <MachineStatus machine={machine} />
            <MachineProduction machine={machine} />
          </section>
        </div>
      </div>
    </>
  );
}

function MachineStatus({ machine }: { machine: Machine }) {
  const hoursLabel = () => {
    const [hours, minutes] = differenceInHoursAndMin(
      new Date(machine.lastStatusUpdate)
    );

    return `${
      machine.status === 'WORKING' ? 'Working' : 'Idle'
    } hours: ${hours} [h] ${minutes} [min]`;
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h3 className="mb-2 font-semibold tracking-wider text-center">
        Machine Status
      </h3>
      <button>
        <PowerIcon
          className={clsx(
            'h-20 hover:scale-105',
            machine.status === 'WORKING'
              ? 'text-green-500 animate-pulse'
              : 'text-slate-500'
          )}
        />
      </button>
      <p className="mt-3 text-sm">{hoursLabel()}</p>
    </div>
  );
}

function MachineProduction({ machine }: { machine: Machine }) {
  const productionLevel = useMemo(
    () =>
      getProductionRateLevel(
        machine.productionRate,
        machine.model.defaultRate,
        machine.model.maxRate
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [machine.productionRate]
  );

  return (
    <div>
      <h3 className="mb-2 font-semibold tracking-wider text-center">
        Production
      </h3>
      <button
        className={clsx(
          'flex items-center justify-center mx-auto border-8 border-green-700 rounded-full w-20 aspect-square hover:scale-105',
          productionLevel === 0 && 'border-slate-200',
          productionLevel === 1 && 'border-green-700',
          productionLevel === 2 && 'border-amber-700',
          productionLevel === 3 && 'border-red-700'
        )}
      >
        <h2 className="text-2xl font-bold">2</h2>
      </button>
      <p className="mt-3 text-sm">{`Production Rate: ${machine.productionRate} [s]`}</p>
    </div>
  );
}
