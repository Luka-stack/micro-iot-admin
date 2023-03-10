import Image from 'next/image';

import { StatusToggle } from '../ui/status-toggle';
import { Machine } from '@/types';
import Link from 'next/link';

type Props = {
  machine: Machine;
  close: () => void;
};

export const MachinePreview = ({ machine, close }: Props) => {
  return (
    <main className="flex-none h-full border border-r-0 rounded-l-lg shadow-md w-72 shadow-black border-slate-800">
      <div className="flex flex-col items-center">
        <button
          onClick={close}
          className="px-1.5 rounded-md bg-slate-800 py-1 text-xs self-start mt-2 ml-2 hover:bg-slate-700"
        >
          ESC
        </button>

        <h3 className="mt-4 space-x-2 font-bold">
          Machine:{' '}
          <Link
            href={`/machines/${machine.serialNumber}`}
            className="underline cursor-pointer underline-offset-4 hover:text-slate-500"
          >
            {machine.serialNumber.substring(0, 18)}
          </Link>
        </h3>

        <h3 className="mt-2 space-x-2 font-bold">Model: {machine.model}</h3>

        <div className="p-3 mt-5 border shadow-md border-slate-800 rounded-xl shadow-black">
          <Image
            src={`/${machine.imageUrl}`}
            alt="Machine Image"
            width={160}
            height={160}
          />
        </div>

        <section className="mt-5 space-y-3 text-sm">
          <p>
            <b>Producent:</b> {machine.producent}
          </p>
          <p>
            <b>Type:</b> {machine.type}
          </p>
          <p>
            <b>Production Rate:</b> {machine.productionRate} [s]
          </p>
          <p>
            <b>Working hours:</b> 48 [h]
          </p>
        </section>

        <section className="px-4 mb-10">
          <StatusToggle machine={machine} />
        </section>
      </div>
    </main>
  );
};
