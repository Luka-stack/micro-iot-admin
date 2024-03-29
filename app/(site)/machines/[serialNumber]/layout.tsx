import { DetailsNavigation } from './_components/DetailsNavigation';

// export const metadata: Metadata = {
//   title: 'Machine',
// };

export default function MachinesLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { serialNumber: string };
}) {
  return (
    <main className="flex flex-1 space-x-4">
      <DetailsNavigation serialNumber={params.serialNumber} />

      {children}
    </main>
  );
}
