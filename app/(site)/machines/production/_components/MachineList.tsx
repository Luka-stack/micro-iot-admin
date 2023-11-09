'use client';

import clsx from 'clsx';
import Image from 'next/image';
import { useDebounce } from 'use-debounce';
import { useCallback, useEffect, useRef, useState } from 'react';

import { BasePagination } from '@/components/ui/BasePagination';
import { MachineWorkContext } from '@/context/machine-work-context';
import { Machine, Pagination } from '@/types';
import { useFetchMachinesPromise } from '@/hooks/use-fetch-machine-promise';

type Props = {
  machinePromise: Promise<{ data: Machine[]; meta: Pagination }>;
};

export function MachineList({ machinePromise }: Props) {
  const { machines, pagination, loading, search } =
    useFetchMachinesPromise(machinePromise);

  const [serialNumber, setSerialNumber] = useSerialNumberFilter(search);

  const state = MachineWorkContext.useState();
  const actions = MachineWorkContext.useActions();

  const isSelected = (serialNumber: string) => {
    return state.find((m) => m.serialNumber === serialNumber) !== undefined;
  };

  const changePage = useCallback(
    (paginationUrl: string) => search(paginationUrl, serialNumber),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [serialNumber]
  );

  return (
    <main className="flex flex-col items-center flex-shrink-0 p-4 border rounded-md main-gradient border-white/10 w-72">
      <div className="w-full pb-5 mb-5 border-b border-white/10">
        <input
          type="text"
          id="serialNumber"
          name="serialNumber"
          placeholder="Serial Number"
          onChange={(e) => setSerialNumber(e.target.value)}
          className="w-full px-2 py-2 text-sm rounded-lg shadow-md bg-slate-800 placeholder:text-slate-500 focus:outline-none shadow-black hover:bg-slate-700"
        />
      </div>

      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="flex-1 space-y-5 overflow-y-auto scrollbar-none ">
            {machines.map((machine) => (
              <button
                key={machine.serialNumber}
                onClick={() =>
                  actions({ type: 'ADD_MACHINE', payload: machine })
                }
                className={clsx(
                  'flex items-center p-2 space-x-2 rounded-lg shadow-md cursor-pointer hover:bg-slate-900/50 w-60 border border-white/10 pl-4',
                  isSelected(machine.serialNumber) &&
                    '!bg-slate-900 shadow-black'
                )}
              >
                <div className="relative h-12 aspect-square">
                  <Image
                    src={`/${machine.type.imageUrl}`}
                    alt={machine.type.name}
                    fill
                  />
                </div>
                <h3 className="w-full">{machine.serialNumber}</h3>
              </button>
            ))}
          </div>

          <BasePagination
            loading={loading}
            pagination={pagination}
            changePage={changePage}
            classes="pt-4"
          />
        </>
      )}
    </main>
  );
}

function Loading() {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-20 mt-5 animate-spin aspect-square stroke-blue-500"
        viewBox="0 0 800 800"
        opacity="1"
      >
        <g stroke="currentStroke" fill="none" stroke-linecap="round">
          <circle
            r="363"
            cx="400"
            cy="400"
            stroke-width="7"
            stroke-dasharray="0 2281"
            opacity="0.56"
          ></circle>
          <circle
            r="346.5"
            cx="400"
            cy="400"
            stroke-width="7"
            stroke-dasharray="88 2177"
            transform="rotate(17, 400, 400)"
            opacity="0.35"
          ></circle>
          <circle
            r="330"
            cx="400"
            cy="400"
            stroke-width="7"
            stroke-dasharray="168 2073"
            transform="rotate(34, 400, 400)"
            opacity="0.66"
          ></circle>
          <circle
            r="313.5"
            cx="400"
            cy="400"
            stroke-width="7"
            stroke-dasharray="239 1970"
            transform="rotate(51, 400, 400)"
            opacity="0.46"
          ></circle>
          <circle
            r="297"
            cx="400"
            cy="400"
            stroke-width="7"
            stroke-dasharray="302 1866"
            transform="rotate(69, 400, 400)"
            opacity="0.16"
          ></circle>
          <circle
            r="280.5"
            cx="400"
            cy="400"
            stroke-width="7"
            stroke-dasharray="357 1762"
            transform="rotate(86, 400, 400)"
            opacity="0.70"
          ></circle>
          <circle
            r="264"
            cx="400"
            cy="400"
            stroke-width="7"
            stroke-dasharray="403 1659"
            transform="rotate(103, 400, 400)"
            opacity="0.69"
          ></circle>
          <circle
            r="247.5"
            cx="400"
            cy="400"
            stroke-width="7"
            stroke-dasharray="441 1555"
            transform="rotate(120, 400, 400)"
            opacity="0.86"
          ></circle>
          <circle
            r="231"
            cx="400"
            cy="400"
            stroke-width="7"
            stroke-dasharray="470 1451"
            transform="rotate(137, 400, 400)"
            opacity="0.39"
          ></circle>
          <circle
            r="214.5"
            cx="400"
            cy="400"
            stroke-width="7"
            stroke-dasharray="491 1348"
            transform="rotate(154, 400, 400)"
            opacity="0.69"
          ></circle>
          <circle
            r="198"
            cx="400"
            cy="400"
            stroke-width="7"
            stroke-dasharray="504 1244"
            transform="rotate(171, 400, 400)"
            opacity="0.21"
          ></circle>
          <circle
            r="181.5"
            cx="400"
            cy="400"
            stroke-width="7"
            stroke-dasharray="508 1140"
            transform="rotate(189, 400, 400)"
            opacity="0.76"
          ></circle>
          <circle
            r="165"
            cx="400"
            cy="400"
            stroke-width="7"
            stroke-dasharray="504 1037"
            transform="rotate(206, 400, 400)"
            opacity="0.19"
          ></circle>
          <circle
            r="148.5"
            cx="400"
            cy="400"
            stroke-width="7"
            stroke-dasharray="491 933"
            transform="rotate(223, 400, 400)"
            opacity="0.92"
          ></circle>
          <circle
            r="132"
            cx="400"
            cy="400"
            stroke-width="7"
            stroke-dasharray="470 829"
            transform="rotate(240, 400, 400)"
            opacity="0.17"
          ></circle>
          <circle
            r="115.5"
            cx="400"
            cy="400"
            stroke-width="7"
            stroke-dasharray="441 726"
            transform="rotate(257, 400, 400)"
            opacity="0.43"
          ></circle>
          <circle
            r="99"
            cx="400"
            cy="400"
            stroke-width="7"
            stroke-dasharray="403 622"
            transform="rotate(274, 400, 400)"
            opacity="0.37"
          ></circle>
          <circle
            r="82.5"
            cx="400"
            cy="400"
            stroke-width="7"
            stroke-dasharray="357 518"
            transform="rotate(291, 400, 400)"
            opacity="0.19"
          ></circle>
          <circle
            r="66"
            cx="400"
            cy="400"
            stroke-width="7"
            stroke-dasharray="302 415"
            transform="rotate(309, 400, 400)"
            opacity="0.23"
          ></circle>
          <circle
            r="49.5"
            cx="400"
            cy="400"
            stroke-width="7"
            stroke-dasharray="239 311"
            transform="rotate(326, 400, 400)"
            opacity="0.95"
          ></circle>
          <circle
            r="33"
            cx="400"
            cy="400"
            stroke-width="7"
            stroke-dasharray="168 207"
            transform="rotate(343, 400, 400)"
            opacity="0.48"
          ></circle>
          <circle
            r="16.5"
            cx="400"
            cy="400"
            stroke-width="7"
            stroke-dasharray="88 104"
            transform="rotate(360, 400, 400)"
            opacity="0.71"
          ></circle>
        </g>
      </svg>
    </div>
  );
}

function useSerialNumberFilter(
  search: (val1: undefined, serialNumber: string) => void
): [string, (val: string) => void] {
  let mounted = useRef(false);
  const inputState = useState('');
  const [serialNumber] = useDebounce(inputState[0], 500);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }

    search(undefined, serialNumber);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serialNumber]);

  return [serialNumber, inputState[1]];
}
