import { HomeIcon, ChartBarIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

export const SidebarNavigation = () => {
  return (
    <main className="flex-none w-48 h-full px-2 py-4 rounded-r-lg shadow-sm shadow-slate-300">
      <ul className="space-y-4">
        <li>
          <Link
            href="/"
            className="flex items-center space-x-2 py-1.5 rounded-lg px-2 cursor-pointer hover:scale-105 hover:bg-slate-800/90 bg-indigo-500/20"
          >
            <>
              <HomeIcon className="text-indigo-500 h-7" />
              <span className="font-bold text-indigo-500">Machines</span>
            </>
          </Link>
        </li>
        <li className="flex items-center space-x-2 py-1.5 rounded-lg px-2 cursor-pointer hover:scale-105 hover:bg-slate-800/90">
          <ChartBarIcon className="h-7" />
          <span>Vizualization</span>
        </li>
      </ul>
    </main>
  );
};
