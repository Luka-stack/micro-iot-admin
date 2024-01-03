'use server';
import { revalidateTag } from 'next/cache';

import { MACHINE_API } from '@/lib/apis';
import { auth } from '@/auth';

const machineUrl = 'http://localhost:5000/api/machines';

export async function updateMachine(
  serialNumber: string,
  data: {
    productionRate?: number;
    status?: string;
  }
) {
  const session = await auth();

  const response = await fetch(`${MACHINE_API}/${serialNumber}`, {
    cache: 'no-store',
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      Authorization: `Bearer ${session?.accessToken}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Couln't update machine ${serialNumber}`);
  }

  revalidateTag(serialNumber);
  return await response.json();
}

export async function filterMachines(queryParam = '') {
  return fetch(`${machineUrl}?${queryParam}`, {
    next: { revalidate: 3600 },
  }).then((response) => response.json());
}
