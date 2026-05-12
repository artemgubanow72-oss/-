import type { Metadata } from 'next'
import './globals.css'
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider'

export const metadata: Metadata = {
  title: {
    default: 'SHERSTON — Шерстяные носки оптом от производителя',
    template: '%s | SHERSTON',
  },
  description:
    'B2B платформа производителя шерстяных носков. ' +
    '500+ моделей оптом. Носки с логотипом. Личный кабинет дилера. ' +
    'Маржа 40–60%. Отгрузка за 1 день. Рассказово, Тамбовская обл.',
  keywords: [
    'носки шерстяные оптом',
    'производитель носков',
    'носки с логотипом оптом',
    'b2b носки производитель',
    'купить носки оптом Россия',
  ],
  metadataBase: new URL('https://sherston.ru'),
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://sherston.ru',
    siteName: 'SHERSTON',
    title: 'SHERSTON — Шерстяные носки оптом',
    description: 'B2B платформа. 500+ моделей. Маржа 40–60%.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className="bg-[#060608] text-white antialiased overflow-x-hidden">
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
