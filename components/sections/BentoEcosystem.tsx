'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const ITEMS = [
  {
    id: 'catalog',
    icon: '📦',
    eyebrow: 'Каталог',
    title: '500+ моделей оптом',
    desc: 'Шерсть, мерино, ангора, эко. С фабрики в Рассказово.',
    href: '/catalog',
    accent: '#E94560',
    metric: { value: '500+', label: 'SKU' },
    cols: 'md:col-span-2',
    rows: 'md:row-span-2',
  },
  {
    id: 'custom',
    icon: '🎨',
    eyebrow: 'Конструктор',
    title: 'Носки с вашим логотипом',
    desc: '3D-превью за 30 мин. Жаккард навсегда.',
    href: '/custom',
    accent: '#F5A623',
    metric: { value: '14 дн', label: 'срок' },
    cols: '',
    rows: '',
    badge: 'NEW',
  },
  {
    id: 'b2b',
    icon: '🤝',
    eyebrow: 'B2B',
    title: 'Стать дилером',
    desc: 'Маржа 40–60%',
    href: '/b2b/dealer',
    accent: '#7C3AED',
    metric: { value: '40%+', label: 'маржа' },
    cols: '',
    rows: '',
  },
  {
    id: 'delivery',
    icon: '🚀',
    eyebrow: 'Логистика',
    title: 'Отгрузка за 1 день',
    desc: 'По всей России и СНГ',
    href: '/b2b/dealer',
    accent: '#059669',
    metric: { value: '1', label: 'день' },
    cols: '',
    rows: '',
  },
  {
    id: 'eco',
    icon: '🌿',
    eyebrow: 'Эко',
    title: 'GOTS органика',
    desc: 'Eco Score 10/10. Без химии.',
    href: '/catalog',
    accent: '#059669',
    metric: { value: '10/10', label: 'eco' },
    cols: 'md:col-span-2',
    rows: '',
  },
]

export default function BentoEcosystem() {
  return (
    <section className="py-28 bg-[#060608]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[10px] text-[#E94560] tracking-[8px] uppercase font-bold mb-3"
            >
              Экосистема
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-black text-white leading-none"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 7rem)' }}
            >
              ВСЁ ДЛЯ
              <span
                className="block"
                style={{
                  WebkitTextStroke: '2px rgba(255,255,255,0.15)',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                ВАШЕГО БИЗНЕСА
              </span>
            </motion.h2>
          </div>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-3"
          style={{ gridAutoRows: '220px' }}
        >
          {ITEMS.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className={`${item.cols} ${item.rows}`}
            >
              <Link href={item.href} className="block h-full group">
                <div
                  className="relative h-full rounded-2xl p-6 overflow-hidden transition-all duration-500 hover:-translate-y-1"
                  style={{
                    background: '#0C0C10',
                    border: `1px solid ${item.accent}20`,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at 30% 40%, ${item.accent}18, transparent 65%)`,
                    }}
                  />
                  <div
                    className="absolute top-0 left-0 w-0 group-hover:w-full h-px transition-all duration-500"
                    style={{ background: `linear-gradient(90deg,${item.accent},transparent)` }}
                  />
                  {item.badge && (
                    <div className="absolute top-4 right-4 z-10">
                      <span
                        className="px-2 py-0.5 rounded text-[10px] font-black text-white"
                        style={{ background: item.accent }}
                      >
                        {item.badge}
                      </span>
                    </div>
                  )}
                  <div className="relative h-full flex flex-col z-10">
                    <div className="flex items-start justify-between">
                      <motion.span
                        className="text-4xl block"
                        whileHover={{ scale: 1.2, rotate: 8 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        {item.icon}
                      </motion.span>
                      <div className="text-right">
                        <div className="text-2xl font-black leading-none" style={{ color: item.accent }}>
                          {item.metric.value}
                        </div>
                        <div className="text-white/25 text-xs">{item.metric.label}</div>
                      </div>
                    </div>
                    <div className="mt-auto">
                      <p className="text-[10px] font-bold tracking-[4px] uppercase mb-2" style={{ color: `${item.accent}80` }}>
                        {item.eyebrow}
                      </p>
                      <h3 className="text-white font-bold leading-tight mb-2 group-hover:text-[#E94560] transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-white/30 text-xs leading-relaxed line-clamp-2">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
