'use client';

import Link from 'next/link';
import {
  ChartBarIcon,
  ClipboardDocumentListIcon,
} from '@heroicons/react/24/outline';
import { useSelectedLayoutSegment } from 'next/navigation';
import clsx from 'clsx';

type Props = {
  serialNumber: string;
};

export function TabNavigation({ serialNumber }: Props) {
  const segment = useSelectedLayoutSegment();

  return (
    <nav className="flex mb-10 border-b border-slate-800">
      <Link
        href={`machines/${serialNumber}/utilization`}
        className={clsx(
          'inline-flex items-center gap-2 py-4 font-semibold hover:border-indigo-800 px-7 hover:border-b-2',
          segment
            ? 'border-b-2 border-transparent'
            : 'border-b-4 border-indigo-800 pointer-events-none'
        )}
      >
        <ChartBarIcon className="w-5" />
        Graph
      </Link>
      <Link
        href={`machines/${serialNumber}/utilization/stats`}
        className={clsx(
          'inline-flex items-center gap-2 py-4 font-semibold hover:border-indigo-800 px-7 hover:border-b-2',
          segment !== 'stats'
            ? 'border-b-2 border-transparent'
            : 'border-b-4 border-indigo-800 pointer-events-none'
        )}
      >
        <ClipboardDocumentListIcon className="w-5" />
        Statistics
      </Link>
    </nav>
  );
}
