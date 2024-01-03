import { Filters, User } from '@/types';

import { MachineAssignment } from './_components/MachineAssignment';
import { AuthEndpoints, MiscEndpoints } from '@/lib/apis';
import { auth } from '@/auth';

async function fetchFilters(token?: string): Promise<{ data: Filters }> {
  const response = await fetch(MiscEndpoints.filters, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Couldn't load filters");
  }

  return response.json();
}

async function fetchEmployees(token?: string): Promise<User[]> {
  const response = await fetch(AuthEndpoints.employees, {
    next: { tags: ['users'] },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Couldn't load employees");
  }

  return response.json();
}

export default async function AdminPage() {
  const session = await auth();

  const [filters, employees] = await Promise.all([
    fetchFilters(session?.accessToken),
    fetchEmployees(session?.accessToken),
  ]);

  const employeesWithNull: string[] = [
    'Unassigned',
    ...employees.map((employees) => employees.email),
  ];

  return (
    <MachineAssignment filters={filters.data} employees={employeesWithNull} />
  );
}
