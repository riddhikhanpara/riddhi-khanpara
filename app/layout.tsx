import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Riddhi Khanpara | Full Stack Developer | React.js & Next.js',
  description: 'Full Stack Developer with 3+ years of experience building scalable web applications using React.js, Next.js, TypeScript, Node.js and NestJS.',
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Riddhi Khanpara | Full Stack Developer',
    description: 'Full Stack Developer with 3+ years of experience building scalable web applications using React.js, Next.js, TypeScript, Node.js and NestJS.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Riddhi Khanpara | Full Stack Developer',
    description: 'Full Stack Developer with 3+ years of experience building scalable web applications using React.js, Next.js, TypeScript, Node.js and NestJS.',
  },
  icons: { icon: '/favicon.svg' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
