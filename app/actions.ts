'use server';

import { MACHINE_API } from '@/lib/apis';
import { revalidateTag } from 'next/cache';

const machineUrl = 'http://localhost:5000/api/machines';

export async function updateProductionRate(
  serialNumber: string,
  productionRate: number
) {
  await fetch(`${MACHINE_API}/${serialNumber}`, {
    cache: 'no-store',
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({ productionRate }),
  });

  revalidateTag('machine');
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
