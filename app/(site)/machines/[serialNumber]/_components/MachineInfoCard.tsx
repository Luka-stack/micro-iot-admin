import Image from 'next/image';
import { Machine } from '@/types';

type Props = {
  machine: Machine;
};

export function MachineInfoCard({ machine }: Props) {
  return (
    <section className="p-4 border rounded-md shadow-md w-96 border-white/10 shadow-black">
      <h3 className="mb-5 text-lg font-semibold tracking-wider text-center">
        Machine Info
      </h3>
      <div className="flex items-center justify-center space-x-14">
        <div className="relative h-36 aspect-square">
          <Image src={`/${machine.type.imageUrl}`} alt="🏗️" fill />
        </div>
        <div className="space-y-2">
          <p>{`${machine.serialNumber}`}</p>
          <p className="text-sm text-slate-500">{`Producent: ${machine.producent}`}</p>
          <p className="text-sm text-slate-500">{`Type: ${machine.type.name}`}</p>
          <p className="text-sm text-slate-500">{`Model: ${machine.model.name}`}</p>
        </div>
      </div>
    </section>
  );
}
