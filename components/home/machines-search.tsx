'use client';
import { useRef, useState } from 'react';

import { MACHINE_STATUSES } from '@/common/constants';
import { createFilterUrl } from '@/common/helpers';
import {
  Filters,
  ModelFilter,
  ProducentFilter,
  SelectedFilter,
  TypeFilter,
} from '@/types';
import { BaseSelect } from '../ui/base-select';

const machineStatus = Object.keys(MACHINE_STATUSES).map((status) => ({
  name: status,
}));

type Props = {
  filters: Filters;
  loading: boolean;
  filterData: (filterUrl: string) => Promise<void>;
};

export const MachinesSearch = ({ filters, loading, filterData }: Props) => {
  const serialNumberRef = useRef<HTMLInputElement>(null);
  const productionRateRef = useRef<HTMLInputElement>(null);

  const [machineTypes, setMachineTypes] = useState<TypeFilter[]>(filters.types);
  const [machineModels, setMachineModels] = useState<ModelFilter[]>(
    filters.models
  );

  const [selectedProducent, setSelectedProducent] =
    useState<ProducentFilter | null>(null);
  const [selectedType, setSelectedType] = useState<TypeFilter | null>(null);
  const [selectedModel, setSelectedModel] = useState<ModelFilter | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<SelectedFilter | null>(
    null
  );

  const onProducentChange = (producent: ProducentFilter | null) => {
    setSelectedProducent(producent);

    if (producent) {
      setMachineTypes(
        filters.types.filter((type) => type.producents.includes(producent.name))
      );

      setMachineModels(
        filters.models.filter((model) => model.producent === producent.name)
      );
    } else {
      setMachineTypes(filters.types);
    }

    setSelectedType(null);
    setSelectedModel(null);
  };

  const onTypeChange = (machineType: TypeFilter | null) => {
    setSelectedType(machineType);

    if (machineType) {
      return setMachineModels(
        filters.models.filter(
          (model) =>
            model.type === machineType.name &&
            (selectedProducent
              ? model.producent === selectedProducent.name
              : true)
        )
      );
    } else {
      setMachineModels(filters.models);
    }

    setSelectedModel(null);
  };

  const fetchSearchData = async () => {
    const filterUrl = createFilterUrl({
      serialNumber: serialNumberRef.current?.value,
      producents: selectedProducent,
      types: selectedType,
      models: selectedModel,
      status: selectedStatus,
      rate: productionRateRef.current?.value,
    } as any);

    filterData(filterUrl);
  };

  return (
    <main className="flex flex-col justify-between flex-none p-4 w-72">
      <div className="space-y-6">
        <div className="flex flex-col">
          <input
            ref={serialNumberRef}
            type="text"
            id="serialNumber"
            name="serialNumber"
            placeholder="Serial Number"
            className="px-2 py-2 text-sm rounded-lg shadow-md bg-slate-800 placeholder:text-slate-500 focus:outline-none shadow-black hover:bg-slate-700"
          />
        </div>

        <BaseSelect
          title={'Machine Producents'}
          selectables={filters.producents}
          selected={selectedProducent}
          setSelected={onProducentChange}
        />

        <BaseSelect
          title={'Machine Types'}
          selectables={machineTypes}
          selected={selectedType}
          setSelected={onTypeChange}
        />

        <BaseSelect
          title={'Machine Models'}
          selectables={machineModels}
          selected={selectedModel}
          setSelected={setSelectedModel}
        />

        <div className="flex items-center w-full text-xs">
          <div className="w-full h-[0.01rem] bg-slate-400"></div>
          <span className="flex-none px-3">Advanced search</span>
          <div className="w-full h-[0.01rem] bg-slate-400"></div>
        </div>

        <BaseSelect
          title={'Machine Status'}
          selectables={machineStatus}
          selected={selectedStatus}
          setSelected={setSelectedStatus}
        />

        <div className="flex flex-col">
          <input
            ref={productionRateRef}
            type="number"
            id="productionRate"
            name="productionRate"
            placeholder="Production rate [s]"
            className="px-2 py-2 text-sm rounded-lg shadow-md bg-slate-800 placeholder:text-slate-500 focus:outline-none shadow-black hover:bg-slate-700"
          />
        </div>
      </div>

      <button
        onClick={fetchSearchData}
        className="bg-blue-900 text-slate-200 py-1.5 rounded-md hover:bg-blue-800 flex justify-center space-x-2 items-center shadow-md shadow-black"
      >
        {loading ? (
          <>
            <svg
              className="w-4 h-4 text-white animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span>Loading...</span>
          </>
        ) : (
          'Search'
        )}
      </button>
    </main>
  );
};
