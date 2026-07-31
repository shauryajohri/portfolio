import type { Metadata, Viewport } from 'next';
import { Inter, Noto_Serif_JP, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500'],
  variable: '--font-inter',
  display: 'swap',
});

const notoSerifJP = Noto_Serif_JP({
  subsets: ['latin'],
  weight: ['200', '300', '400'],
  variable: '--font-noto-jp',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono-jb',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Shaurya Johri — AI Engineer & Software Developer',
  description:
    'Shaurya Johri builds intelligent software and, sometimes, entire worlds. AURA, SmartConnect, Smart City Digital Twin and more.',
};

export const viewport: Viewport = {
  themeColor: '#05030c',
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
      className={`${inter.variable} ${notoSerifJP.variable} ${jetbrains.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
