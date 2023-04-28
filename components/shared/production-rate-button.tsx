import { Dispatch, Fragment, SetStateAction, useEffect, useState } from 'react';
import { BaseLoadingButton } from '../ui/base-loading-button';
import { Dialog, Transition } from '@headlessui/react';
import clsx from 'clsx';
import {
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  ShieldExclamationIcon,
} from '@heroicons/react/24/outline';
import { useMachineUpdate } from '@/hooks/use-machine-update';
import { useMachineStore } from '@/store';
import { getProductionRateLevel } from '@/common/helpers';

type Props = {
  serialNumber: string;
  productionRate: number;
  defaultRate: number;
  maxRate: number;
  minRate: number;
};

export const ProductionRateButton = ({
  serialNumber,
  productionRate,
  defaultRate,
  maxRate,
  minRate,
}: Props) => {
  const addMachine = useMachineStore((state) => state.addMachine);
  const { loading, doRequest } = useMachineUpdate();

  const [isOpen, setIsOpen] = useState(false);
  const [productionLevel, setProductionLevel] = useProductionRateLevel(
    productionRate,
    defaultRate,
    maxRate
  );

  const onRateChange = async () => {
    setIsOpen(false);

    const updatedMachine = await doRequest(serialNumber, {
      productionRate: getProductionRateFromLevel(),
    });
    addMachine(updatedMachine);
  };

  const hasLevelThree = () => {
    const level2Rate = defaultRate / 2 < maxRate ? maxRate : defaultRate / 2;
    const level3Rate = defaultRate / 3 < maxRate ? maxRate : defaultRate / 3;

    return level3Rate !== level2Rate;
  };

  const getProductionRateFromLevel = () => {
    if (productionLevel === 0) return minRate;
    if (productionLevel === 1) return defaultRate;
    if (productionLevel === 2)
      return defaultRate / 2 < maxRate ? maxRate : defaultRate / 2;
    if (productionLevel === 3)
      return defaultRate / 3 < maxRate ? maxRate : defaultRate / 3;
  };

  return (
    <main>
      <BaseLoadingButton
        onClick={() => setIsOpen(true)}
        loading={loading}
        style="w-40 py-2 text-sm border rounded-md shadow-md border-slate-400 text-slate-400 bg-slate-600/10 hover:bg-slate-600/30"
        text="Production rate"
        loadingText={false}
      />

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
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
                    {/* Level 0. */}
                    {minRate !== defaultRate ? (
                      <button
                        onClick={() => setProductionLevel(0)}
                        className={clsx(
                          'relative flex items-center justify-between w-full p-3 tracking-widest uppercase border-2 rounded-md shadow-md hover:opacity-100',
                          productionLevel === 0
                            ? 'border-slate-200'
                            : 'border-slate-600 opacity-40'
                        )}
                      >
                        Level 0
                        <ShieldExclamationIcon className="absolute h-8 text-slate-200 right-3" />
                      </button>
                    ) : null}

                    {/* Level 1. */}
                    <button
                      onClick={() => setProductionLevel(1)}
                      className={clsx(
                        'relative flex items-center w-full p-3 tracking-widest uppercase border-2 rounded-md shadow-md hover:opacity-100',
                        productionLevel === 1
                          ? 'border-green-600'
                          : 'border-slate-600 opacity-40'
                      )}
                    >
                      Level 1
                      <ExclamationCircleIcon className="absolute h-8 text-green-600 right-3" />
                    </button>

                    {maxRate === defaultRate ? null : (
                      <>
                        {/* Level 2. */}
                        <button
                          onClick={() => setProductionLevel(2)}
                          className={clsx(
                            'relative flex items-center w-full p-3 tracking-widest uppercase border-2 rounded-md shadow-md hover:opacity-100',
                            productionLevel === 2
                              ? 'border-amber-600'
                              : 'border-slate-600 opacity-40'
                          )}
                        >
                          Level 2
                          <ExclamationTriangleIcon className="absolute h-8 text-amber-600 right-3" />
                        </button>

                        {/* Level 3. */}
                        {hasLevelThree() ? (
                          <button
                            onClick={() => setProductionLevel(3)}
                            className={clsx(
                              'relative flex items-center w-full p-3 tracking-widest uppercase border-2 rounded-md shadow-md hover:opacity-100',
                              productionLevel === 3
                                ? 'border-red-600'
                                : 'border-slate-600 opacity-40'
                            )}
                          >
                            Level 3
                            <ExclamationTriangleIcon className="absolute h-8 text-red-600 right-3" />
                          </button>
                        ) : null}
                      </>
                    )}
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
