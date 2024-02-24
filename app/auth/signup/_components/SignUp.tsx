'use client';

import clsx from 'clsx';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { ZodError, z } from 'zod';

import { signUp } from '@/app/actions';
import { ClientSubmitButton } from '@/components/SubmitButton';

const signUpSchema = z
  .object({
    email: z.string().email('Must be a valid email'),
    displayName: z.string().min(3, 'Name must contain at least 3 characters'),
    password: z.string().min(1, 'Password is required'),
    confirmPassword: z.string().min(1, 'Confirm Password is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export function SignUp() {
  const [isPending, setIsPending] = useState(false);
  const [errors, setErrors] = useState<
    ZodError['formErrors']['fieldErrors'] | null
  >(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsPending(true);
    const formData = new FormData(event.currentTarget);

    try {
      const data = signUpSchema.parse({
        email: formData.get('email'),
        displayName: formData.get('displayName'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword'),
      });

      const response = await signUp(data);

      if (response.error) {
        setErrors({ server: response.messages });
      } else {
        await signIn('local-login', {
          email: data.email,
          password: data.password,
          callbackUrl: location.origin,
        });
      }
    } catch (error) {
      if (error instanceof ZodError) {
        setErrors(error.formErrors.fieldErrors);
      } else {
        setErrors({ server: ['Unexpected error occured, try later'] });
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form className="w-2/3 space-y-6" onSubmit={handleSubmit}>
      {errors?.server ? (
        <div className="py-2 mb-5 text-center border-2 border-red-900 rounded-md bg-red-500/10">
          <h3 className="font-bold">Login error</h3>
          <p className="italic">{errors.server}</p>
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

      <ClientSubmitButton label="Sign Up" pending={isPending} />
    </form>
  );
}
