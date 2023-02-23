'use client';

import clsx from 'clsx';

type Props = {
  isWorking: boolean;
};

export const StatusToggle = ({ isWorking }: Props) => {
  return (
    <div className="flex flex-col mt-8 space-y-5">
      <button
        className={clsx(
          'py-2 text-sm  border rounded-md shadow-md w-40',
          isWorking
            ? 'text-red-700 border-red-700 bg-red-900/10 hover:bg-red-900/30'
            : 'text-green-700 border-green-700 bg-green-900/10 hover:bg-green-900/30'
        )}
      >
        {isWorking ? 'Stop' : 'Start'} Machine
      </button>

      {/* <button className="w-40 py-2 text-sm text-blue-500 border border-blue-600 rounded-md shadow-md bg-blue-600/10 hover:bg-blue-600/30"> */}
      <button className="w-40 py-2 text-sm border rounded-md shadow-md border-slate-400 text-slate-400 bg-slate-600/10 hover:bg-slate-600/30">
        Production rate
      </button>

      <button className="w-40 py-2 text-sm border rounded-md shadow-md border-slate-400 text-slate-400 bg-slate-600/10 hover:bg-slate-600/30">
        {/* <button className="w-40 px-2 py-2 text-sm text-blue-500 border border-blue-600 rounded-md shadow-md bg-blue-600/10 hover:bg-blue-600/30"> */}
        Report Defect
      </button>
      {/* <button className="w-40 py-2 text-sm text-blue-500 border border-blue-600 rounded-md shadow-md bg-blue-600/10 hover:bg-blue-600/30"> */}
      <button className="w-40 py-2 text-sm border rounded-md shadow-md border-slate-400 text-slate-400 bg-slate-600/10 hover:bg-slate-600/30">
        Assign Maintenance
      </button>
    </div>
  );
};
