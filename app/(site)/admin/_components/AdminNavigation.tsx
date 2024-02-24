'use client';

import { LinkListItem } from '@/components/ui/LinkListItem';
import { useSelectedLayoutSegment } from 'next/navigation';

export function AdminNavigation() {
  const segment = useSelectedLayoutSegment();

  return (
    <nav className="border rounded-md w-72 main-gradient border-white/10">
      <ul className="p-4 space-y-4">
        <LinkListItem
          href={`/`}
          active={segment === null}
          text="Machine assignment"
        />
      </ul>
    </nav>
  );
}
