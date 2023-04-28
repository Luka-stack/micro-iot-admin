'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';

const TabNavigation = () => {
  const segment = useSelectedLayoutSegment();

  return (
    <nav className="w-full px-10 mb-6 text-lg border border-black rounded-md shadow-sm shadow-black">
      <ul className="flex py-4 space-x-20">
        <li>
          <Link
            href={`/machines/4c48d884-b055-11ed-afa1`}
            className={clsx(
              'px-3 pb-1 hover:border-indigo-800/50 hover:border-b-4 hover:text-slate-300',
              !segment && 'border-b-4 border-indigo-800 pointer-events-none'
            )}
          >
            Overview
          </Link>
        </li>
        <li>
          <Link
            href="/machines/4c48d884-b055-11ed-afa1/alerts"
            className={clsx(
              'px-3 pb-1 hover:border-indigo-800/50 hover:border-b-4 hover:text-slate-300',
              segment === 'alerts' && 'border-b-4 border-indigo-800'
            )}
          >
            Alerts
          </Link>
        </li>
        <li>
          <Link
            href="/machines/4c48d884-b055-11ed-afa1/shifts"
            className={clsx(
              'px-3 pb-1 hover:border-indigo-800/50 hover:border-b-4 hover:text-slate-300',
              segment === 'shifts' && 'border-b-4 border-indigo-800'
            )}
          >
            Shifts
          </Link>
        </li>
        <li>
          <Link
            href="/machines/4c48d884-b055-11ed-afa1/utilization"
            className={clsx(
              'px-3 pb-1 hover:border-indigo-800/50 hover:border-b-4 hover:text-slate-300',
              segment === 'utilization' && 'border-b-4 border-indigo-800'
            )}
          >
            Utilization
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default TabNavigation;
