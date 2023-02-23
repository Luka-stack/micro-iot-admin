import { HomeIcon, ChartBarIcon } from '@heroicons/react/24/solid';

export const SidebarNavigation = () => {
  return (
    <main className="h-full w-48 py-4 shadow-sm shadow-slate-300 rounded-lg px-2">
      <ul className="space-y-4">
        <li className="flex items-center space-x-2 py-1.5 rounded-lg px-2 cursor-pointer hover:scale-105 hover:bg-slate-800/90 bg-indigo-500/20">
          <HomeIcon className="h-7 text-indigo-500" />
          <span className="font-bold text-indigo-500">Machines</span>
        </li>
        <li className="flex items-center space-x-2 py-1.5 rounded-lg px-2 cursor-pointer hover:scale-105 hover:bg-slate-800/90">
          <ChartBarIcon className="h-7" />
          <span>Vizualization</span>
        </li>
      </ul>
    </main>
  );
};
