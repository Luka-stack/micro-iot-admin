'use client';

import { useSelectedLayoutSegment } from 'next/navigation';

import { LinkListItem } from '@/components/ui/LinkListItem';
import { LinkNestedItem } from '@/components/ui/LinkNestedItem';

type Props = {
  serialNumber: string;
};

export function DetailsNavigation({ serialNumber }: Props) {
  const segment = useSelectedLayoutSegment();

  return (
    <nav className="flex-shrink-0 border rounded-md w-72 main-gradient border-white/10">
      <ul className="p-4 space-y-4">
        <LinkListItem
          href={`/machines/${serialNumber}`}
          active={segment === null}
          text="Overview"
        />
        <LinkListItem
          href={`/machines/${serialNumber}/service-history`}
          active={segment === 'service-history'}
          text="Service History"
        />
        <LinkListItem
          href={`/machines/${serialNumber}/alerts`}
          active={segment === 'alerts'}
          text="Alerts"
        />
        <LinkListItem
          href={`/machines/${serialNumber}/shifts`}
          active={segment === 'shifts'}
          text="Shifts"
        />
        <LinkListItem
          href={`/machines/${serialNumber}/utilization`}
          active={segment === 'utilization' || segment === 'statistics'}
          text="Utilization"
        />

        <ul className="mt-3 ml-5 space-y-2">
          <LinkNestedItem
            href={`/machines/${serialNumber}/utilization`}
            active={segment === 'utilization'}
            text="Graph"
          />
          <LinkNestedItem
            href={`/machines/${serialNumber}/statistics`}
            active={segment === 'statistics'}
            text="Statistics"
          />
        </ul>
      </ul>
    </nav>
  );
}
