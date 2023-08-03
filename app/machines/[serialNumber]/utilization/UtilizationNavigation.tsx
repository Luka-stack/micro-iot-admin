'use client';

import clsx from 'clsx';
import {
  ChartBarIcon,
  ClipboardDocumentListIcon,
} from '@heroicons/react/24/outline';

type Props = {
  tab: 'graph' | 'stats';
  setTab: (tab: 'graph' | 'stats') => void;
};

export function UtilizationNavigation({ tab, setTab }: Props) {
  console.log(tab);

  return (
    <nav className="flex mb-10 border-b border-slate-800">
      <button
        onClick={() => setTab('graph')}
        className={clsx(
          'inline-flex items-center gap-2 py-4 font-semibold hover:border-indigo-800 px-7 hover:border-b-2',
          tab === 'graph'
            ? 'border-b-4 border-indigo-800 pointer-events-none'
            : 'border-b-2 border-transparent'
        )}
      >
        <ChartBarIcon className="w-5" />
        Graph
      </button>
      <button
        onClick={() => setTab('stats')}
        className={clsx(
          'inline-flex items-center gap-2 py-4 font-semibold hover:border-indigo-800 px-7 hover:border-b-2',
          tab === 'stats'
            ? 'border-b-4 border-indigo-800 pointer-events-none'
            : 'border-b-2 border-transparent'
        )}
      >
        <ClipboardDocumentListIcon className="w-5" />
        Statistics
      </button>
    </nav>
  );
}
