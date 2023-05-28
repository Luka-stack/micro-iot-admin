import { revalidatePath } from 'next/cache';

export function RevalidateButton() {
  async function updateStatus() {
    'use server';
    const response = await fetch(
      `http://localhost:5000/api/machines/4c48d884-b055`,
      {
        cache: 'no-store',
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({ status: 'WORKING' }),
      }
    );

    const { data } = await response.json();

    console.log(data);

    revalidatePath(`/machines/4c48d884-b055`);
  }

  return (
    <form action={updateStatus}>
      <button type="submit">Revalidate</button>
    </form>
  );
}
