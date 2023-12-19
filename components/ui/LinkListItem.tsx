import clsx from 'clsx';
import Link from 'next/link';
import { PaperAirplaneIcon } from '@heroicons/react/20/solid';

type Props = {
  href: string;
  text: string;
  active: boolean;
};

export function LinkListItem({ href, text, active }: Props) {
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
