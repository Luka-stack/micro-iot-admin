'use client';

// @ts-ignore
import { experimental_useFormStatus as useFormStatus } from 'react-dom';

type Props = {
  label: string;
};

export function SubmitButton({ label }: Props) {
  const { pending } = useFormStatus();
  console.log('pending', pending);

  return (
    <button
      type="submit"
      aria-disabled={pending}
      className="flex items-center justify-center w-full py-2 bg-blue-900 rounded-md shadow-md cursor-pointer text-slate-200 hover:bg-blue-800 shadow-black/60"
    >
      {label}
    </button>
  );
}
