'use server';

import { revalidateTag } from 'next/cache';

import { auth } from '@/auth';
import { MachineEndpoints } from '@/lib/apis';
import { patchRequest, postRequest } from '@/lib/fetch-client';

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

export async function addDefect(serialNumber: string, defect: string) {
  const session = await auth();

  const response = await postRequest(
    MachineEndpoints.addDefect(serialNumber),
    { defect },
    session?.accessToken
  );

  revalidateTag(serialNumber);
  return response.toPlainObject();
}

// Move to delete
export async function deleteDefect(serialNumber: string, defect: string) {
  const session = await auth();

  const response = await postRequest(
    MachineEndpoints.deleteDefect(serialNumber),
    { defect },
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

// Admin
export async function assignEmployee(serialNumber: string, employee?: string) {
  const session = await auth();

  const response = await postRequest(
    MachineEndpoints.assignEmployee(serialNumber),
    { employee },
    session?.accessToken
  );

  return response.toPlainObject();
}
