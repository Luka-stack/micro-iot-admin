import { signIn } from 'next-auth/react';
import { ZodError, z } from 'zod';
import { FormEvent, useCallback, useState } from 'react';

import { AuthEndpoints } from '@/common/apis';
import { RequestError, postRequest } from '@/lib/fetch-client';

const schema = z
  .object({
    email: z.string().email('Must be a valid email'),
    role: z.string().min(1),
    displayName: z.string().min(3, 'Name must contain at least 3 characters'),
    password: z.string().min(1, 'Password is required'),
    confirmPassword: z.string().min(1, 'Confirm Password is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export function useSignIn() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>(null);

  const submit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);

    const formData = new FormData(event.currentTarget);

    try {
      const data = schema.parse({
        email: formData.get('email'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword'),
        displayName: formData.get('displayName'),
        role: formData.get('role'),
      });

      await postRequest(AuthEndpoints.signup, data, 201);

      await signIn('local-login', {
        email: data.email,
        password: data.password,
        callbackUrl: location.origin,
      });
    } catch (error) {
      if (error instanceof RequestError) {
        setErrors(error.cause);
      } else if (error instanceof ZodError) {
        setErrors(error.formErrors.fieldErrors);
      } else {
        setErrors({ other: 'Unexpected error occured, try later' });
      }
    }

    setLoading(false);
  }, []);

  return { loading, errors, submit };
}
