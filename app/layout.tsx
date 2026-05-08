import type { Metadata } from 'next'
import './globals.css'
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider'
import { OrganizationSchema, WebSiteSchema } from '@/components/seo/SchemaOrg'

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
    'шерстяные носки от производителя',
    'купить носки оптом Россия',
    'носки дилер оптом',
    'корпоративные носки с принтом',
  ],
  metadataBase: new URL('https://sherston.ru'),
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://sherston.ru',
    siteName: 'SHERSTON',
    title: 'SHERSTON — Шерстяные носки оптом | B2B Платформа',
    description:
      'Производитель носков. 500+ моделей. Носки с вашим логотипом. ' +
      'Маржа дилера 40–60%. Отгрузка за 1 день.',
    images: [
      {
        url: '/og.jpg',
        width: 1200,
        height: 630,
        alt: 'SHERSTON — Шерстяные носки оптом',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SHERSTON — Носки оптом',
    description: 'B2B платформа производителя шерстяных носков',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'GOOGLE_VERIFICATION_CODE',
    yandex: 'YANDEX_VERIFICATION_CODE',
  },
  alternates: {
    canonical: 'https://sherston.ru',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <OrganizationSchema />
        <WebSiteSchema />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className="bg-[#060608] text-white antialiased overflow-x-hidden">
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
