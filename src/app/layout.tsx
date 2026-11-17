import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme/ThemeProvider';

export const metadata: Metadata = {
  title: 'Sarkari Selection | Official Government Jobs, Results, Admit Cards & Recruitment Portal 2026',
  description: 'Sarkari Selection is India\'s trusted portal for government jobs, exam results, admit cards and answer keys – covering UPSC, SSC, Railways RRB, IBPS, NTA, UPSSSC, State Police and more.',
  metadataBase: new URL('https://sarkariselection.com'),
  keywords: 'sarkari selection, sarkari naukri, government jobs 2026, sarkari result, admit card, exam result, UPSC, SSC, Railway RRB, IBPS, NTA',
  openGraph: {
    title: 'Sarkari Selection – Govt Job Alerts & Results 2026',
    description: 'Latest government job notifications, results, admit cards, answer keys, scholarships and syllabus – all in one trusted portal.',
    url: 'https://sarkariselection.com',
    siteName: 'Sarkari Selection',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sarkari Selection – Govt Job Alerts & Results 2026',
    description: 'Latest government job notifications, results, admit cards, answer keys, scholarships and syllabus.',
  },
  icons: {
    icon: '/favicon.ico',
  },
  alternates: {
    canonical: 'https://sarkariselection.com',
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
