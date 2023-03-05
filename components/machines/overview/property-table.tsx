type Props = {
  serialNumber: string;
  producent: string;
  model: string;
  type: string;
  status: string;
  startedAt: string;
};

export const PropertyTable = ({
  serialNumber,
  producent,
  model,
  type,
  status,
  startedAt,
}: Props) => {
  return (
    <section className="w-2/4 mt-10">
      <h1 className="text-lg font-bold text-center">Machine: {serialNumber}</h1>
      <div className="flex justify-center w-full mt-10">
        <div className="w-1/2 space-y-5">
          <div className="flex">
            <h1 className="w-24">Producent:</h1>
            <h1>{producent}</h1>
          </div>
          <div className="flex">
            <h1 className="w-24">Model:</h1>
            <h1>{model}</h1>
          </div>
          <div className="flex">
            <h1 className="w-24">Type:</h1>
            <h1>{type}</h1>
          </div>
        </div>
        <div className="space-y-5">
          <div className="flex">
            <h1 className="w-24">Status:</h1>
            <h1>{status}</h1>
          </div>
          <div className="flex">
            <h1 className="w-32">Working Since:</h1>
            <h1>{startedAt}</h1>
          </div>
          <div className="flex">
            <h1 className="w-32">Working hours:</h1>
            <h1>{startedAt}</h1>
          </div>
        </div>
      </div>
    </section>
  );
};
