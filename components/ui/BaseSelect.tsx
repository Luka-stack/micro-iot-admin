import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline';
import React, { Fragment } from 'react';

interface Selectable {
  name: string;
}

type Props = {
  title: string;
  selectables: Selectable[];
  selected: Selectable | null;
  setSelected: (producent: any) => void;
};

export const BaseSelect = ({
  title,
  selectables,
  selected,
  setSelected,
}: Props) => {
  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative mt-1">
        <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left rounded-lg shadow-md cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-offset-2 sm:text-sm bg-slate-800 shadow-black hover:bg-slate-700">
          <span className="block truncate">
            {selected ? selected.name : title}
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <ChevronUpDownIcon
              className="w-5 h-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-50 w-full py-1 mt-1 overflow-auto text-base rounded-md shadow-lg bg-slate-800 max-h-60 ring-1 ring-opacity-5 focus:outline-none sm:text-sm scrollbar-thin scrollbar-track-slate-800 scrollbar-thumb-slate-700">
            <Listbox.Option
              className={({ active }) =>
                `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                  active ? 'bg-blue-500/20 text-blue-500' : 'text-slate-400'
                }`
              }
              value={null}
            >
              {({ selected }) => (
                <>
                  <span
                    className={`block truncate ${
                      selected ? 'font-medium' : 'font-normal'
                    }`}
                  >
                    All
                  </span>
                  {selected ? (
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-500">
                      <CheckIcon className="w-5 h-5" aria-hidden="true" />
                    </span>
                  ) : null}
                </>
              )}
            </Listbox.Option>

            {selectables.map((item) => (
              <Listbox.Option
                key={item.name}
                className={({ active }) =>
                  `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                    active ? 'bg-blue-500/20 text-blue-500' : 'text-slate-400'
                  }`
                }
                value={item}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {item.name}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-500">
                        <CheckIcon className="w-5 h-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};
