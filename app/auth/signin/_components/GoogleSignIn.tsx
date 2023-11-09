'use client';

import Image from 'next/image';
import { signIn } from 'next-auth/react';

export function GoogleSignIn() {
  return (
    <button
      onClick={() => signIn('google')}
      className="flex bg-[#232b54] w-2/3 justify-center rounded-md shadow-md border border-white/10 py-2 shadow-black/60 mt-12 mb-5 space-x-3 hover:bg-[#2d3354]"
    >
      <Image src="/google.png" alt="Google" width={24} height={24} />
      <p>Log in with Google</p>
    </button>
  );
}
