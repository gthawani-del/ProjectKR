import type { Metadata } from 'next';
import { Manrope, Newsreader } from 'next/font/google';
import MotionSystem from '@/components/MotionSystem';
import './globals.css';
import './internal.css';
import './motion.css';

const sans = Manrope({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const serif = Newsreader({ subsets: ['latin'], variable: '--font-serif', display: 'swap' });

export const metadata: Metadata = {
  title: 'Krida Legal | Legal intelligence for sport, gaming, IP and business',
  description: 'Krida Legal provides specialist legal advice across sport, gaming, intellectual property and commercial matters.',
  metadataBase: new URL('https://kridalegal.com'),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <MotionSystem />
        {children}
      </body>
    </html>
  );
}
