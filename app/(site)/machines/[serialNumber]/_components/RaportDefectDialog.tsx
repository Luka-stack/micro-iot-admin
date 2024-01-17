import clsx from 'clsx';
import { toast } from 'sonner';
import { Fragment, useState } from 'react';
import { Dialog, Tab, Transition } from '@headlessui/react';
import { BellAlertIcon, TrashIcon } from '@heroicons/react/24/outline';

import { MACHINE_STATUSES } from '@/lib/constants';
import { Machine, MachineStatus } from '@/types';
import { reportDefect, updateMachine } from '@/app/actions';

type Props = {
  disabled: boolean;
  machine: Machine;
  update: (data: Partial<Machine>) => void;
};

export function RaportDefectDialog({ disabled, machine, update }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [defect, setDefect] = useState('');

  const closeModal = () => {
    setIsOpen(false);
  };

  const showModal = () => {
    setIsOpen(true);
  };

  const addDefect = async () => {
    const updatedInfo = {
      maintainInfo: {
        ...machine.maintainInfo,
        notes: [...machine.maintainInfo.notes, defect],
      },
    };

    update(updatedInfo);
    setDefect('');

    const response = await reportDefect(machine.serialNumber, [
      ...machine.maintainInfo.notes,
      defect,
    ]);

    if (response.error) {
      toast.error('Error while reporting defect');
    }
  };

  const requestService = async (newStatus: MachineStatus) => {
    const updatedStatus = {
      status: newStatus,
    };

    update(updatedStatus);
    setIsOpen(false);

    const response = await updateMachine(machine.serialNumber, updatedStatus);

    if (response.error) {
      toast.error('Error while requesting service');
    }
  };

  return (
    <Fragment>
      <button
        onClick={showModal}
        disabled={disabled}
        className="flex flex-col items-center text-slate-500 hover:text-slate-300 transition-all duration-200 ease-out rounded-md hover:bg-[#22232f] hover:shadow-sm shadow-black group my-auto py-4 active:scale-95 disabled:pointer-events-none"
      >
        <BellAlertIcon className="h-12" />
        <p className="">Report defect</p>
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-5xl p-6 overflow-hidden text-left align-middle transition-all transform shadow-xl bg-main rounded-2xl">
                  <Tab.Group>
                    <Tab.List className="flex p-1 space-x-1 rounded-xl">
                      {['Defects', 'Service'].map((category) => (
                        <Tab
                          key={category}
                          className={({ selected }) =>
                            clsx(
                              'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                              selected
                                ? 'bg-main-light text-slate-300'
                                : 'text-slate-500 hover:text-slate-300 hover:bg-main-light'
                            )
                          }
                        >
                          {category}
                        </Tab>
                      ))}
                    </Tab.List>

                    <Tab.Panels className="mt-2">
                      <Tab.Panel className="p-4 bg-main-light rounded-xl">
                        <Dialog.Title
                          as="h3"
                          className="w-full text-lg font-medium leading-6 text-center text-slate-300"
                        >
                          List of reported defects for machine{' '}
                          {machine.serialNumber}
                        </Dialog.Title>

                        <main className="flex space-x-10">
                          <div className="w-1/2 mt-5">
                            <ul className="h-64 px-2 overflow-y-auto border rounded-md scrollbar-thin scrollbar-thumb-main-light border-white/10">
                              {machine.maintainInfo.notes.length === 0 ? (
                                <li className="py-2 text-center">
                                  No defects reported
                                </li>
                              ) : (
                                machine.maintainInfo.notes.map((note, id) => (
                                  <li
                                    key={id}
                                    className="flex items-center justify-between px-3 py-2 border-b hover:bg-main-light group border-white/10"
                                  >
                                    <p className="text-slate-500">{note}</p>
                                    <button className="hidden transition-transform duration-150 active:scale-95 group-hover:block">
                                      <TrashIcon className="w-4 h-4 ml-2 text-slate-500 hover:text-slate-300" />
                                    </button>
                                  </li>
                                ))
                              )}
                            </ul>
                          </div>

                          <div className="flex flex-col w-1/2 mt-5 space-y-3">
                            <textarea
                              placeholder='Type defect and click "Add defect"'
                              className="p-2 border rounded-md focus:outline-none bg-transparent border-white/10 ring-offset-[#171820] ring-offset-2 text-slate-500 focus:ring ring-white/10 w-full placeholder:text-slate-500 resize-none"
                              rows={5}
                              value={defect}
                              onChange={(e) => setDefect(e.target.value)}
                            />

                            <button
                              onClick={addDefect}
                              disabled={!defect.trim()}
                              className="px-2 py-1 text-sm transition-all duration-300 ease-out border rounded-md border-slate-500 text-slate-500 hover:border-slate-300 hover:text-slate-300 active:scale-95 disabled:pointer-events-none"
                            >
                              Add defect
                            </button>
                          </div>
                        </main>
                      </Tab.Panel>

                      <Tab.Panel className="p-4 bg-main-light rounded-xl">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 text-center text-slate-300"
                        >
                          Services available for machine {machine.serialNumber}
                        </Dialog.Title>

                        <main className="flex justify-around mt-5">
                          <div className="flex flex-col justify-between w-1/3 h-56 p-4 border border-white/10 rounded-xl">
                            <p>
                              By sending machine to repair you inform the
                              service about the defect and request a repair.
                              While the machine is being repaired, it will be
                              unavailable for use.
                            </p>
                            <button
                              onClick={() =>
                                requestService(MACHINE_STATUSES.BROKEN)
                              }
                              className="w-full px-2 py-1 transition-all duration-200 ease-out bg-red-900 rounded-md shadow-sm shadow-black active:scale-95 hover:bg-red-800"
                            >
                              Send to repair
                            </button>
                          </div>

                          <div className="flex flex-col justify-between w-1/3 h-56 p-4 border border-white/10 rounded-xl">
                            <p>
                              By requesting service you inform the maintainers
                              about possible issues with the machine. The
                              machine will be checked and if necessary repaired.
                              While the machine is being repaired, it will be
                              unavailable for use.
                            </p>
                            <button
                              onClick={() =>
                                requestService(MACHINE_STATUSES.MAINTENANCE)
                              }
                              className="w-full px-2 py-1 transition-all duration-200 ease-out bg-yellow-900 rounded-md shadow-sm shadow-black active:scale-95 hover:bg-yellow-800"
                            >
                              Request service
                            </button>
                          </div>
                        </main>
                      </Tab.Panel>
                    </Tab.Panels>
                  </Tab.Group>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </Fragment>
  );
}
