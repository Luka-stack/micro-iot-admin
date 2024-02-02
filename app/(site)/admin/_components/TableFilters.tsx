import clsx from 'clsx';
import { Popover } from '@headlessui/react';
import { FunnelIcon } from '@heroicons/react/20/solid';
import { useMemo, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { FilterSelect } from '@/components/ui/FilterSelect';
import { createFilterUrl } from '@/lib/helpers';
import { useFilterReducer } from '../../../../hooks/use-filter-reducer';
import { ModelFilter, ProducentFilter, TypeFilter } from '@/types';

type Props = {
  producents: ProducentFilter[];
  types: TypeFilter[];
  models: ModelFilter[];
  employees: string[];
  isPending: boolean;
  setFilters: (filter: string) => void;
};

export function TableFilters({
  producents,
  types,
  models,
  employees,
  isPending,
  setFilters,
}: Props) {
  const {
    producent,
    type,
    model,
    availableModels,
    availableTypes,
    selectProducent,
    selectType,
    selectModel,
  } = useFilterReducer(types, models);

  const { employee, employeesFilter, setEmployee } =
    useEmployeesFilter(employees);

  const [anyFilter, setAnyFilter] = useState(false);
  const [serialNumber, setSerialNumber] = useState('');
  const debounced = useDebouncedCallback((value) => {
    setSerialNumber(value);
    setFilters(
      createFilterUrl({
        serialNumber: value,
        producents: producent || undefined,
        types: type || undefined,
        models: model || undefined,
      })
    );
  }, 500);

  const handleResetFilter = () => {
    selectProducent(null);
    selectType(null);
    selectModel(null);
    setEmployee(null);
    setFilters('');
    setAnyFilter(false);
  };

  const handleFilter = () => {
    setFilters(
      createFilterUrl({
        serialNumber: serialNumber,
        producents: producent || undefined,
        types: type || undefined,
        models: model || undefined,
        employee: employee?.name || undefined,
      })
    );
    setAnyFilter(true);
  };

  return (
    <div className="flex space-x-3">
      <input
        type="text"
        id="serialNumber"
        name="serialNumber"
        placeholder="Type serial number..."
        onChange={(e) => debounced(e.target.value)}
        className="w-48 p-2 text-sm bg-transparent border rounded-lg shadow-sm focus:outline-none border-white/10 shadow-black hover:bg-slate-800"
      />

      <Popover className="relative z-50">
        <Popover.Button className="p-2 border rounded-md shadow-sm border-white/10 shadow-black hover:bg-slate-800">
          <div
            className={clsx(
              'absolute w-3 h-3 bg-blue-900 rounded-full -top-1 -right-1 animate-pulse',
              !anyFilter && 'hidden'
            )}
          />
          <FunnelIcon className={clsx('w-5', { 'text-blue-900': false })} />
        </Popover.Button>

        <Popover.Panel className="absolute z-10 w-56 p-2 mt-1 space-y-5 border rounded-md bg-main border-white/10">
          {({ close }) => (
            <>
              <FilterSelect
                title={'Machine Producents'}
                selectables={producents}
                selected={producent}
                setSelected={selectProducent}
                variant="main"
              />

              <FilterSelect
                title={'Machine Types'}
                selectables={availableTypes}
                selected={type}
                setSelected={selectType}
                variant="main"
              />

              <FilterSelect
                title={'Machine Models'}
                selectables={availableModels}
                selected={model}
                setSelected={selectModel}
                variant="main"
              />

              <FilterSelect
                title={'Employees'}
                selectables={employeesFilter}
                selected={employee}
                setSelected={setEmployee}
                variant="main"
              />

              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => {
                    handleResetFilter();
                    close();
                  }}
                  disabled={isPending}
                  className="px-3 py-1 text-sm bg-gray-800 rounded-md shadow-sm shadow-black"
                >
                  Reset
                </button>
                <button
                  onClick={() => {
                    handleFilter();
                    close();
                  }}
                  disabled={isPending}
                  className="px-3 py-1 text-sm bg-blue-900 rounded-md shadow-sm shadow-black"
                >
                  Filter
                </button>
              </div>
            </>
          )}
        </Popover.Panel>
      </Popover>
    </div>
  );
}

function useEmployeesFilter(employees: string[]) {
  const employeesFilter = useMemo(
    () => employees.map((name) => ({ name })),
    [employees]
  );
  const [employee, setEmployee] = useState<{ name: string } | null>(null);

  return { employeesFilter, employee, setEmployee };
}
