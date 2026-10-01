import type { Metadata, Viewport } from 'next';
import { Cinzel, EB_Garamond, Inter } from 'next/font/google';
import './globals.css';

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-cinzel',
  display: 'swap',
});

const garamond = EB_Garamond({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-garamond',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'The Journey of Shaurya Johri — Software Developer & AI Engineer',
  description:
    'Shaurya Johri builds intelligent systems — desktop AI, machine-learning pipelines and real-time 3D worlds. AURA, SmartConnect and more, told as a book.',
};

export const viewport: Viewport = {
  themeColor: '#07061a',
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${garamond.variable} ${inter.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
