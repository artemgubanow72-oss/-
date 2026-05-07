import Link from 'next/link'

const LINKS = {
  catalog: {
    title: 'Каталог',
    items: [
      { label: 'Все носки',        href: '/catalog' },
      { label: 'Мужские',          href: '/catalog/men' },
      { label: 'Женские',          href: '/catalog/women' },
      { label: 'Детские',          href: '/catalog/children' },
      { label: 'Корпоративные',    href: '/catalog/corporate' },
      { label: 'Эко-линейка',      href: '/catalog/eco' },
      { label: 'Спортивные',       href: '/catalog/sport' },
    ],
  },
  b2b: {
    title: 'B2B Платформа',
    items: [
      { label: 'Стать дилером',    href: '/b2b/dealer' },
      { label: 'Личный кабинет',   href: '/dashboard' },
      { label: 'ROI Калькулятор',  href: '/b2b/calculator' },
      { label: 'Логистика',        href: '/b2b/logistics' },
      { label: 'Конструктор носков', href: '/custom' },
    ],
  },
  company: {
    title: 'Компания',
    items: [
      { label: 'О нас',            href: '/about' },
      { label: 'Производство',     href: '/production' },
      { label: 'Материалы',        href: '/materials' },
      { label: 'Сертификаты',      href: '/certificates' },
      { label: 'Блог',             href: '/blog' },
      { label: 'FAQ',              href: '/faq' },
    ],
  },
  support: {
    title: 'Поддержка',
    items: [
      { label: 'Контакты',         href: '/contact' },
      { label: 'Заказать образцы', href: '/samples' },
      { label: 'Запрос прайса',    href: '/price-request' },
      { label: 'Политика конфид.', href: '/privacy' },
    ],
  },
}

export default function Footer() {
  return (
    <footer className="bg-[#0D0D1A] border-t border-white/10">
      <div className="container mx-auto px-4 py-16">

        {/* Верх */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {Object.values(LINKS).map((section) => (
            <div key={section.title}>
              <h4 className="text-white font-bold text-sm mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-white/40 text-sm hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Контакты */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 p-6 rounded-2xl glass border border-white/10">
          <div>
            <span className="text-white/30 text-xs uppercase tracking-wider">Телефон</span>
            <a href="tel:+7XXXXXXXXXX" className="block text-white text-lg font-bold mt-1 hover:text-[#E94560] transition-colors">
              +7 (XXX) XXX-XX-XX
            </a>
          </div>
          <div>
            <span className="text-white/30 text-xs uppercase tracking-wider">Email</span>
            <a href="mailto:b2b@sherston.ru" className="block text-white text-lg font-bold mt-1 hover:text-[#E94560] transition-colors">
              b2b@sherston.ru
            </a>
          </div>
          <div>
            <span className="text-white/30 text-xs uppercase tracking-wider">Адрес</span>
            <p className="text-white text-lg font-bold mt-1">
              г. Рассказово, Тамбовская обл.
            </p>
          </div>
        </div>

        {/* Низ */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-wool-gradient flex items-center justify-center">
              <span className="text-white font-black text-sm">S</span>
            </div>
            <span className="text-white/30 text-sm">
              © {new Date().getFullYear()} SHERSTON. Все права защищены.
            </span>
          </div>
          <div className="flex items-center gap-5">
            <a href="https://t.me/sherston_wool" target="_blank" rel="noopener" className="text-white/30 hover:text-white transition-colors text-sm">
              Telegram
            </a>
            <a href="https://vk.com/sherston_wool" target="_blank" rel="noopener" className="text-white/30 hover:text-white transition-colors text-sm">
              ВКонтакте
            </a>
            <span className="text-white/10 text-xs">Сделано с 🧦 в Рассказово</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
