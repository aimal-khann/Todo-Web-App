import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Todo Manager - Professional Task Management',
  description: 'A stunning todo application with cyberpunk aesthetics',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={cn('min-h-screen bg-zinc-950 text-white antialiased', inter.className)}>
        {children}
      </body>
    </html>
  );
}