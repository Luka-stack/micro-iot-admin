'use client';

import { useState } from 'react';
// @ts-ignore
import { experimental_useFormState as useFormState } from 'react-dom';

import { Select } from './Select';
import { signUp } from '@/app/auth-actions';
import { SubmitButton } from '../SubmitButton';

const initialState = {
  error: false,
};
const POSITIONS = [{ name: 'Maintainer' }, { name: 'Employee' }];

export function SignUpForm() {
  const [position, setPosition] = useState(POSITIONS[0]);
  const [state, formAction] = useFormState(signUp, initialState);

  return (
    <form className="w-2/3 space-y-6" action={formAction}>
      <p>{state?.error ? 'Error' : 'No Error'}</p>

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
        <label className="text-sm" htmlFor="name">
          Your Display Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Enter your display name"
          className="px-2 py-2 rounded-lg shadow-md bg-slate-900 placeholder:text-slate-500 focus:outline-none shadow-black/60 hover:bg-slate-800"
        />
      </div>

      <Select
        title="Your Position"
        selected={position}
        selectables={POSITIONS}
        setSelected={setPosition}
      />

      <div className="flex flex-col space-y-2">
        <label className="text-sm" htmlFor="password">
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

      <div className="flex flex-col space-y-2">
        <label className="text-sm" htmlFor="confirmPassword">
          Confirm Password
        </label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="************"
          className="px-2 pt-3 pb-1 rounded-lg shadow-md bg-slate-900 placeholder:text-slate-500 focus:outline-none shadow-black/60 hover:bg-slate-800"
        />
      </div>

      <SubmitButton label="Sign Up" />
    </form>
  );
}
