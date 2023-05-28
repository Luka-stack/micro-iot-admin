import { differenceInHoursAndMin } from '@/common/helpers';
import { Machine } from '@/types';

type Props = {
  machine: Machine;
};

export function DetailSection({ machine }: Props) {
  const [hours, minutes] = differenceInHoursAndMin(
    new Date(machine!.lastStatusUpdate)
  );

  return (
    <section className="mt-5 space-y-3 text-sm">
      <p>
        <b>Producent:</b> {machine.producent}
      </p>
      <p>
        <b>Type:</b> {machine.type.name}
      </p>
      <p>
        <b>Production Rate:</b> {machine.productionRate} [s]
      </p>

      <p>
        <b>{machine!.status === 'WORKING' ? 'Working' : 'Idle'} hours: </b>
        {`${hours} [h] ${minutes} [min]`}
      </p>
    </section>
  );
}
