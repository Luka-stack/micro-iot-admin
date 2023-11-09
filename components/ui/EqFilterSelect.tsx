'use client';

import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline';
import React, { Fragment } from 'react';

interface Selectable {
  name: string;
}

type Props = {
  selectables: Selectable[];
  selected: Selectable;
  setSelected: (producent: any) => void;
};

export const EqFilterSelect = ({
  selectables,
  selected,
  setSelected,
}: Props) => {
  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative">
        <Listbox.Button className="relative w-10 px-2 py-2 text-sm text-center rounded-l-lg cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-offset-2 bg-slate-800 shadow-black hover:bg-slate-700">
          <span className="block truncate">{selected.name}</span>
        </Listbox.Button>

        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-50 w-full py-1 mt-1 overflow-auto text-base rounded-md shadow-lg bg-slate-800 max-h-60 ring-1 ring-opacity-5 focus:outline-none sm:text-sm scrollbar-thin scrollbar-track-slate-800 scrollbar-thumb-slate-700">
            {selectables.map((item) => (
              <Listbox.Option
                key={item.name}
                className={({ active }) =>
                  `relative cursor-pointer select-none py-2 text-center ${
                    active
                      ? 'bg-indigo-500/20 text-indigo-500'
                      : 'text-slate-400'
                  }`
                }
                value={item}
              >
                {({ selected }) => (
                  <span
                    className={`block truncate ${
                      selected ? 'font-medium' : 'font-normal'
                    }`}
                  >
                    {item.name}
                  </span>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};
