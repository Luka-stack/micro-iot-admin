import clsx from 'clsx';
import { BaseLoadingButton } from '../ui/base-loading-button';
import { MachineStatus } from '@/types';

type Props = {
  loading: boolean;
  status: MachineStatus;
  updateAction: () => void;
};

export function MachineStatusButton({
  loading,
  status,
  updateAction: onClick,
}: Props) {
  return (
    <BaseLoadingButton
      onClick={onClick}
      loading={loading}
      style={clsx(
        'border-2 rounded-md shadow-md w-40 h-11',
        status === 'WORKING'
          ? 'text-red-700 border-red-700 bg-red-900/20 hover:bg-red-900/30'
          : 'text-green-700 border-green-700 bg-green-900/20 hover:bg-green-900/30'
      )}
      text={status === 'WORKING' ? 'Stop Machine' : 'Start Machine'}
      loadingText={false}
    />
  );
}
