import 'react-datepicker/dist/react-datepicker.css';
import '../global.css';

import { Roboto } from 'next/font/google';

import { GlobalNavigation } from '@/app/(site)/GlobalNavigation';
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
      <body className="flex flex-col h-screen">
        <GlobalNavigation />

        <main className="flex flex-1 p-4">{children}</main>
      </body>
    </html>
  );
}
