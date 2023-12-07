import { MachineChart } from './_components/MachineChart';
import { MachineDetails } from './_components/MachineDetails';

type Props = {
  params: { serialNumber: string };
};

export default async function MachineWorkDetailPage({ params }: Props) {
  return (
    <div className="w-full p-4">
      <h1 className="text-2xl font-bold text-center">
        Amount of work the machine did over its lifespan
      </h1>

      <MachineChart serialNumber={params.serialNumber} />

      <div className="w-5/6 h-1 mx-auto mt-4 mb-10 rounded-md bg-white/10" />

      <MachineDetails serialNumber={params.serialNumber} />
    </div>
  );
}
