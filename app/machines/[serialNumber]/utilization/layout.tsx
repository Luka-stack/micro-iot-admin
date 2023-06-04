import { TabNavigation } from './TabNavigation';

export default function MachineUtilizationLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { serialNumber: string };
}) {
  return (
    <main className="flex flex-col w-full h-full">
      <TabNavigation serialNumber={params.serialNumber} />

      {children}
    </main>
  );
}
