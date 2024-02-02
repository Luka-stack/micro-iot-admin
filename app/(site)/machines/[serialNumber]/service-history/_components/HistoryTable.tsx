'use client';

import clsx from 'clsx';
import { useState } from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { Disclosure, Transition } from '@headlessui/react';

import { MachineWithHistory, RepairHistory } from '@/types';

type Props = {
  machine: MachineWithHistory;
};

export function HistoryTable({ machine }: Props) {
  const [filteredHistory, setFilteredHistory] = useState(
    machine.maintenances || []
  );
  const [type, setType] = useState('all');

  const handleFilter = (type: string) => {
    const history = machine.maintenances || [];

    if (type === 'all') {
      setFilteredHistory(history);
    } else {
      setFilteredHistory(
        history.filter((item) => item.type.toLowerCase() === type)
      );
    }

    setType(type);
  };

  return (
    <div className="flex-1 py-4 space-y-5 overflow-hidden border rounded-md border-white/10 full-page">
      <div className="flex justify-between px-4">
        <h1 className="text-2xl font-semibold">{`Machine ${machine.serialNumber} repair history`}</h1>
        <div className="space-x-5">
          <button
            onClick={() => handleFilter('all')}
            className={clsx(
              'px-4 py-0.5 transition-all duration-200 ease-out border rounded-md hover:border-blue-800 hover:text-blue-800 font-semibold active:scale-95',
              type === 'all'
                ? 'border-blue-800 text-blue-800'
                : 'border-slate-500 text-slate-500'
            )}
          >
            All
          </button>
          <button
            onClick={() => handleFilter('maintenance')}
            className={clsx(
              'px-4 py-0.5 font-semibold transition-all duration-200 ease-out border rounded-md hover:border-yellow-800 hover:text-yellow-800 active:scale-95',
              type === 'maintenance'
                ? 'border-yellow-800 text-yellow-800'
                : 'border-slate-500 text-slate-500'
            )}
          >
            Maintenanced
          </button>
          <button
            onClick={() => handleFilter('repair')}
            className={clsx(
              'px-4 py-0.5 font-semibold transition-all duration-200 ease-out border rounded-md hover:border-red-800 hover:text-red-800 active:scale-95',
              type === 'repair'
                ? 'border-red-800 text-red-800'
                : 'border-slate-500 text-slate-500'
            )}
          >
            Repaired
          </button>
        </div>
      </div>

      <div className="h-full pb-10 overflow-y-auto table-scrollbar">
        {filteredHistory.length === 0 ? (
          <div className="pt-5 text-2xl text-center border-t text-slate-500 border-white/10">
            We could not find any record of the service history.
          </div>
        ) : (
          filteredHistory.map((item) => (
            <HistoryRow key={item.date} item={item} />
          ))
        )}
      </div>
    </div>
  );
}

function HistoryRow({ item }: { item: RepairHistory }) {
  const doneColumn = () => {
    if (item.type === 'REPAIR') {
      return '';
    }

    return new Date(item.date) <= new Date(item.scheduled)
      ? 'Done within the deadline'
      : 'Completed post-deadline';
  };

  return (
    <Disclosure as={'div'} className="w-full">
      {({ open }) => (
        <>
          <Disclosure.Button className="relative grid items-center content-around w-full grid-cols-6 gap-4 p-4 font-medium border-t border-white/10">
            <div
              className={clsx(
                'px-2 py-1 text-xs text-center border rounded-full w-28',
                item.type === 'REPAIR'
                  ? 'border-red-600 stripes-broken'
                  : 'border-yellow-600 stripes-main'
              )}
            >
              {item.type}
            </div>

            <div>Done: {new Date(item.date).toLocaleDateString()}</div>

            <div>{doneColumn()}</div>
            <div>
              Next: {new Date(item.nextMaintenance).toLocaleDateString()}
            </div>
            <div>Maintainer: {item.maintainer}</div>
            <ChevronRightIcon
              className={clsx(
                'h-5 w-5 absolute right-10 transition-transform duration-200 ease-in-out',
                open && 'rotate-90 transform'
              )}
            />
          </Disclosure.Button>

          <Transition
            enter="transition-all duration-200 ease-in"
            enterFrom="max-h-0 opacity-0"
            enterTo="max-h-screen opacity-100"
            leave="transition-all duration-200 ease-out"
            leaveFrom="max-h-screen opacity-100"
            leaveTo="max-h-0 opacity-0"
          >
            <Disclosure.Panel className="p-4 bg-main-light">
              <h5 className="mt-1 font-semibold">What was done:</h5>
              <p className="p-2 mt-2 border rounded-md border-white/10">
                {item.description}
              </p>
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
}
