import Link from 'next/link';
import Image from 'next/image';

import { SignUp } from '@/features/signup/SignUp';

export default function SignUpPage() {
  return (
    <main className="flex justify-center h-screen divide-x divide-white/10">
      <div className="relative flex-1 hidden h-full lg:block">
        <Image src="/login-bg.jpg" alt="Working Mechanical Arms" fill />
      </div>

      <div className="w-[500px]">
        <div className="flex flex-col items-center justify-center h-full main-gradient">
          <div className="mb-12">
            <h2 className="mb-2 text-lg font-semibold">Register</h2>
            <p>Welcome to the Fox Machines IoT Hub.</p>
            <p>Register to start the experience.</p>
          </div>

          <SignUp />

          <div className="flex mt-10 space-x-2">
            <p>{`Already a member? `}</p>
            <Link
              href="/auth/login"
              className="text-blue-500 underline cursor-pointer hover:scale-105 underline-offset-2"
            >
              Sign In!
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
