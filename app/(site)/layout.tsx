import 'react-datepicker/dist/react-datepicker.css';
import '../global.css';

import { Roboto } from 'next/font/google';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';

import { GlobalNavigation } from '@/app/(site)/GlobalNavigation';
import SessionProvider from '@/components/SessionProvider';

const roboto = Roboto({ weight: '400', subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: {
    template: 'Micro Iot | %s',
    default: 'Micro Iot | Home',
  },
  description: 'IoT dashboard project with NextJs and NestJs',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <html lang="en" className={roboto.className}>
      <body className="flex flex-col h-screen">
        <SessionProvider session={session}>
          <GlobalNavigation />

          <main className="flex flex-1 p-4">{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
