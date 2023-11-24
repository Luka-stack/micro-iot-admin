'use client';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactNode, useRef } from 'react';

export function Tanstackprovider({ children }: { children: ReactNode }) {
  const queryClient = useRef(new QueryClient()).current;

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
