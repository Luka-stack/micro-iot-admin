'use client';

import clsx from 'clsx';
import { toast } from 'sonner';
import { CheckIcon } from '@heroicons/react/24/outline';
import { UserPlusIcon } from '@heroicons/react/20/solid';
import { Listbox, Transition } from '@headlessui/react';
import { Fragment, useState, useTransition } from 'react';

import { assignEmployee } from '@/app/actions';

type Props = {
  serialNumber: string;
  employee: string | null;
  selectables: string[];
};

export function SelectAssignee({ serialNumber, selectables, employee }: Props) {
  const [isPending, startTransition] = useTransition();
  const [assignedEmployee, setAssignedEmployee] = useState<string | null>(
    employee
  );

  const assigningTransition = async (employee: string) => {
    setAssignedEmployee(employee === selectables[0] ? null : employee);
    const response = await assignEmployee(serialNumber, employee);

    if (response.error) {
      toast.error('Failed to assign employee');
      setAssignedEmployee(null);
    }
  };

  const handleAssignUser = (employee: string) => {
    startTransition(() => {
      assigningTransition(employee);
    });
  };

  return (
    <Listbox value={assignedEmployee} onChange={handleAssignUser}>
      {({ open }) => (
        <div className="relative mr-2">
          <Listbox.Button
            className={clsx(
              'relative w-full p-2 text-left rounded-lg cursor-pointer focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus:outline-none hover:bg-slate-950/30',
              { 'bg-slate-950/30': open },
              { 'pointer-events-none': isPending }
            )}
          >
            {assignedEmployee ? (
              <p className="block truncate">{assignedEmployee}</p>
            ) : (
              <UserPlusIcon className="p-2 rounded-full w-9 bg-slate-800" />
            )}
          </Listbox.Button>

          <Transition
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-50 w-full py-1 mt-1 overflow-auto text-base rounded-md shadow-lg max-h-60 focus:outline-none sm:text-sm scrollbar-thin scrollbar-track-slate-800 scrollbar-thumb-slate-700 bg-slate-950">
              {selectables.map((item) => (
                <Listbox.Option
                  key={item}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 pl-10 mx-2 rounded-md ${
                      active ? 'bg-slate-900 text-slate-200' : 'text-slate-400'
                    }`
                  }
                  value={item}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected
                            ? 'font-medium text-slate-200'
                            : 'font-normal'
                        }`}
                      >
                        {item}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 -mt-1 text-slate-200">
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
      )}
    </Listbox>
  );
}
