'use server';

import { revalidatePath } from 'next/cache';

const machineUrl = 'http://localhost:5000/api/machines';

export async function updateStatus(serialNumber: string, status: string) {
  await fetch(`${machineUrl}/${serialNumber}`, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({ status }),
  });

  revalidatePath(`/machines/${serialNumber}`);
}
