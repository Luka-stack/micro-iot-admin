import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

import { MachineStatus } from './MachineStatus';
import { MachineProduction } from './MachineProduction';
import { useMachinesActions, useMachinesStore } from '../context';

export function MachinePreview() {
  const dispatch = useMachinesActions();
  const {
    machinePreview: { machine, visible },
  } = useMachinesStore();

  const close = () => {
    dispatch('SET_PREVIEW', null);
  };

  return (
    <>
      {visible && (
        <div
          className="fixed inset-0 z-50 transition bg-gray-900 bg-opacity-50 duration dark:bg-opacity-80 xxl:hidden"
          onClick={close}
        ></div>
      )}

      <div
        className={clsx(
          'z-[60] border-white/10 rounded-md transition-all duration-200 ease-in-out fixed right-0 xxl:relative bg-main h-[88%] xxl:h-full',
          machine ? 'border xxl:w-60 translate-x-0' : 'xxl:w-0 translate-x-full'
        )}
      >
        {machine && (
          <div className="flex flex-col items-center h-full">
            <section className="flex items-center justify-end w-full p-2 space-x-2 main-gradient">
              <a
                href={`/machines/${machine.serialNumber}`}
                className="px-2 py-1 rounded-md shadow-sm bg-slate-800 shadow-black hover:bg-slate-900"
              >
                <ArrowTopRightOnSquareIcon className="h-4 text-slate-300" />
              </a>
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
                    className="font-semibold underline cursor-pointer hover:text-slate-400 underline-offset-4 whitespace-nowrap"
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
        )}
      </div>
    </>
  );
}
