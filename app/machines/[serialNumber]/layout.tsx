import TabNavigation from '@/components/machines/tab-navigation';

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
