'use client';

import clsx from 'clsx';

import { useSignIn } from './use-sign-in';
import { ClientSubmitButton } from '@/components/SubmitButton';

export function SignUp() {
  const { loading, errors, submit } = useSignIn();

  return (
    <form className="w-2/3 space-y-6" onSubmit={submit}>
      <div className="flex flex-col space-y-2">
        <label className="text-sm" htmlFor="email">
          Your Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email"
          className={clsx(
            'px-2 py-2 rounded-lg shadow-md bg-slate-900 placeholder:text-slate-500 focus:outline-none shadow-black/60 hover:bg-slate-800',
            { 'ring-2 ring-red-900': errors?.email }
          )}
        />
        <p className="text-sm text-red-800">{errors?.email}</p>
      </div>

      <div className="flex flex-col space-y-2">
        <label className="text-sm" htmlFor="displayName">
          Your Display Name
        </label>
        <input
          type="text"
          name="displayName"
          id="displayName"
          placeholder="Enter your display name"
          className={clsx(
            'px-2 py-2 rounded-lg shadow-md bg-slate-900 placeholder:text-slate-500 focus:outline-none shadow-black/60 hover:bg-slate-800',
            { 'ring-2 ring-red-900': errors?.displayName }
          )}
        />
        <p className="text-sm text-red-800">{errors?.displayName}</p>
      </div>

      <div className="flex flex-col space-y-2">
        <label className="text-sm" htmlFor="password">
          Your Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="************"
          className={clsx(
            'px-2 pt-3 pb-1 rounded-lg shadow-md bg-slate-900 placeholder:text-slate-500 focus:outline-none shadow-black/60 hover:bg-slate-800',
            { 'ring-2 ring-red-900': errors?.password }
          )}
        />
        <p className="text-sm text-red-800">{errors?.password}</p>
      </div>

      <div className="flex flex-col space-y-2">
        <label className="text-sm" htmlFor="confirmPassword">
          Confirm Password
        </label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="************"
          className={clsx(
            'px-2 pt-3 pb-1 rounded-lg shadow-md bg-slate-900 placeholder:text-slate-500 focus:outline-none shadow-black/60 hover:bg-slate-800',
            { 'ring-2 ring-red-900': errors?.confirmPassword }
          )}
        />
        <p className="text-sm text-red-800">{errors?.confirmPassword}</p>
      </div>

      <ClientSubmitButton label="Sign Up" pending={loading} />
    </form>
  );
}
