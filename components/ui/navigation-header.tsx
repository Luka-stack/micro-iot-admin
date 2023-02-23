import { Bars3Icon } from '@heroicons/react/24/outline';

export const NavigationHeader = () => {
  return (
    <header className="flex justify-between shadow-sm shadow-slate-700 py-3 items-center px-4">
      <div>
        <Bars3Icon className="h-9" />
      </div>

      <div className="flex space-x-10 items-center">
        <h4 className="text-lg">
          Hello, <b>John</b>
        </h4>
        <button className="bg-slate-800 rounded-md py-1 px-4 text-slate-400 text-sm hover:bg-slate-700">
          Log Out
        </button>
      </div>
    </header>
  );
};
