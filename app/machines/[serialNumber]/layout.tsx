import TabNavigation from '@/app/machines/[serialNumber]/TabNavigation';

export default function MachinesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col w-full m-4">
      <TabNavigation />

      {children}
    </main>
  );
}
