import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import React, { Fragment } from 'react';
import { twMerge } from 'tailwind-merge';

interface Selectable {
  name: string;
}

type Props = {
  title: string;
  selectables: Selectable[];
  selected: Selectable | null;
  variant: 'main' | 'slate';
  setSelected: (producent: any) => void;
};

export const FilterSelect = ({
  title,
  selectables,
  selected,
  variant,
  setSelected,
}: Props) => {
  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative mt-1">
        <Listbox.Button
          className={clsx(
            'relative w-full py-2 pl-3 pr-10 text-left border rounded-lg shadow-sm cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-offset-2 sm:text-sm shadow-black border-white/10',
            {
              'bg-slate-800 hover:bg-slate-700/20': variant === 'slate',
            },
            {
              'bg-main hover:bg-slate-700/20': variant === 'main',
            }
          )}
        >
          <span
            className={clsx('block truncate', { 'text-slate-400': !selected })}
          >
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
          <Listbox.Options
            className={clsx(
              'absolute z-50 w-full py-1 mt-1 overflow-auto text-base border rounded-md shadow-sm max-h-60 focus:outline-none sm:text-sm scrollbar-thin scrollbar-track-slate-800 scrollbar-thumb-slate-700 border-white/10 shadow-black',
              {
                'bg-slate-800': variant === 'slate',
              },
              {
                'bg-main': variant === 'main',
              }
            )}
          >
            <Listbox.Option
              className={({ active }) =>
                `relative cursor-pointer select-none py-2 pl-10 pr-4 mx-1 rounded-md ${
                  active ? 'bg-slate-700/20 text-slate-200' : 'text-slate-400'
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
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-200">
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
                  `relative cursor-pointer select-none py-2 pl-10 pr-4 mx-1 rounded-md ${
                    active ? 'bg-slate-700/20 text-slate-200' : 'text-slate-400'
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
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-200">
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
