import { cookies } from 'next/headers';
import { SignupForm } from './SignUpForm';

async function getAuthUser() {
  const cookie = cookies().get('connect.sid');

  const response = await fetch('http://localhost:5001/auth/v1/whoiam', {
    cache: 'no-store',
    method: 'GET',
    credentials: 'include',
    headers: {
      'Access-Control-Allow-Origin': 'true',
      Cookie: `${cookie?.name}=${cookie?.value}`,
    },
  });

  return response.json();
}

export default async function SignupPage() {
  const data = getAuthUser();

  return (
    <div className="flex items-center justify-center">
      <SignupForm userPromise={data} />
    </div>
  );
}
