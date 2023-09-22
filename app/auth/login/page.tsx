'use client';

import Link from 'next/link';

const checklogin = async () => {
  try {
    const response = await fetch(
      'http://localhost:5001/auth/v1/authenticated',
      {
        cache: 'no-store',
        method: 'GET',
        credentials: 'include',
        headers: {
          'Access-Control-Allow-Origin': 'true',
        },
      }
    );

    const data = await response.json();

    console.log(data);
  } catch (err) {
    console.error(err);
  }
};

const login = async (user: { password: string; email: string }) => {
  try {
    const response = await fetch('http://localhost:5001/auth/v1/login', {
      cache: 'no-store',
      method: 'POST',
      credentials: 'include',
      headers: {
        'Access-Control-Allow-Origin': 'true',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    const data = await response.json();

    console.log(data);
  } catch (err) {
    console.error(err);
  }
};

export default function LoginPage() {
  const glogin = () => {
    window.open('http://localhost:5001/auth/v1/google/login', '_self');
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const target = event.target as any;
    const user = {
      email: target['email'].value,
      password: target['password'].value,
    };

    try {
      await login(user);
    } catch (err) {
      console.error('Login Error', err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-5">
      <form className="" onSubmit={onSubmit}>
        <h1>Login</h1>

        <div className="flex flex-col my-5">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="rounded-md outline-2 outline-red-500 text-slate-900"
          />
        </div>

        <div className="flex flex-col my-5">
          <label htmlFor="displayName">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="rounded-md outline-2 outline-red-500 text-slate-900"
          />
        </div>

        <input
          type="submit"
          value="Log In"
          className="w-full bg-blue-800 rounded-md"
        />
      </form>

      <button onClick={glogin} className="px-4 py-2 bg-red-700 rounded-lg">
        Log in with google
      </button>

      <Link href="/auth/signup" className="px-4 py-2 rounded-lg bg-violet-700">
        Local Signup
      </Link>

      <button onClick={checklogin} className="px-4 py-2 bg-blue-700 rounded-lg">
        Check User
      </button>
    </div>
  );
}
