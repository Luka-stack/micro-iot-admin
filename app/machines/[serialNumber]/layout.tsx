import { TabNavigation } from '@/app/machines/[serialNumber]/TabNavigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Machine',
};

export default function MachinesLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { serialNumber: string };
}) {
  return (
    <main className="flex flex-col w-full m-4">
      <TabNavigation serialNumber={params.serialNumber} />

      {children}
    </main>
  );
}
