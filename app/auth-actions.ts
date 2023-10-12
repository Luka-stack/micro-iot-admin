'use server';

import { z } from 'zod';

const authUrl = 'http://localhost:5001/auth/v1';

export async function login(_prevState: any, formData: FormData) {
  const schema = z.object({
    email: z.string().min(1).email(),
    password: z.string().min(1),
  });

  try {
    const parsed = schema.parse({
      email: formData.get('email'),
      password: formData.get('password'),
    });

    const response = await fetch(`${authUrl}/login`, {
      cache: 'no-store',
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': 'true',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(parsed),
    });

    if (response.status !== 201) {
      throw new Error();
    }

    const data = await response.json();
    console.log(data);

    return { error: false };
  } catch (error) {
    return { error: true };
  }
}

export async function signUp(_prevState: any, formData: FormData) {
  const schema = z.object({
    email: z.string().min(1).email(),
    displayName: z.string().min(3),
    password: z.string().min(1),
  });

  try {
    const parsed = schema.parse({
      email: formData.get('email'),
      password: formData.get('password'),
      displayName: formData.get('name'),
    });

    return { error: false };
  } catch (error) {
    return { error: true };
  }
}
