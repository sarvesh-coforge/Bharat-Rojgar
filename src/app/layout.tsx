import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme/ThemeProvider';

export const metadata: Metadata = {
  title: 'Bharat Rojgar | Official Government Jobs, Results, Admit Cards & Recruitment Portal 2026',
  description: 'Bharat Rojgar is the leading official government jobs, examination results, admit cards and answer keys portal for UPSC, SSC, Railways RRB, IBPS, NTA, UPSSSC, and State Police.',
  metadataBase: new URL('https://bharatrojgar.gov.in'),
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)] antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
