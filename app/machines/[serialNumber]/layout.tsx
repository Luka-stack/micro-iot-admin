import { TabNavigation } from '@/app/machines/[serialNumber]/TabNavigation';

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
