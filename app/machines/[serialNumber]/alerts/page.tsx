export default async function MachineAlertsPage({
  params,
}: {
  params: { serialNumber: string };
}) {
  return (
    <main>
      <h1>Alerts for {params.serialNumber}</h1>
    </main>
  );
}
