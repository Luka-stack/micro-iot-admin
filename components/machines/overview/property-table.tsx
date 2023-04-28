import { Machine } from '@/types';

type Props = {
  machine: Machine;
};

const PropertyTable = ({ machine }: Props) => {
  const getTimeDifference = () => {
    const now = new Date().getTime();
    const startedDate = new Date(machine.startedAt).getTime();

    const diff = now - startedDate;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 36e5);

    return `${hours} [h]   ${minutes} [min]`;
  };

  return (
    <section className="w-2/4 mt-10">
      <h1 className="text-lg font-bold text-center">
        Machine: {machine.serialNumber}
      </h1>
      <div className="flex justify-center w-full mt-10">
        <div className="w-1/2 space-y-5">
          <div className="flex">
            <h1 className="w-24">Producent:</h1>
            <h1>{machine.producent}</h1>
          </div>
          <div className="flex">
            <h1 className="w-24">Model:</h1>
            <h1>{machine.model.name}</h1>
          </div>
          <div className="flex">
            <h1 className="w-24">Type:</h1>
            <h1>{machine.type.name}</h1>
          </div>
        </div>
        <div className="space-y-5">
          <div className="flex">
            <h1 className="w-32">Status:</h1>
            <h1>{machine.status}</h1>
          </div>
          <div className="flex">
            <h1 className="w-32">Production Rate:</h1>
            <h1>{machine.productionRate} [s]</h1>
          </div>
          <div className="flex">
            <h1 className="w-32">Working Since:</h1>
            <h1>{new Date(machine.startedAt).toLocaleString()}</h1>
          </div>
          <div className="flex">
            <h1 className="w-32">Working hours:</h1>
            <h1>{getTimeDifference()}</h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyTable;
