import { useRef } from 'react';

type Props = {
  productionRate: number;
  update: (reate: number) => void;
  close: () => void;
};

export const UpdateProductionRate = ({
  productionRate,
  update,
  close,
}: Props) => {
  const prodRef = useRef<HTMLInputElement>(null);

  const onUpdate = () => {
    if (prodRef.current && prodRef.current.value.trim()) {
      update(parseInt(prodRef.current.value.trim()));
      close();
    }
  };

  return (
    <>
      <div className="flex flex-col mt-5 space-y-2">
        <label htmlFor="productionRate">Production rate [s]</label>
        <input
          ref={prodRef}
          type="number"
          id="productionRate"
          name="productionRate"
          defaultValue={productionRate}
          placeholder="Production rate [s]"
          className="px-2 py-2 text-sm rounded-lg bg-slate-800 placeholder:text-slate-500 focus:outline-none hover:bg-slate-700"
        />
      </div>

      <div className="flex mt-4 space-x-5">
        <button
          onClick={onUpdate}
          className="bg-blue-900 text-slate-200 py-1.5 rounded-md hover:bg-blue-800 flex justify-center space-x-2 items-center shadow-md shadow-black px-2"
        >
          Update
        </button>
        <button
          onClick={close}
          className="bg-red-900 text-slate-200 py-1.5 rounded-md hover:bg-red-800 flex justify-center space-x-2 items-center shadow-md shadow-black px-2"
        >
          Cancel
        </button>
      </div>
    </>
  );
};
