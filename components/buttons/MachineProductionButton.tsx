'use client';

import clsx from 'clsx';
import { Dialog, Transition } from '@headlessui/react';
import {
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  ShieldExclamationIcon,
} from '@heroicons/react/24/outline';
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from 'react';

import { Machine } from '@/types';
import { BaseLoadingButton } from '../ui/base-loading-button';
import { getProductionRateLevel } from '@/common/helpers';

type Props = {
  machine: Machine;
  loading: boolean;
  updateAction: (rate: number) => void;
};

export const MachineProductionButton = ({
  machine: { model, productionRate },
  loading,
  updateAction,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [productionLevel, setProductionLevel] = useProductionRateLevel(
    productionRate,
    model.defaultRate,
    model.maxRate
  );

  const onRateChange = async () => {
    setIsOpen(false);
    updateAction(getProductionRateFromLevel());
  };

  const getProductionRateFromLevel = () => {
    if (productionLevel === 0) return model.minRate;

    if (productionLevel === 1) return model.defaultRate;

    if (productionLevel === 2)
      return model.defaultRate / 2 < model.maxRate
        ? model.maxRate
        : model.defaultRate / 2;

    // if (productionLevel === 3)
    return model.defaultRate / 3 < model.maxRate
      ? model.maxRate
      : model.defaultRate / 3;
  };

  return (
    <main>
      <BaseLoadingButton
        onClick={() => setIsOpen(true)}
        loading={loading}
        style="w-40 py-2 border-2 rounded-md shadow-md border-slate-400 text-slate-400 bg-slate-600/20 hover:bg-slate-600/30"
        text="Production rate"
        loadingText={false}
      />

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-opacity-25 bg-slate-800" />
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
                <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform shadow-md bg-slate-800 rounded-2xl shadow-black">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-200"
                  >
                    Production Rate Levels
                  </Dialog.Title>

                  <div className="mt-5 space-y-4">
                    <LevelZero
                      model={model}
                      level={productionLevel}
                      setLevel={setProductionLevel}
                    />
                    <LevelOne
                      level={productionLevel}
                      setLevel={setProductionLevel}
                    />

                    <LevelTwo
                      model={model}
                      level={productionLevel}
                      setLevel={setProductionLevel}
                    />

                    <LevelThree
                      model={model}
                      level={productionLevel}
                      setLevel={setProductionLevel}
                    />
                  </div>

                  <div className="flex justify-end mt-4 space-x-5">
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium border border-transparent rounded-md bg-slate-700 text-slate-200 hover:bg-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => setIsOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium bg-blue-900 border border-transparent rounded-md text-slate-200 hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={onRateChange}
                    >
                      Change
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </main>
  );
};

function useProductionRateLevel(
  rate: number,
  defaultRate: number,
  maxRate: number
): [number, Dispatch<SetStateAction<number>>] {
  const [productionLevel, setProductionLevel] = useState(0);

  useEffect(() => {
    setProductionLevel(getProductionRateLevel(rate, defaultRate, maxRate));
  }, [rate, defaultRate, maxRate]);

  return [productionLevel, setProductionLevel];
}

function LevelZero({
  model,
  level,
  setLevel,
}: {
  model: { minRate: number; defaultRate: number };
  level: number;
  setLevel: (level: number) => void;
}) {
  if (model.minRate !== model.defaultRate) {
    return null;
  }

  return (
    <button
      onClick={() => setLevel(0)}
      className={clsx(
        'relative flex items-center justify-between w-full p-3 tracking-widest uppercase border-2 rounded-md shadow-md hover:opacity-100',
        level === 0 ? 'border-slate-200' : 'border-slate-600 opacity-40'
      )}
    >
      Level 0
      <ShieldExclamationIcon className="absolute h-8 text-slate-200 right-3" />
    </button>
  );
}

function LevelOne({
  level,
  setLevel,
}: {
  level: number;
  setLevel: (level: number) => void;
}) {
  return (
    <button
      onClick={() => setLevel(1)}
      className={clsx(
        'relative flex items-center w-full p-3 tracking-widest uppercase border-2 rounded-md shadow-md hover:opacity-100',
        level === 1 ? 'border-green-600' : 'border-slate-600 opacity-40'
      )}
    >
      Level 1
      <ExclamationCircleIcon className="absolute h-8 text-green-600 right-3" />
    </button>
  );
}

function LevelTwo({
  model,
  level,
  setLevel,
}: {
  model: { maxRate: number; defaultRate: number };
  level: number;
  setLevel: (level: number) => void;
}) {
  if (model.maxRate === model.defaultRate) {
    return null;
  }

  return (
    <button
      onClick={() => setLevel(2)}
      className={clsx(
        'relative flex items-center w-full p-3 tracking-widest uppercase border-2 rounded-md shadow-md hover:opacity-100',
        level === 2 ? 'border-amber-600' : 'border-slate-600 opacity-40'
      )}
    >
      Level 2
      <ExclamationTriangleIcon className="absolute h-8 text-amber-600 right-3" />
    </button>
  );
}

function LevelThree({
  model,
  level,
  setLevel,
}: {
  model: { maxRate: number; defaultRate: number };
  level: number;
  setLevel: (level: number) => void;
}) {
  const hasLevelThree = () => {
    if (model.maxRate === model.defaultRate) {
      return false;
    }

    const level2Rate =
      model.defaultRate / 2 < model.maxRate
        ? model.maxRate
        : model.defaultRate / 2;
    const level3Rate =
      model.defaultRate / 3 < model.maxRate
        ? model.maxRate
        : model.defaultRate / 3;

    return level3Rate !== level2Rate;
  };

  if (hasLevelThree()) {
    return null;
  }

  return (
    <button
      onClick={() => setLevel(3)}
      className={clsx(
        'relative flex items-center w-full p-3 tracking-widest uppercase border-2 rounded-md shadow-md hover:opacity-100',
        level === 3 ? 'border-red-600' : 'border-slate-600 opacity-40'
      )}
    >
      Level 3
      <ExclamationTriangleIcon className="absolute h-8 text-red-600 right-3" />
    </button>
  );
}
