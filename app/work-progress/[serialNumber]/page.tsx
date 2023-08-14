type Props = {
  params: { serialNumber: string };
};

export default async function MachineWorkDetailPage({ params }: Props) {
  return (
    <div>
      <h1>
        Special page to display work graph and some info about one selected
        machine {params.serialNumber}
      </h1>
    </div>
  );
}
