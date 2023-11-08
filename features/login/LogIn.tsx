'use client';

import { ClientSubmitButton } from '@/components/SubmitButton';
import { useLogIn } from './use-log-in';

export function LogIn() {
  const { loading, error, submit } = useLogIn();

  return (
    <form className="w-2/3 space-y-5" onSubmit={submit}>
      {error ? (
        <div className="py-2 mb-5 text-center border-2 border-red-900 rounded-md bg-red-500/10">
          <h3 className="font-bold">Wrong Credentials</h3>
          <p className="italic">Invalid username or password</p>
        </div>
      ) : null}

      <div className="flex flex-col space-y-2">
        <label className="text-sm" htmlFor="email">
          Your Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email"
          className="px-2 py-2 rounded-lg shadow-md bg-slate-900 placeholder:text-slate-500 focus:outline-none shadow-black/60 hover:bg-slate-800"
        />
      </div>

      <div className="flex flex-col space-y-2">
        <label htmlFor="password" className="text-sm">
          Your Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="************"
          className="px-2 pt-3 pb-1 rounded-lg shadow-md bg-slate-900 placeholder:text-slate-500 focus:outline-none shadow-black/60 hover:bg-slate-800"
        />
      </div>

      <ClientSubmitButton label="Log In" pending={loading} />
    </form>
  );
}
