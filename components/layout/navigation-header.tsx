import { Bars3Icon } from '@heroicons/react/24/outline';

export const NavigationHeader = () => {
  return (
    <header className="flex items-center justify-between flex-none p-4">
      <div>
        <Bars3Icon className="h-9" />
      </div>

      <div className="flex items-center space-x-10">
        <h4 className="text-lg">
          Hello, <b>John</b>
        </h4>
        <button className="px-4 py-1 text-sm rounded-md bg-slate-800 text-slate-400 hover:bg-slate-700">
          Log Out
        </button>
      </div>
    </header>
  );
};
