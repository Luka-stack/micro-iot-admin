import { Metadata } from 'next';
import { TabNavigation } from './TabNavigation';

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
    <main className="flex flex-1 space-x-4">
      <TabNavigation serialNumber={params.serialNumber} />

      {children}
    </main>
  );
}
