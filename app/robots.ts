import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard/', '/api/', '/sign-in', '/sign-up'],
      },
      {
        userAgent: 'Yandexbot',
        allow: '/',
        disallow: ['/dashboard/', '/api/'],
        crawlDelay: 1,
      },
    ],
    sitemap: 'https://sherston.ru/sitemap.xml',
    host: 'https://sherston.ru',
  }
}
