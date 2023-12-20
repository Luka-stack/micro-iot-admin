import { twMerge } from 'tailwind-merge';

export function TableData({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return <td className={twMerge('py-5', className)}>{children}</td>;
}
