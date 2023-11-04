'use client';

import { useFormStatus } from 'react-dom';

type ServerButtomProps = {
  label: string;
};

function ServerSubmitButton({ label }: ServerButtomProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      aria-disabled={pending}
      disabled={pending}
      className="flex items-center justify-center w-full py-2 bg-blue-900 rounded-md shadow-md cursor-pointer text-slate-200 hover:bg-blue-800 shadow-black/60"
    >
      {label}
    </button>
  );
}

type ClientSubmitProps = {
  label: string;
  pending: boolean;
};

function ClientSubmitButton({ label, pending }: ClientSubmitProps) {
  return (
    <button
      type="submit"
      aria-disabled={pending}
      disabled={pending}
      className="flex items-center justify-center w-full py-2 bg-blue-900 rounded-md shadow-md cursor-pointer text-slate-200 hover:bg-blue-800 shadow-black/60"
    >
      {label}
    </button>
  );
}

export { ServerSubmitButton, ClientSubmitButton };
