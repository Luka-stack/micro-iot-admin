'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';

type Props = {
  serialNumber: string;
};

export function TabNavigation({ serialNumber }: Props) {
  const segment = useSelectedLayoutSegment();

  return (
    <nav className="flex mb-2 border-b border-slate-800">
      <Link
        href={`/machines/${serialNumber}`}
        className={clsx(
          'inline-flex items-center gap-2 pb-4 font-semibold px-7 hover:border-b-2 hover:border-indigo-800',
          segment
            ? 'border-b-2 border-transparent'
            : 'border-b-4 border-indigo-800 pointer-events-none'
        )}
      >
        Overview
      </Link>
      <Link
        href={`/machines/${serialNumber}/alerts`}
        className={clsx(
          'inline-flex items-center gap-2 pb-4 font-semibold px-7 hover:border-b-2 hover:border-indigo-800',
          segment === 'alerts'
            ? 'border-b-4 border-indigo-800 pointer-events-none'
            : 'border-b-2 border-transparent'
        )}
      >
        Alerts
      </Link>
      <Link
        href={`/machines/${serialNumber}/shifts`}
        className={clsx(
          'inline-flex items-center gap-2 pb-4 font-semibold px-7 hover:border-b-2 hover:border-indigo-800',
          segment === 'shifts'
            ? 'border-b-4 border-indigo-800 pointer-events-none'
            : 'border-b-2 border-transparent'
        )}
      >
        Shifts
      </Link>
      <Link
        href={`/machines/${serialNumber}/utilization`}
        className={clsx(
          'inline-flex items-center gap-2 pb-4 font-semibold px-7 hover:border-b-2 hover:border-indigo-800',
          segment === 'utilization'
            ? 'border-b-4 border-indigo-800 pointer-events-none'
            : 'border-b-2 border-transparent'
        )}
      >
        Utilization
      </Link>
    </nav>
  );
}
