import { signIn } from 'next-auth/react';
import { FormEvent, useCallback, useState } from 'react';

export function useLogIn() {
  const [loading, setLoading] = useState(false);

  const submit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);

    const formData = new FormData(event.currentTarget);

    signIn('local-login', {
      email: formData.get('email'),
      password: formData.get('password'),
    });

    setLoading(false);
  }, []);

  return { loading, submit };
}
