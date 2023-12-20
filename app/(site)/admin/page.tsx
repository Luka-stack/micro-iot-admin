import { Filters, User } from '@/types';

import { MachineAssignment } from './_components/MachineAssignment';
import { AuthEndpoints, MiscEndpoints } from '@/lib/apis';

async function fetchFilters(): Promise<{ data: Filters }> {
  const response = await fetch(MiscEndpoints.filters);

  if (!response.ok) {
    throw new Error("Couldn't load filters");
  }

  return response.json();
}

async function fetchEmployees(): Promise<User[]> {
  const response = await fetch(AuthEndpoints.employees, {
    next: { tags: ['users'] },
  });

  if (!response.ok) {
    throw new Error("Couldn't load employees");
  }

  return response.json();
}

export default async function AdminPage() {
  const [filters, employees] = await Promise.all([
    fetchFilters(),
    fetchEmployees(),
  ]);

  const employeesWithNull: string[] = [
    'Unassigned',
    ...employees.map((employees) => employees.email),
  ];

  return (
    <MachineAssignment filters={filters.data} employees={employeesWithNull} />
  );
}
