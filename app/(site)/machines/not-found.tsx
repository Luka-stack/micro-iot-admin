import { Dokdo } from 'next/font/google';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

const dokdo = Dokdo({ weight: '400', subsets: ['latin'] });

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h1 className={twMerge('text-[14rem] error-title', dokdo.className)}>
        Oops!
      </h1>
      <h3 className="-mt-20 text-2xl">404 - Machine not found</h3>
      <div className="flex flex-col items-center mt-5 space-y-5 w-96">
        <p className="text-center">
          The machine you are looking for might have been removed, you might not
          have access to it or is temporarily unavailable.
        </p>
        <Link
          href={'/'}
          className="px-4 py-2 transition bg-blue-900 rounded-md shadow-md shadow-black hover:bg-blue-950 active:scale-95"
        >
          Go To Homepage
        </Link>
      </div>
    </div>
  );
}
