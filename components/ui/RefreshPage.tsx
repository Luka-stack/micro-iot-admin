'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// Dirty Solution For Bug in NextJS that force soft navigation always!!!!!
export function RefreshPage() {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [router]);

  return null;
}
