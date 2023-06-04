'use server';

import { revalidateTag } from 'next/cache';

const machineUrl = 'http://localhost:5000/api/machines';

export async function updateProductionRate(
  serialNumber: string,
  productionRate: number
) {
  await fetch(`${machineUrl}/${serialNumber}`, {
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
