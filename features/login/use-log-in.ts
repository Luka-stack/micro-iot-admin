import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { FormEvent, useCallback, useState } from 'react';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email('Must be a valid email'),
  password: z.string().min(1, 'Password is required'),
});

export function useLogIn() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const submit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      setLoading(true);

      try {
        const formData = new FormData(event.currentTarget);
        const data = schema.parse({
          email: formData.get('email'),
          password: formData.get('password'),
        });

        const response = await signIn('local-login', {
          email: data.email,
          password: data.password,
          redirect: false,
          redirectUrl: searchParams.get('callbackUrl'),
        });

        if (response?.error) {
          throw new Error('Wrong credentials');
        }

        router.replace(
          `${location.origin}${searchParams.get('callbackUrl') || '/'}`
        );
      } catch (error) {
        setError(true);
      }

      setLoading(false);
    },
    [searchParams, router]
  );

  return { loading, error, submit };
}
