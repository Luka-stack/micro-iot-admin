import { RepairHistory } from '@/types';
import { HistoryTable } from './_components/HistoryTable';

function fetchHistory(): RepairHistory[] {
  return [
    {
      serialNumber: '20beb7c2-cffa',
      maintainer: 'main.1@iotfox.pl',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam n',
      type: 'MAINTENANCE',
      date: '2021-09-10T12:00:00.000Z',
      nextSchedule: '2021-09-09T12:00:00.000Z',
      lastSchedule: '2021-09-01T12:00:00.000Z',
    },
    {
      serialNumber: '20beb7c2-cffa',
      maintainer: 'main.1@iotfox.pl',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam n',
      type: 'REPAIR',
      date: '2021-09-01T12:00:00.000Z',
      nextSchedule: '2021-09-01T12:00:00.000Z',
      lastSchedule: '2021-09-01T12:00:00.000Z',
    },
    {
      serialNumber: '20beb7c2-cffa',
      maintainer: 'main.1@iotfox.pl',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam n',
      type: 'MAINTENANCE',
      date: '2021-09-01T12:00:00.000Z',
      nextSchedule: '2021-09-01T12:00:00.000Z',
      lastSchedule: '2021-09-01T12:00:00.000Z',
    },
    {
      serialNumber: '20beb7c2-cffa',
      maintainer: 'main.1@iotfox.pl',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam n',
      type: 'MAINTENANCE',
      date: '2021-09-01T12:00:00.000Z',
      nextSchedule: '2021-09-01T12:00:00.000Z',
      lastSchedule: '2021-09-01T12:00:00.000Z',
    },
    {
      serialNumber: '20beb7c2-cffa',
      maintainer: 'main.1@iotfox.pl',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam n',
      type: 'REPAIR',
      date: '2021-09-01T12:00:00.000Z',
      nextSchedule: '2021-09-01T12:00:00.000Z',
      lastSchedule: '2021-09-01T12:00:00.000Z',
    },
    {
      serialNumber: '20beb7c2-cffa',
      maintainer: 'main.1@iotfox.pl',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam n',
      type: 'MAINTENANCE',
      date: '2021-09-01T12:00:00.000Z',
      nextSchedule: '2021-09-01T12:00:00.000Z',
      lastSchedule: '2021-09-01T12:00:00.000Z',
    },
    {
      serialNumber: '20beb7c2-cffa',
      maintainer: 'main.1@iotfox.pl',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam n',
      type: 'MAINTENANCE',
      date: '2021-09-10T12:00:00.000Z',
      nextSchedule: '2021-09-09T12:00:00.000Z',
      lastSchedule: '2021-09-01T12:00:00.000Z',
    },
    {
      serialNumber: '20beb7c2-cffa',
      maintainer: 'main.1@iotfox.pl',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam n',
      type: 'REPAIR',
      date: '2021-09-01T12:00:00.000Z',
      nextSchedule: '2021-09-01T12:00:00.000Z',
      lastSchedule: '2021-09-01T12:00:00.000Z',
    },
    {
      serialNumber: '20beb7c2-cffa',
      maintainer: 'main.1@iotfox.pl',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam n',
      type: 'MAINTENANCE',
      date: '2021-09-01T12:00:00.000Z',
      nextSchedule: '2021-09-01T12:00:00.000Z',
      lastSchedule: '2021-09-01T12:00:00.000Z',
    },
    {
      serialNumber: '20beb7c2-cffa',
      maintainer: 'main.1@iotfox.pl',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam n',
      type: 'MAINTENANCE',
      date: '2021-09-01T12:00:00.000Z',
      nextSchedule: '2021-09-01T12:00:00.000Z',
      lastSchedule: '2021-09-01T12:00:00.000Z',
    },
    {
      serialNumber: '20beb7c2-cffa',
      maintainer: 'main.1@iotfox.pl',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam n',
      type: 'REPAIR',
      date: '2021-09-01T12:00:00.000Z',
      nextSchedule: '2021-09-01T12:00:00.000Z',
      lastSchedule: '2021-09-01T12:00:00.000Z',
    },
    {
      serialNumber: '20beb7c2-cffa',
      maintainer: 'main.1@iotfox.pl',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam n',
      type: 'MAINTENANCE',
      date: '2021-09-01T12:00:00.000Z',
      nextSchedule: '2021-09-01T12:00:00.000Z',
      lastSchedule: '2021-09-01T12:00:00.000Z',
    },
    {
      serialNumber: '20beb7c2-cffa',
      maintainer: 'main.1@iotfox.pl',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam n',
      type: 'MAINTENANCE',
      date: '2021-09-10T12:00:00.000Z',
      nextSchedule: '2021-09-09T12:00:00.000Z',
      lastSchedule: '2021-09-01T12:00:00.000Z',
    },
    {
      serialNumber: '20beb7c2-cffa',
      maintainer: 'main.1@iotfox.pl',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam n',
      type: 'REPAIR',
      date: '2021-09-01T12:00:00.000Z',
      nextSchedule: '2021-09-01T12:00:00.000Z',
      lastSchedule: '2021-09-01T12:00:00.000Z',
    },
    {
      serialNumber: '20beb7c2-cffa',
      maintainer: 'main.1@iotfox.pl',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam n',
      type: 'MAINTENANCE',
      date: '2021-09-01T12:00:00.000Z',
      nextSchedule: '2021-09-01T12:00:00.000Z',
      lastSchedule: '2021-09-01T12:00:00.000Z',
    },
    {
      serialNumber: '20beb7c2-cffa',
      maintainer: 'main.1@iotfox.pl',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam n',
      type: 'MAINTENANCE',
      date: '2021-09-01T12:00:00.000Z',
      nextSchedule: '2021-09-01T12:00:00.000Z',
      lastSchedule: '2021-09-01T12:00:00.000Z',
    },
    {
      serialNumber: '20beb7c2-cffa',
      maintainer: 'main.1@iotfox.pl',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam n',
      type: 'REPAIR',
      date: '2021-09-01T12:00:00.000Z',
      nextSchedule: '2021-09-01T12:00:00.000Z',
      lastSchedule: '2021-09-01T12:00:00.000Z',
    },
    {
      serialNumber: '20beb7c2-cffa',
      maintainer: 'main.1@iotfox.pl',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam n',
      type: 'MAINTENANCE',
      date: '2021-09-01T12:00:00.000Z',
      nextSchedule: '2021-09-01T12:00:00.000Z',
      lastSchedule: '2021-09-01T12:00:00.000Z',
    },
    {
      serialNumber: '20beb7c2-cffa',
      maintainer: 'main.1@iotfox.pl',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam n',
      type: 'MAINTENANCE',
      date: '2021-09-10T12:00:00.000Z',
      nextSchedule: '2021-09-09T12:00:00.000Z',
      lastSchedule: '2021-09-01T12:00:00.000Z',
    },
    {
      serialNumber: '20beb7c2-cffa',
      maintainer: 'main.1@iotfox.pl',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam n',
      type: 'REPAIR',
      date: '2021-09-01T12:00:00.000Z',
      nextSchedule: '2021-09-01T12:00:00.000Z',
      lastSchedule: '2021-09-01T12:00:00.000Z',
    },
    {
      serialNumber: '20beb7c2-cffa',
      maintainer: 'main.1@iotfox.pl',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam n',
      type: 'MAINTENANCE',
      date: '2021-09-01T12:00:00.000Z',
      nextSchedule: '2021-09-01T12:00:00.000Z',
      lastSchedule: '2021-09-01T12:00:00.000Z',
    },
    {
      serialNumber: '20beb7c2-cffa',
      maintainer: 'main.1@iotfox.pl',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam n',
      type: 'MAINTENANCE',
      date: '2021-09-01T12:00:00.000Z',
      nextSchedule: '2021-09-01T12:00:00.000Z',
      lastSchedule: '2021-09-01T12:00:00.000Z',
    },
    {
      serialNumber: '20beb7c2-cffa',
      maintainer: 'main.1@iotfox.pl',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam n',
      type: 'REPAIR',
      date: '2021-09-01T12:00:00.000Z',
      nextSchedule: '2021-09-01T12:00:00.000Z',
      lastSchedule: '2021-09-01T12:00:00.000Z',
    },
    {
      serialNumber: '20beb7c2-cffa',
      maintainer: 'main.1@iotfox.pl',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam n',
      type: 'MAINTENANCE',
      date: '2021-09-01T12:00:00.000Z',
      nextSchedule: '2021-09-01T12:00:00.000Z',
      lastSchedule: '2021-09-01T12:00:00.000Z',
    },
    {
      serialNumber: '20beb7c2-cffa',
      maintainer: 'main.1@iotfox.pl',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam n',
      type: 'MAINTENANCE',
      date: '2021-09-10T12:00:00.000Z',
      nextSchedule: '2021-09-09T12:00:00.000Z',
      lastSchedule: '2021-09-01T12:00:00.000Z',
    },
    {
      serialNumber: '20beb7c2-cffa',
      maintainer: 'main.1@iotfox.pl',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam n',
      type: 'REPAIR',
      date: '2021-09-01T12:00:00.000Z',
      nextSchedule: '2021-09-01T12:00:00.000Z',
      lastSchedule: '2021-09-01T12:00:00.000Z',
    },
    {
      serialNumber: '20beb7c2-cffa',
      maintainer: 'main.1@iotfox.pl',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam n',
      type: 'MAINTENANCE',
      date: '2021-09-01T12:00:00.000Z',
      nextSchedule: '2021-09-01T12:00:00.000Z',
      lastSchedule: '2021-09-01T12:00:00.000Z',
    },
    {
      serialNumber: '20beb7c2-cffa',
      maintainer: 'main.1@iotfox.pl',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam n',
      type: 'MAINTENANCE',
      date: '2021-09-01T12:00:00.000Z',
      nextSchedule: '2021-09-01T12:00:00.000Z',
      lastSchedule: '2021-09-01T12:00:00.000Z',
    },
    {
      serialNumber: '20beb7c2-cffa',
      maintainer: 'main.1@iotfox.pl',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam n',
      type: 'REPAIR',
      date: '2021-09-01T12:00:00.000Z',
      nextSchedule: '2021-09-01T12:00:00.000Z',
      lastSchedule: '2021-09-01T12:00:00.000Z',
    },
    {
      serialNumber: '20beb7c2-cffa',
      maintainer: 'main.1@iotfox.pl',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam n',
      type: 'MAINTENANCE',
      date: '2021-09-01T12:00:00.000Z',
      nextSchedule: '2021-09-01T12:00:00.000Z',
      lastSchedule: '2021-09-01T12:00:00.000Z',
    },
    {
      serialNumber: '20beb7c2-cffa',
      maintainer: 'main.1@iotfox.pl',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam n',
      type: 'MAINTENANCE',
      date: '2021-09-10T12:00:00.000Z',
      nextSchedule: '2021-09-09T12:00:00.000Z',
      lastSchedule: '2021-09-01T12:00:00.000Z',
    },
    {
      serialNumber: '20beb7c2-cffa',
      maintainer: 'main.1@iotfox.pl',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam n',
      type: 'REPAIR',
      date: '2021-09-01T12:00:00.000Z',
      nextSchedule: '2021-09-01T12:00:00.000Z',
      lastSchedule: '2021-09-01T12:00:00.000Z',
    },
    {
      serialNumber: '20beb7c2-cffa',
      maintainer: 'main.1@iotfox.pl',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam n',
      type: 'MAINTENANCE',
      date: '2021-09-01T12:00:00.000Z',
      nextSchedule: '2021-09-01T12:00:00.000Z',
      lastSchedule: '2021-09-01T12:00:00.000Z',
    },
    {
      serialNumber: '20beb7c2-cffa',
      maintainer: 'main.1@iotfox.pl',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam n',
      type: 'MAINTENANCE',
      date: '2021-09-01T12:00:00.000Z',
      nextSchedule: '2021-09-01T12:00:00.000Z',
      lastSchedule: '2021-09-01T12:00:00.000Z',
    },
    {
      serialNumber: '20beb7c2-cffa',
      maintainer: 'main.1@iotfox.pl',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam n',
      type: 'REPAIR',
      date: '2021-09-01T12:00:00.000Z',
      nextSchedule: '2021-09-01T12:00:00.000Z',
      lastSchedule: '2021-09-01T12:00:00.000Z',
    },
    {
      serialNumber: '20beb7c2-cffa',
      maintainer: 'main.1@iotfox.pl',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam n',
      type: 'MAINTENANCE',
      date: '2021-09-01T12:00:00.000Z',
      nextSchedule: '2021-09-01T12:00:00.000Z',
      lastSchedule: '2021-09-01T12:00:00.000Z',
    },
  ];
}

export default function ServiceHistoryPage() {
  const history = fetchHistory();

  return <HistoryTable history={history} />;
}
