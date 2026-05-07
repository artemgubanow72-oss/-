import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'SHERSTON — Шерстяные носки оптом от производителя',
    template: '%s | SHERSTON',
  },
  description: 'B2B платформа производителя шерстяных носков. 500+ моделей оптом напрямую с фабрики. Носки с вашим логотипом. Личный кабинет дилера.',
  keywords: ['носки шерстяные оптом', 'производитель носков', 'носки с логотипом', 'b2b носки'],
  metadataBase: new URL('https://sherston.ru'),
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://sherston.ru',
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
      <body className="bg-[#0D0D1A] text-white antialiased min-h-screen">
        {children}
      </body>
    </html>
  )
}
