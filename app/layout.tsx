import 'react-datepicker/dist/react-datepicker.css';
import './global.css';
import { Inter } from '@next/font/google';
import { NavigationHeader } from '@/components/ui/navigation-header';
import { SidebarNavigation } from '@/components/home/sidebar-navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Micro IoT',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="flex flex-col h-screen bg-slate-900 text-slate-400">
        <NavigationHeader />
        <main className="flex h-full">
          <SidebarNavigation />
          {children}
        </main>
      </body>
    </html>
  );
}
