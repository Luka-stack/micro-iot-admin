import DatePicker from 'react-datepicker';

import { FilterSelect } from '@/components/ui/FilterSelect';
import { EqFilterSelect } from '@/components/ui/EqFilterSelect';
import { MACHINE_STATUSES } from '@/lib/constants';
import { BaseLoadingButton } from '@/components/ui/BaseLoadingButton';
import { useFilterReducer } from '@/hooks/use-filter-reducer';
import {
  ModelFilter,
  ProducentFilter,
  SelectedFilter,
  TypeFilter,
} from '@/types';
import { RefObject, memo, useRef, useState } from 'react';
import { createFilterUrl } from '@/lib/helpers';

const eqFilters = [
  {
    name: '=',
    value: 'equals',
  },
  { name: '>', value: 'gt' },
  { name: '≥', value: 'gte' },
  { name: '<', value: 'lt' },
  { name: '≤', value: 'lte' },
];

const availableStatus = Object.keys(MACHINE_STATUSES).map((status) => ({
  name: status,
}));

type Props = {
  pending: boolean;
  producents: ProducentFilter[];
  types: TypeFilter[];
  models: ModelFilter[];
  setFilters: (filter: string) => void;
};

export const MachinesSearchSidebar = memo(function MachinesSearchSidebar({
  pending,
  producents,
  types,
  models,
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

  const [rateFilter, setRateFilter] = useState<{
    filter: { value: string; name: string };
    rate: RefObject<HTMLInputElement>;
  }>({
    filter: eqFilters[0],
    rate: useRef<HTMLInputElement>(null),
  });
  const [dateFilter, setDateFilter] = useState<{
    filter: { value: string; name: string };
    date: Date | null;
  }>({ filter: eqFilters[0], date: null });
  const [status, setStatus] = useState<SelectedFilter | null>(null);
  const serialNumberRef = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    const filters: Record<string, any> = {
      serialNumber: serialNumberRef.current?.value,
      producents: producent || undefined,
      types: type || undefined,
      models: model || undefined,
      status: status || undefined,
    };

    if (dateFilter.date) {
      filters.startDate = {
        filter: dateFilter.filter.value,
        value: dateFilter.date,
      };
    }

    if (rateFilter.rate.current?.value) {
      filters.rate = {
        filter: rateFilter.filter.value,
        value: rateFilter.rate.current?.value,
      };
    }

    setFilters(createFilterUrl(filters));
  };

  return (
    <main className="flex flex-col justify-between flex-none p-4 border rounded-md w-72 border-white/10 main-gradient">
      <div className="space-y-8">
        <div className="flex flex-col">
          <input
            ref={serialNumberRef}
            type="text"
            id="serialNumber"
            name="serialNumber"
            placeholder="Serial Number"
            className="px-2 py-2 text-sm border rounded-lg shadow-sm bg-slate-800 placeholder:text-slate-500 focus:outline-none shadow-black hover:bg-slate-700/20 border-white/10"
          />
        </div>

        <FilterSelect
          title={'Machine Producents'}
          selected={producent}
          selectables={producents}
          setSelected={selectProducent}
          variant="slate"
        />

        <FilterSelect
          title={'Machine Types'}
          selected={type}
          selectables={availableTypes}
          setSelected={selectType}
          variant="slate"
        />

        <FilterSelect
          title={'Machine Models'}
          selected={model}
          selectables={availableModels}
          setSelected={selectModel}
          variant="slate"
        />

        <div className="flex items-center w-full text-xs">
          <div className="w-full h-[0.01rem] bg-slate-400"></div>
          <span className="flex-none px-3">Advanced search</span>
          <div className="w-full h-[0.01rem] bg-slate-400"></div>
        </div>

        <FilterSelect
          title={'Machine Status'}
          selected={status}
          selectables={availableStatus}
          setSelected={setStatus}
          variant="slate"
        />

        <div className="flex border rounded-lg shadow-sm shadow-black border-white/10">
          <EqFilterSelect
            selectables={eqFilters}
            selected={rateFilter.filter}
            setSelected={(filter) => setRateFilter((v) => ({ ...v, filter }))}
          />
          <input
            ref={rateFilter.rate}
            type="number"
            id="productionRate"
            name="productionRate"
            placeholder="Production rate [s]"
            className="w-full px-2 py-2 text-sm rounded-r-lg bg-slate-800 placeholder:text-slate-500 focus:outline-none hover:bg-slate-700/20"
          />
        </div>

        <div className="flex border rounded-lg shadow-sm shadow-black border-white/10">
          <EqFilterSelect
            selectables={eqFilters}
            selected={dateFilter.filter}
            setSelected={(filter) => setDateFilter((v) => ({ ...v, filter }))}
          />
          <DatePicker
            selected={dateFilter.date}
            onChange={(date) => setDateFilter((v) => ({ ...v, date }))}
            placeholderText="Start date"
            className="w-full rounded-r-lg cursor-pointer"
            wrapperClassName="w-full hover:bg-slate-700/20"
            isClearable
          />
        </div>
      </div>

      <BaseLoadingButton
        loading={pending}
        style="bg-blue-900 text-slate-200 py-1.5 rounded-md hover:bg-blue-800 flex justify-center space-x-2 items-center shadow-md shadow-black"
        text="Search"
        onClick={handleSearch}
      />
    </main>
  );
});

// export const MachinesSearchSidebar = ({
//   pending,
//   producents,
//   types,
//   models,
//   setFilters,
// }: Props) => {
//   const {
//     producent,
//     type,
//     model,
//     availableModels,
//     availableTypes,
//     selectProducent,
//     selectType,
//     selectModel,
//   } = useFilterReducer(types, models);

//   const [rateFilter, setRateFilter] = useState<{
//     filter: { value: string; name: string };
//     rate: RefObject<HTMLInputElement>;
//   }>({
//     filter: eqFilters[0],
//     rate: useRef<HTMLInputElement>(null),
//   });
//   const [dateFilter, setDateFilter] = useState<{
//     filter: { value: string; name: string };
//     date: Date | null;
//   }>({ filter: eqFilters[0], date: null });
//   const [status, setStatus] = useState<SelectedFilter | null>(null);
//   const serialNumberRef = useRef<HTMLInputElement>(null);

//   const handleSearch = () => {
//     const filters: Record<string, any> = {
//       serialNumber: serialNumberRef.current?.value,
//       producents: producent || undefined,
//       types: type || undefined,
//       models: model || undefined,
//       status: status || undefined,
//     };

//     if (dateFilter.date) {
//       filters.startDate = {
//         filter: dateFilter.filter.value,
//         value: dateFilter.date,
//       };
//     }

//     if (rateFilter.rate.current?.value) {
//       filters.rate = {
//         filter: rateFilter.filter.value,
//         value: rateFilter.rate.current?.value,
//       };
//     }

//     setFilters(createFilterUrl(filters));
//   };

//   return (
//     <main className="flex flex-col justify-between flex-none p-4 border rounded-md w-72 border-white/10 main-gradient">
//       <div className="space-y-8">
//         <div className="flex flex-col">
//           <input
//             ref={serialNumberRef}
//             type="text"
//             id="serialNumber"
//             name="serialNumber"
//             placeholder="Serial Number"
//             className="px-2 py-2 text-sm border rounded-lg shadow-sm bg-slate-800 placeholder:text-slate-500 focus:outline-none shadow-black hover:bg-slate-700/20 border-white/10"
//           />
//         </div>

//         <FilterSelect
//           title={'Machine Producents'}
//           selected={producent}
//           selectables={producents}
//           setSelected={selectProducent}
//           variant="slate"
//         />

//         <FilterSelect
//           title={'Machine Types'}
//           selected={type}
//           selectables={availableTypes}
//           setSelected={selectType}
//           variant="slate"
//         />

//         <FilterSelect
//           title={'Machine Models'}
//           selected={model}
//           selectables={availableModels}
//           setSelected={selectModel}
//           variant="slate"
//         />

//         <div className="flex items-center w-full text-xs">
//           <div className="w-full h-[0.01rem] bg-slate-400"></div>
//           <span className="flex-none px-3">Advanced search</span>
//           <div className="w-full h-[0.01rem] bg-slate-400"></div>
//         </div>

//         <FilterSelect
//           title={'Machine Status'}
//           selected={status}
//           selectables={availableStatus}
//           setSelected={setStatus}
//           variant="slate"
//         />

//         <div className="flex border rounded-lg shadow-sm shadow-black border-white/10">
//           <EqFilterSelect
//             selectables={eqFilters}
//             selected={rateFilter.filter}
//             setSelected={(filter) => setRateFilter((v) => ({ ...v, filter }))}
//           />
//           <input
//             ref={rateFilter.rate}
//             type="number"
//             id="productionRate"
//             name="productionRate"
//             placeholder="Production rate [s]"
//             className="w-full px-2 py-2 text-sm rounded-r-lg bg-slate-800 placeholder:text-slate-500 focus:outline-none hover:bg-slate-700/20"
//           />
//         </div>

//         <div className="flex border rounded-lg shadow-sm shadow-black border-white/10">
//           <EqFilterSelect
//             selectables={eqFilters}
//             selected={dateFilter.filter}
//             setSelected={(filter) => setDateFilter((v) => ({ ...v, filter }))}
//           />
//           <DatePicker
//             selected={dateFilter.date}
//             onChange={(date) => setDateFilter((v) => ({ ...v, date }))}
//             placeholderText="Start date"
//             className="w-full rounded-r-lg cursor-pointer"
//             wrapperClassName="w-full hover:bg-slate-700/20"
//             isClearable
//           />
//         </div>
//       </div>

//       <BaseLoadingButton
//         loading={pending}
//         style="bg-blue-900 text-slate-200 py-1.5 rounded-md hover:bg-blue-800 flex justify-center space-x-2 items-center shadow-md shadow-black"
//         text="Search"
//         onClick={handleSearch}
//       />
//     </main>
//   );
// };
