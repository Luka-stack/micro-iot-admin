import { Metadata } from 'next';
import { AdminNavigation } from './_components/AdminNavigation';

export const metadata: Metadata = {
  title: 'Admin dashboard',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-1 space-x-4 full-page">
      <AdminNavigation />
      {children}
    </main>
  );
}
