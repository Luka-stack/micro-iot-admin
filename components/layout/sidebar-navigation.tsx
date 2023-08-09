'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { ReactNode } from 'react';
import { HomeIcon, ChartBarIcon } from '@heroicons/react/24/solid';
import { usePathname } from 'next/navigation';

export const SidebarNavigation = () => {
  const pathname = usePathname();

  return (
    <main className="flex-none h-full p-4 w-52">
      <ul className="space-y-4">
        <li>
          <CustomLink
            href="/"
            text="Machines"
            selected={pathname === '/'}
            icon={<HomeIcon className="h-7 text-slate-300" />}
          />
        </li>
        <li>
          <CustomLink
            href="/work-progress"
            text="Work Progress"
            selected={pathname === '/work-progress'}
            icon={<ChartBarIcon className="h-7 text-slate-300" />}
          />
        </li>
      </ul>
    </main>
  );
};

function CustomLink({
  href,
  text,
  icon,
  selected = false,
}: {
  href: string;
  text: string;
  icon: ReactNode;
  selected?: boolean;
}) {
  return (
    <Link
      href={href}
      prefetch={false}
      className={clsx(
        'flex items-end space-x-4 py-1.5 rounded-lg px-2 cursor-pointer hover:scale-105',
        selected
          ? 'hover:bg-slate-400/30 bg-slate-400/20'
          : 'hover:bg-slate-400/20'
      )}
    >
      <>
        {icon}
        <span className="text-slate-300">{text}</span>
      </>
    </Link>
  );
}
