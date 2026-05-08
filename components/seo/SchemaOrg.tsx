// Schema.org разметка для AI-поисковиков
// ChatGPT, Perplexity, Яндекс Нейро, Google SGE

interface ProductSchemaProps {
  name: string
  description: string
  price: number
  currency?: string
  availability?: boolean
  image?: string
  sku?: string
  brand?: string
}

export function ProductSchema({
  name,
  description,
  price,
  currency = 'RUB',
  availability = true,
  image,
  sku,
  brand = 'SHERSTON',
}: ProductSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    brand: { '@type': 'Brand', name: brand },
    sku,
    image,
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency: currency,
      availability: availability
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'SHERSTON',
        url: 'https://sherston.ru',
      },
    },
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness', 'Store'],
    '@id': 'https://sherston.ru/#org',
    name: 'SHERSTON',
    legalName: 'ИП Губанов А.А.',
    description:
      'Производитель шерстяных носков оптом. B2B платформа для дилеров. ' +
      '500+ моделей. Рассказово, Тамбовская область.',
    url: 'https://sherston.ru',
    logo: {
      '@type': 'ImageObject',
      url: 'https://sherston.ru/logo.png',
      width: 200,
      height: 200,
    },
    image: 'https://sherston.ru/og.jpg',
    telephone: '+7-XXX-XXX-XX-XX',
    email: 'b2b@sherston.ru',
    taxID: '682800528205',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'г. Рассказово',
      addressRegion: 'Тамбовская область',
      addressCountry: 'RU',
      postalCode: '393250',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 52.6561,
      longitude: 41.8843,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    sameAs: [
      'https://vk.com/sherston_wool',
      'https://t.me/sherston_wool',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Каталог шерстяных носков',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Шерстяные носки оптом' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Носки с логотипом' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Детские носки оптом' } },
      ],
    },
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function FAQSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Какой минимальный заказ носков оптом?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Минимальный заказ у SHERSTON: классические носки от 100 пар, гольфы от 50 пар, детские от 200 пар, носки с логотипом от 50 пар.',
        },
      },
      {
        '@type': 'Question',
        name: 'Сколько стоят шерстяные носки оптом?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Оптовые цены SHERSTON: шерстяной микс от 65 ₽/пара, натуральная шерсть от 85 ₽/пара, мерино от 130 ₽/пара. При объёме от 500 пар — скидки 5–15%.',
        },
      },
      {
        '@type': 'Question',
        name: 'Как заказать носки с логотипом компании?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Откройте конструктор на sherston.ru/custom, загрузите логотип PNG/SVG, получите 3D-превью за 30 минут, подтвердите — носки готовы через 14 рабочих дней. Минимум 50 пар.',
        },
      },
      {
        '@type': 'Question',
        name: 'Как стать дилером SHERSTON?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Заполните заявку на sherston.ru/b2b/dealer. Менеджер свяжется за 2 часа. Маржа дилера 40–60%, персональные прайсы, личный кабинет 24/7.',
        },
      },
      {
        '@type': 'Question',
        name: 'Как быстро доставляют носки оптом?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Отгрузка со склада в Рассказово за 1 рабочий день. Москва 1–2 дня, СПб 2–3 дня, Урал/Сибирь 3–5 дней. Работаем со СДЭК, Деловыми линиями, ПЭК.',
        },
      },
    ],
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function BreadcrumbSchema({
  items,
}: {
  items: { name: string; url: string }[]
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function WebSiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'SHERSTON',
    url: 'https://sherston.ru',
    description: 'B2B платформа производителя шерстяных носков',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://sherston.ru/catalog?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
