'use client';

import { useRouter } from 'next/navigation';
import { use } from 'react';

type UserPromise = {
  data?: {
    email: string;
    displayName: string;
  };
};

type Props = {
  userPromise: Promise<UserPromise>;
};

async function oauthSignup(user: {
  email: string;
  displayName: string;
  role: string;
}) {
  try {
    const response = await fetch('http://localhost:5001/auth/v1/signup/oauth', {
      cache: 'no-store',
      method: 'POST',
      credentials: 'include',
      headers: {
        'Access-Control-Allow-Origin': 'true',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
}

async function localSignup(user: {
  email: string;
  displayName: string;
  role: string;
}) {
  try {
    const response = await fetch('http://localhost:5001/auth/v1/signup', {
      cache: 'no-store',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
}

export function SignupForm({ userPromise }: Props) {
  const { data } = use(userPromise);
  const router = useRouter();

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const target = event.target as any;
    const user = {
      role: target['roles'].value,
      email: target['email'].value,
      displayName: target['displayName'].value,
      password: target['password'].value,
    };

    try {
      let response;

      if (data) {
        response = await oauthSignup(user);
      } else {
        response = await localSignup(user);
      }

      console.log(response);
      router.replace('/auth/login');
    } catch (err) {
      console.error('Singup Error', err);
    }
  };

  return (
    <form className="" onSubmit={onSubmit}>
      <h1>{data ? data.displayName : 'New User'}</h1>

      <div className="flex flex-col my-5">
        <label htmlFor="email">Email</label>
        {data ? (
          <input
            type="email"
            name="email"
            id="email"
            disabled={true}
            defaultValue={data?.email || ''}
            className="rounded-md outline-2 outline-red-500 text-slate-900"
          />
        ) : (
          <input
            type="email"
            name="email"
            id="email"
            disabled={false}
            className="rounded-md outline-2 outline-red-500 text-slate-900"
          />
        )}
      </div>

      <div className="flex flex-col my-5">
        <label htmlFor="displayName">Display Name</label>
        <input
          type="text"
          name="displayName"
          id="displayName"
          defaultValue={data?.displayName || ''}
          className="rounded-md outline-2 outline-red-500 text-slate-900"
        />
      </div>

      {data ? null : (
        <div className="flex flex-col my-5">
          <label htmlFor="displayName">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="rounded-md outline-2 outline-red-500 text-slate-900"
          />
        </div>
      )}

      <div className="flex flex-col my-5">
        <select
          name="roles"
          id="roles"
          className="text-slate-900"
          defaultValue="employee"
        >
          <option value="employee" className="text-slate-900">
            Employee
          </option>
          <option value="maintainer" className="text-slate-900">
            Maintainer
          </option>
        </select>
      </div>

      <input
        type="submit"
        value="Sign Up"
        className="w-full bg-blue-800 rounded-md"
      />
    </form>
  );
}
