import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import clsx from 'clsx';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Flags Game',
  description: 'Flags Game',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={clsx(
          geistSans.variable,
          geistMono.variable,
          'bg-green-100 antialiased'
        )}
      >
        {children}
      </body>
    </html>
  );
}
