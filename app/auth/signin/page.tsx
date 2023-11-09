import Link from 'next/link';
import Image from 'next/image';
import { LogIn } from '@/app/auth/signin/_components/LogIn';
import { GoogleSignIn } from '@/app/auth/signin/_components/GoogleSignIn';

export default function LoginPage() {
  return (
    <main className="flex justify-center h-screen divide-x divide-white/10">
      <div className="relative flex-1 hidden h-full lg:block">
        <Image src="/login-bg.jpg" alt="Working Mechanical Arms" fill />
      </div>

      <div className="w-[500px]">
        <div className="flex flex-col items-center justify-center h-full main-gradient">
          <div className="mb-12 text-center">
            <h2 className="-mb-1 text-lg font-semibold">Welcome in</h2>
            <h1 className="text-3xl italic font-extrabold header-gradient">
              Fox Machines
            </h1>
          </div>

          <LogIn />

          <GoogleSignIn />

          <div className="flex space-x-2">
            <p>{`Don't have an account?`}</p>
            <Link
              href="/auth/signup"
              className="text-blue-500 underline cursor-pointer hover:scale-105 underline-offset-2"
            >
              Sign Up for Free!
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
