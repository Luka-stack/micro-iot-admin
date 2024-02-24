import { twMerge } from 'tailwind-merge';

export function TableHeader({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <th
      scope="col"
      className={twMerge(
        'py-2 text-sm font-medium text-left text-slate-400',
        className
      )}
    >
      {children}
    </th>
  );
}
