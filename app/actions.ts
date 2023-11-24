'use server';

import { MACHINE_API } from '@/lib/apis';
import { revalidatePath, revalidateTag } from 'next/cache';

const machineUrl = 'http://localhost:5000/api/machines';

export async function updateMachine(
  serialNumber: string,
  data: {
    productionRate?: number;
    status?: string;
  }
) {
  const response = await fetch(`${MACHINE_API}/${serialNumber}`, {
    cache: 'no-store',
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Couln't update machine ${serialNumber}`);
  }

  revalidatePath(`/machines/${serialNumber}`);
  return await response.json();
}

export const revalidateMachines = async () => revalidateTag('machine');

export async function getMachines() {
  return fetch(MACHINE_API, {
    next: { revalidate: 3600 },
  }).then((response) => response.json());
}

export async function filterMachines(queryParam = '') {
  return fetch(`${machineUrl}?${queryParam}`, {
    next: { revalidate: 3600 },
  }).then((response) => response.json());
}
