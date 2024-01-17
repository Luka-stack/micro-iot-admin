'use server';

import { revalidateTag } from 'next/cache';

import { auth } from '@/auth';
import { patchRequest, postRequest } from '@/lib/fetch-client';
import { MachineEndpoints } from '@/lib/apis';

const machineUrl = 'http://localhost:5000/api/machines';

export async function updateMachine<TData>(
  serialNumber: string,
  data: {
    productionRate?: number;
    status?: string;
  }
) {
  const session = await auth();

  const response = await patchRequest<TData>(
    MachineEndpoints.updateMachine(serialNumber),
    data,
    session?.accessToken
  );

  revalidateTag(serialNumber);
  return response.toPlainObject();
}

export async function filterMachines(queryParam = '') {
  return fetch(`${machineUrl}?${queryParam}`, {
    next: { revalidate: 3600 },
  }).then((response) => response.json());
}

export async function reportDefect(serialNumber: string, notes: string[]) {
  const session = await auth();

  const response = await postRequest(
    MachineEndpoints.reportDefect(serialNumber),
    { notes },
    session?.accessToken
  );

  revalidateTag(serialNumber);
  return response.toPlainObject();
}

export async function changePriority(serialNumber: string, priority: string) {
  const session = await auth();

  const response = await postRequest(
    MachineEndpoints.changePriority(serialNumber),
    { priority },
    session?.accessToken
  );

  revalidateTag(serialNumber);
  return response.toPlainObject();
}
