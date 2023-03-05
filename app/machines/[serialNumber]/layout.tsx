import { TabNavigation } from '@/components/machines/tab-navigation';

export default function MachinesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col w-full m-4 space-y-10 border rounded-lg shadow-md h-fit shadow-black border-slate-800">
      <TabNavigation />

      {children}
    </main>
  );
}
