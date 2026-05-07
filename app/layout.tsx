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
    '500+ моделей оптом напрямую с фабрики. ' +
    'Носки с вашим логотипом. Личный кабинет дилера.',
  keywords: [
    'носки шерстяные оптом',
    'производитель носков',
    'носки с логотипом',
    'b2b носки',
  ],
  metadataBase: new URL('https://sherston.ru'),
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    siteName: 'SHERSTON',
    title: 'SHERSTON — Шерстяные носки оптом',
    description: 'B2B платформа. 500+ моделей. Личный кабинет дилера.',
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
