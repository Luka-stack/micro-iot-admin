import 'react-datepicker/dist/react-datepicker.css';
import './global.css';

import { Roboto } from 'next/font/google';

import { NavigationHeader } from '@/components/layout/navigation-header';
import { SidebarNavigation } from '@/components/layout/sidebar-navigation';
import { Metadata } from 'next';

const roboto = Roboto({ weight: '400', subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: {
    template: 'Micro Iot | %s',
    default: 'Micro Iot | Home',
  },
  description: 'IoT dashboard project with NextJs and NestJs',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={roboto.className}>
      <body className="flex flex-col h-screen bg-slate-900 text-slate-400">
        <NavigationHeader />

        <main className="flex h-[calc(100%-68px)]">
          <SidebarNavigation />
          {children}
        </main>
      </body>
    </html>
  );
}
