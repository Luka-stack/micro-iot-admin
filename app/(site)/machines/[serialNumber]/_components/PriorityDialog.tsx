import clsx from 'clsx';
import { Fragment, useState } from 'react';
import {
  Bars2Icon,
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
} from '@heroicons/react/24/outline';

import { Machine } from '@/types';
import { changePriority } from '@/app/actions';
import { Dialog, Transition } from '@headlessui/react';

type Props = {
  machine: Machine;
  update: (data: Partial<Machine>) => void;
};

export function PriorityDialog({ machine, update }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [priority, setPriority] = useState(
    machine.maintainInfo.priority.toLowerCase()
  );

  const closeModal = () => {
    setIsOpen(false);
  };

  const showModal = () => {
    setIsOpen(true);
  };

  const updatePriority = async (priority: string) => {
    const updatedInfo = {
      maintainInfo: {
        ...machine.maintainInfo,
        priority,
      },
    };

    update(updatedInfo);
    setPriority(priority);

    changePriority(machine.serialNumber, priority.toUpperCase());

    setIsOpen(false);
  };

  return (
    <Fragment>
      <PriorityButton
        onClick={showModal}
        priority={priority}
        variant="button"
      />

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
                <Dialog.Panel className="p-6 overflow-hidden text-left align-middle transition-all transform shadow-xl w-fit bg-main rounded-2xl">
                  <main className="flex space-x-10">
                    <PriorityButton
                      onClick={() => updatePriority('low')}
                      priority="low"
                      variant={priority === 'low' ? 'selected' : 'button'}
                    />

                    <PriorityButton
                      onClick={() => updatePriority('normal')}
                      priority="normal"
                      variant={priority === 'normal' ? 'selected' : 'button'}
                    />

                    <PriorityButton
                      onClick={() => updatePriority('high')}
                      priority="high"
                      variant={priority === 'high' ? 'selected' : 'button'}
                    />
                  </main>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </Fragment>
  );
}

function PriorityButton({
  variant,
  priority,
  onClick,
}: {
  variant: 'button' | 'selected';
  priority: string;
  onClick: () => void;
}) {
  if (priority === 'normal') {
    return (
      <button
        onClick={onClick}
        className={clsx(
          'flex flex-col items-center justify-center row-span-2 px-3 space-y-2 transition-all duration-300 ease-in-out rounded-md hover:bg-[#22232f] hover:shadow-sm shadow-black group active:scale-95',
          variant === 'selected' && 'bg-[#22232f] shadow-sm'
        )}
      >
        <Bars2Icon
          className={clsx(
            'h-12 text-slate-500 group-hover:text-slate-300',
            variant === 'selected' && '!text-slate-300'
          )}
        />
        <p
          className={clsx(
            'text-slate-500 group-hover:text-slate-300',
            variant === 'selected' && '!text-slate-300'
          )}
        >
          Normal Priority
        </p>
      </button>
    );
  }

  if (priority === 'high') {
    return (
      <button
        onClick={onClick}
        className={clsx(
          'flex flex-col items-center justify-center p-4 space-y-2 transition-all duration-300 ease-in-out rounded-md hover:bg-[#22232f] hover:shadow-sm shadow-black group active:scale-95',
          variant === 'selected' && 'bg-[#22232f] shadow-sm'
        )}
      >
        <ChevronDoubleUpIcon
          className={clsx(
            'h-12 text-red-900 group-hover:text-red-700',
            variant === 'selected' && '!text-red-700'
          )}
        />
        <p
          className={clsx(
            'text-red-900 group-hover:text-red-700',
            variant === 'selected' && '!text-red-700'
          )}
        >
          High Priority
        </p>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className={clsx(
        'flex flex-col items-center justify-center p-4 space-y-2 transition-all duration-300 ease-in-out rounded-md hover:bg-[#22232f] hover:shadow-sm shadow-black group active:scale-95',
        variant === 'selected' && 'bg-[#22232f] shadow-sm'
      )}
    >
      <ChevronDoubleDownIcon
        className={clsx(
          'h-12 text-blue-900 group-hover:text-blue-700',
          variant === 'selected' && '!text-blue-700'
        )}
      />
      <p
        className={clsx(
          'text-blue-900 group-hover:text-blue-700',
          variant === 'selected' && '!text-blue-700'
        )}
      >
        Low Priority
      </p>
    </button>
  );
}
