import 'react-datepicker/dist/react-datepicker.css';
import '../global.css';

import { Roboto } from 'next/font/google';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';

import { GlobalNavigation } from '@/app/(site)/_components/GlobalNavigation';
import SessionProvider from '@/components/SessionProvider';
import { TanstackProvider } from '@/components/providers/TanstackProvider';
import { Toaster } from 'sonner';

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
          <TanstackProvider>
            <GlobalNavigation />

            <main className="flex flex-1 p-4">{children}</main>
          </TanstackProvider>

          <Toaster toastOptions={{ duration: 1500 }} theme="dark" />
        </SessionProvider>
      </body>
    </html>
  );
}
