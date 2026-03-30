import type { Metadata } from 'next';
import { Be_Vietnam_Pro, Inter } from 'next/font/google';
import './globals.css';

const beVietnamPro = Be_Vietnam_Pro({
  variable: '--font-be-vietnam-pro',
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '600', '700', '800', '900'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  title: 'Mr. Hói TV - Chuyên gia AI & Tự động hóa Doanh nghiệp',
  description: 'Hơn 20 năm kinh nghiệm trong ngành công nghệ, kiến tạo tương lai số bằng AI và Automation.',
};

import Chatbot from '@/components/Chatbot';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="scroll-smooth">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
      </head>
      <body
        className={`${beVietnamPro.variable} ${inter.variable} antialiased bg-surface text-on-surface font-body`}
      >
        {children}
        <Chatbot />
      </body>
    </html>
  );
}
