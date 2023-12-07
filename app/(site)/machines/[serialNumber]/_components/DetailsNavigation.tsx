'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { useSelectedLayoutSegment } from 'next/navigation';

type Props = {
  serialNumber: string;
};

export function DetailsNavigation({ serialNumber }: Props) {
  const segment = useSelectedLayoutSegment();

  return (
    <nav className="border rounded-md w-72 main-gradient border-white/10">
      <ul className="p-4 space-y-4">
        <ListItem
          href={`/machines/${serialNumber}`}
          active={segment === null}
          text="Overview"
        />
        <ListItem
          href={`/machines/${serialNumber}/alerts`}
          active={segment === 'alerts'}
          text="Alerts"
        />
        <ListItem
          href={`/machines/${serialNumber}/shifts`}
          active={segment === 'shifts'}
          text="Shifts"
        />
        <ListItem
          href={`/machines/${serialNumber}/utilization`}
          active={segment === 'utilization' || segment === 'statistics'}
          text="Utilization"
        />

        <ul className="mt-3 ml-5 space-y-2">
          <NestedListItem
            href={`/machines/${serialNumber}/utilization`}
            active={segment === 'utilization'}
            text="Graph"
          />
          <NestedListItem
            href={`/machines/${serialNumber}/statistics`}
            active={segment === 'statistics'}
            text="Statistics"
          />
        </ul>
      </ul>
    </nav>
  );
}

function ListItem({
  href,
  text,
  active,
}: {
  href: string;
  text: string;
  active: boolean;
}) {
  return (
    <li>
      <Link
        href={href}
        className={clsx(
          'flex p-2 space-x-4 rounded-md hover:bg-slate-900',
          active && 'bg-slate-900 pointer-events-none'
        )}
      >
        <PaperAirplaneIcon className="w-7" />
        <p className="text-lg">{text}</p>
      </Link>
    </li>
  );
}

function NestedListItem({
  href,
  text,
  active,
}: {
  href: string;
  text: string;
  active: boolean;
}) {
  return (
    <li>
      <Link
        href={href}
        className={clsx(
          'flex p-1 space-x-4 rounded-md hover:bg-slate-900',
          active && 'bg-slate-900 pointer-events-none'
        )}
      >
        <PaperAirplaneIcon className="w-5" />
        <p>{text}</p>
      </Link>
    </li>
  );
}
