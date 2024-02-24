import { Filters, User } from '@/types';

import { auth } from '@/auth';
import { getRequest } from '@/lib/fetch-client';
import { MachineAssignment } from './_components/MachineAssignment';
import { AuthEndpoints, MiscEndpoints } from '@/lib/apis';

async function fetchFilters() {
  const session = await auth();
  const response = await getRequest<{ data: Filters }>(MiscEndpoints.filters, {
    token: session?.accessToken,
  });

  if (response.hasError) {
    throw new Error("Couldn't fetch filters");
  }

  return response.fetchedData!.data;
}

async function fetchEmployees(): Promise<User[]> {
  const session = await auth();
  const response = await getRequest<User[]>(AuthEndpoints.employees, {
    token: session?.accessToken,
    next: { tags: ['users'] },
  });

  // TODO show unauthorized to see resources
  if (response.hasError) {
    throw new Error("Couldn't fetch employees");
  }

  return response.fetchedData!;
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

  return <MachineAssignment filters={filters} employees={employeesWithNull} />;
}
