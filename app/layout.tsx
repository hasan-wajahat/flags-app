import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import clsx from 'clsx';
import PWAManager from './pwaManager';
import NetworkStatus from './components/NetworkStatus';

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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#4f46e5',
};

export const metadata: Metadata = {
  title: 'Flags Game',
  description: 'Learn country flags with this educational app',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Flags App',
  },
  formatDetection: {
    telephone: false,
  },
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
        {/* PWAManager has no UI but handles service worker and asset preloading */}
        <div id="pwa-components">
          <PWAManager />
          <NetworkStatus />
        </div>
      </body>
    </html>
  );
}
