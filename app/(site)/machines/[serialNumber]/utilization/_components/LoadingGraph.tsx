import { useEffect, useState } from 'react';
import { LoadingIndicator } from '@/components/ui/LoadingIndicator';

export function LoadingGraph() {
  const [dots, setDots] = useState('.');

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDots((prevDots) => (prevDots === '...' ? '.' : prevDots + '.'));
    }, 500);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <main className="relative flex flex-col w-full h-full p-4 border rounded-md border-white/10">
      <div className="flex flex-col items-center justify-center flex-1">
        <LoadingIndicator className="w-32" />
        <p className="text-lg font-bold text-blue-800">
          Loading utilization data{dots}
        </p>
      </div>
    </main>
  );
}
