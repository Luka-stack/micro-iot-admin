import clsx from 'clsx';
import { Dialog, Transition } from '@headlessui/react';
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from 'react';
import {
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  ShieldExclamationIcon,
} from '@heroicons/react/24/outline';

import { Machine } from '@/types';
import { getProductionRateLevel } from '@/lib/helpers';

type Props = {
  machine: Machine;
  visible: boolean;
  close: () => void;
  updateAction: (rate: number) => void;
};

export function MachineProductionModal({
  machine: { model, productionRate },
  visible,
  close,
  updateAction,
}: Props) {
  const [productionLevel, setProductionLevel] = useProductionRateLevel(
    productionRate,
    model.defaultRate,
    model.maxRate
  );

  const onRateChange = async () => {
    close();
    updateAction(getProductionRateFromLevel());
  };

  const getProductionRateFromLevel = () => {
    if (productionLevel === 0) return model.minRate;

    if (productionLevel === 1) return model.defaultRate;

    if (productionLevel === 2)
      return model.defaultRate / 2 < model.maxRate
        ? model.maxRate
        : model.defaultRate / 2;

    return model.defaultRate / 3 < model.maxRate
      ? model.maxRate
      : model.defaultRate / 3;
  };

  return (
    <Transition appear show={visible} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={close}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-opacity-50 bg-black/25" />
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
              <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform shadow-md bg-main rounded-2xl shadow-black">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-300"
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
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium transition-all duration-150 ease-out border border-transparent rounded-md bg-slate-800 text-slate-300 hover:bg-slate-700 active:scale-95"
                    onClick={close}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium transition-all duration-150 ease-out bg-blue-900 border border-transparent rounded-md text-slate-300 hover:bg-blue-800 active:scale-95 "
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
  );
}

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
  if (model.minRate === model.defaultRate) {
    return null;
  }

  return (
    <button
      onClick={() => setLevel(0)}
      className={clsx(
        'relative flex items-center justify-between w-full p-3 tracking-widest uppercase border-2 rounded-md shadow-md hover:opacity-100',
        level === 0
          ? 'border-slate-400 text-slate-400'
          : 'border-slate-500 opacity-40 text-slate-500'
      )}
    >
      Level 0
      <ShieldExclamationIcon className="absolute h-8 text-slate-400 right-3" />
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
        'relative flex items-center w-full p-3 tracking-widest uppercase border-2 rounded-md shadow-md group transition-colors duration-200 ease-out',
        level === 1
          ? 'border-green-700 text-green-600 opacity-100'
          : 'border-slate-500 opacity-40 text-slate-500 hover:border-green-500 hover:text-green-500'
      )}
    >
      Level 1
      <ExclamationCircleIcon
        className={clsx(
          'absolute h-8 right-3 transition-colors duration-200 ease-out',
          level === 1
            ? 'text-green-700'
            : 'text-slate-500 group-hover:text-green-500'
        )}
      />
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
        'relative flex items-center w-full p-3 tracking-widest uppercase border-2 rounded-md shadow-md group transition-colors duration-200 ease-out',
        level === 2
          ? 'border-amber-700 text-amber-600 opacity-100'
          : 'border-slate-500 opacity-40 text-slate-500 hover:border-amber-500 hover:text-amber-500'
      )}
    >
      Level 2
      <ExclamationTriangleIcon
        className={clsx(
          'absolute h-8 right-3 transition-colors duration-200 ease-out',
          level === 2
            ? 'text-amber-700'
            : 'text-amber-500 group-hover:text-amber-500'
        )}
      />
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

  if (!hasLevelThree()) {
    return null;
  }

  return (
    <button
      onClick={() => setLevel(3)}
      className={clsx(
        'relative flex items-center w-full p-3 tracking-widest uppercase border-2 rounded-md shadow-md transition-colors duration-200 ease-out',
        level === 3
          ? 'border-red-700 text-red-600 opacity-100'
          : 'border-slate-500 opacity-40 text-slate-500 hover:border-red-500 hover:text-red-500'
      )}
    >
      Level 3
      <ExclamationTriangleIcon
        className={clsx(
          'absolute h-8 right-3  transition-colors duration-200 ease-out',
          level === 3 ? 'text-red-700' : 'text-red-500 group-hover:text-red-500'
        )}
      />
    </button>
  );
}
