'use client';

import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';
import { useSelectedLayoutSegments } from 'next/navigation';

export const GlobalNavigation = () => {
  const segments = useSelectedLayoutSegments();

  return (
    <header className="flex items-center justify-between flex-none h-20 p-4">
      {/* IMG */}
      <Image src={'/logo.png'} alt="iot logo" width={64} height={64} />

      {/* Navigation */}
      <nav>
        <ul className="flex items-center space-x-10">
          <ListItem href="/" active={segments.length === 0} text="Machines" />
          <ListItem
            href="/machines/production"
            active={segments.includes('production')}
            text="Production"
          />
          <ListItem
            href="#"
            active={segments.includes('alerts')}
            text="Alerts"
          />
          <ListItem
            href="#"
            active={segments.includes('maintenance')}
            text="Maintenance"
          />
        </ul>
      </nav>

      {/* User */}
      <div>
        <p className="text-xs text-slate-500">Admin</p>
        <h3>Takahiro Hayami</h3>
      </div>
    </header>
  );
};

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
          'px-4 py-2 rounded-md cursor-pointer main-gradient-hover',
          active && 'main-gradient pointer-events-none'
        )}
      >
        {text}
      </Link>
    </li>
  );
}
