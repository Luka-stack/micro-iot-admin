import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';

import { PreviewTools } from './PreviewTools';
import { DetailSection } from './PreviewDetails';
import { useMachinesActions, useMachinesStore } from '../context';

export function Preview() {
  const dispatch = useMachinesActions();
  const {
    machinePreview: { machine, visible },
  } = useMachinesStore();

  const close = () => {
    dispatch('SET_PREVIEW', machine);
  };

  return (
    <>
      {visible && (
        <div
          className="fixed inset-0 z-50 transition bg-gray-900 bg-opacity-50 duration dark:bg-opacity-80"
          onClick={close}
        ></div>
      )}

      <div
        className={clsx(
          'fixed top-0 right-0 transition-all duration-300 transform h-full max-w-sm w-full z-[60] bg-slate-900 shadow-md shadow-black',
          visible ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex flex-col items-center">
          <button
            onClick={close}
            className="px-1.5 rounded-md bg-slate-800 py-1 text-xs self-start mt-2 ml-2 hover:bg-slate-700"
          >
            ESC
          </button>

          {machine ? (
            <>
              <h3 className="mt-4 space-x-2 font-bold">
                Machine:{' '}
                <Link
                  href={`/machines/${machine.serialNumber}`}
                  className="underline cursor-pointer underline-offset-4 hover:text-slate-500"
                >
                  {machine.serialNumber.substring(0, 18)}
                </Link>
              </h3>

              <h3 className="mt-2 space-x-2 font-bold">
                Model: {machine.model.name}
              </h3>

              <div className="p-3 mt-5 border shadow-md border-slate-800 rounded-xl shadow-black">
                <Image
                  src={`/${machine.type.imageUrl}`}
                  alt="Machine Image"
                  width={160}
                  height={160}
                />
              </div>

              <DetailSection machine={machine} />
              <PreviewTools machine={machine} />
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}
