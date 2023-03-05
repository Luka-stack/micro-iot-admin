'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';

export const TabNavigation = () => {
  const segment = useSelectedLayoutSegment();

  return (
    <nav className="w-full text-lg">
      <ul className="flex">
        <li
          className={clsx(
            'w-1/4 py-2',
            !segment && 'border-indigo-700 border-b-4'
          )}
        >
          <Link
            className="block w-full pl-6"
            href={`/machines/4c48d884-b055-11ed-afa1`}
          >
            Overview
          </Link>
        </li>
        <li
          className={clsx(
            'w-1/4 py-2',
            segment === 'alerts' && 'border-indigo-700 border-b-4'
          )}
        >
          <Link
            href="/machines/4c48d884-b055-11ed-afa1/alerts"
            className="block w-full pl-6"
          >
            Alerts
          </Link>
        </li>
        <li
          className={clsx(
            'w-1/4 py-2',
            segment === 'shifts' && 'border-indigo-700 border-b-4'
          )}
        >
          <Link
            href="/machines/4c48d884-b055-11ed-afa1/shifts"
            className="block w-full pl-6"
          >
            Shifts
          </Link>
        </li>
        <li
          className={clsx(
            'w-1/4 py-2',
            segment === 'utilization' && 'border-indigo-700 border-b-4'
          )}
        >
          <Link
            href="/machines/4c48d884-b055-11ed-afa1/utilization"
            className="block w-full pl-6"
          >
            Utilization
          </Link>
        </li>
      </ul>
    </nav>
  );
};
