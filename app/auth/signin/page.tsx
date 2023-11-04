import Link from 'next/link';
import Image from 'next/image';
import { LogIn } from '@/features/login/LogIn';

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

          <button className="flex bg-[#232b54] w-2/3 justify-center rounded-md shadow-md border border-white/10 py-2 shadow-black/60 mt-12 mb-5 space-x-3 hover:bg-[#2d3354]">
            <Image src="/google.png" alt="Google" width={24} height={24} />
            <p>Log in with Google</p>
          </button>

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
