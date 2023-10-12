import '../global.css';

import { Roboto } from 'next/font/google';
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
        {children}
      </body>
    </html>
  );
}
