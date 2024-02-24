'use client';

import { Dokdo } from 'next/font/google';
import { twMerge } from 'tailwind-merge';

const dokdo = Dokdo({ weight: '400', subsets: ['latin'] });

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h1 className={twMerge('text-[14rem] error-title', dokdo.className)}>
        Oops!
      </h1>
      <h3 className="-mt-20 text-2xl">Internal Server Error</h3>
      <div className="flex flex-col items-center mt-5 space-y-5 w-96">
        <p className="text-center">
          We expericed some problems while rendering the page for you. Please
          try later.
        </p>
        <button
          onClick={reset}
          className="w-32 py-2 transition bg-blue-900 rounded-md shadow-md shadow-black hover:bg-blue-950 active:scale-95"
        >
          Refresh Page
        </button>
      </div>
    </div>
  );
}
