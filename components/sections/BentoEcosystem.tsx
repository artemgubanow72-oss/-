'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

// Bento Grid — асимметричная сетка экосистемы
const BENTO_ITEMS = [
  {
    id: 'catalog',
    size: 'large',   // col-span-2 row-span-2
    icon: '📦',
    eyebrow: 'Каталог',
    title: '500+ моделей оптом',
    desc: 'Шерсть, мерино, ангора, эко. Прямо с фабрики в Рассказово.',
    href: '/catalog',
    accent: '#E94560',
    metric: { value: '500+', label: 'SKU' },
    pattern: 'dots',
  },
  {
    id: 'custom',
    size: 'tall',    // col-span-1 row-span-2
    icon: '🎨',
    eyebrow: 'Конструктор',
    title: 'Носки с вашим логотипом',
    desc: '3D-превью за 30 мин. Жаккард навсегда.',
    href: '/custom',
    accent: '#F5A623',
    metric: { value: '14', label: 'дней' },
    pattern: 'lines',
    badge: 'NEW',
  },
  {
    id: 'b2b',
    size: 'normal',  // col-span-1 row-span-1
    icon: '🤝',
    eyebrow: 'B2B',
    title: 'Стать дилером',
    desc: 'Маржа 40–60%',
    href: '/b2b/dealer',
    accent: '#7C3AED',
    metric: { value: '40%+', label: 'маржа' },
    pattern: null,
  },
  {
    id: 'delivery',
    size: 'normal',
    icon: '🚀',
    eyebrow: 'Логистика',
    title: 'Отгрузка за 1 день',
    desc: 'Со склада по всей России',
    href: '/b2b/dealer',
    accent: '#059669',
    metric: { value: '1', label: 'день' },
    pattern: null,
  },
  {
    id: 'eco',
    size: 'wide',    // col-span-2 row-span-1
    icon: '🌿',
    eyebrow: 'Эко-линейка',
    title: 'GOTS органика. Eco Score 10/10.',
    desc: 'Без синтетики, без химии. Биоразлагаемая упаковка.',
    href: '/catalog',
    accent: '#059669',
    metric: { value: '10/10', label: 'eco' },
    pattern: 'grid',
  },
]

function PatternDots() {
  return (
    <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
      style={{
        backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      }}
    />
  )
}

function PatternLines() {
  return (
    <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
      style={{
        backgroundImage: 'repeating-linear-gradient(45deg, white 0px, white 1px, transparent 1px, transparent 16px)',
      }}
    />
  )
}

function PatternGrid() {
  return (
    <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
      style={{
        backgroundImage:
          'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),' +
          'linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
        backgroundSize: '30px 30px',
      }}
    />
  )
}

export default function BentoEcosystem() {
  return (
    <section className="py-28 bg-[#060608]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Заголовок в стиле CO&IN editorial */}
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
              initial={{ opacity: 0, y: 25 }}
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
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-white/30 text-sm max-w-xs leading-relaxed md:text-right"
          >
            От первого заказа до носков
            с вашим логотипом — всё в одном месте
          </motion.p>
        </div>

        {/* BENTO GRID */}
        <div
          className="grid gap-3"
          style={{
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows: 'repeat(3, 220px)',
          }}
        >
          {BENTO_ITEMS.map((item, i) => {
            const spanClass =
              item.size === 'large' ? 'col-span-2 row-span-2' :
              item.size === 'tall'  ? 'col-span-1 row-span-2' :
              item.size === 'wide'  ? 'col-span-2 row-span-1' :
              'col-span-1 row-span-1'

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  delay: i * 0.06,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={spanClass}
              >
                <Link href={item.href} className="block h-full group">
                  <div
                    className="relative h-full rounded-2xl p-6 overflow-hidden
                               transition-all duration-500"
                    style={{
                      background: '#0C0C10',
                      border: `1px solid ${item.accent}20`,
                    }}
                  >
                    {/* Паттерн фона */}
                    {item.pattern === 'dots'  && <PatternDots />}
                    {item.pattern === 'lines' && <PatternLines />}
                    {item.pattern === 'grid'  && <PatternGrid />}

                    {/* Gradient hover */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100
                                 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at 30% 40%, ${item.accent}18 0%, transparent 60%)`,
                      }}
                    />

                    {/* Top line */}
                    <motion.div
                      className="absolute top-0 left-0 h-px w-0 group-hover:w-full
                                 transition-all duration-500"
                      style={{ background: `linear-gradient(90deg, ${item.accent}, transparent)` }}
                    />

                    {/* Badge */}
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

                    {/* Контент */}
                    <div className="relative h-full flex flex-col z-10">

                      {/* Иконка */}
                      <div className="flex items-start justify-between">
                        <motion.span
                          className="text-4xl block"
                          whileHover={{ scale: 1.2, rotate: 8 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        >
                          {item.icon}
                        </motion.span>

                        {/* Метрика */}
                        <div className="text-right">
                          <div
                            className="text-2xl font-black leading-none"
                            style={{ color: item.accent }}
                          >
                            {item.metric.value}
                          </div>
                          <div className="text-white/25 text-xs">{item.metric.label}</div>
                        </div>
                      </div>

                      {/* Текст */}
                      <div className="mt-auto">
                        <p
                          className="text-[10px] font-bold tracking-[4px] uppercase mb-2"
                          style={{ color: `${item.accent}80` }}
                        >
                          {item.eyebrow}
                        </p>
                        <h3
                          className="text-white font-bold leading-tight mb-2
                                     group-hover:text-opacity-100 transition-all duration-300"
                          style={{ fontSize: item.size === 'large' ? '1.35rem' : '1.05rem' }}
                        >
                          {item.title}
                        </h3>
                        <p className="text-white/30 text-xs leading-relaxed line-clamp-2">
                          {item.desc}
                        </p>
                      </div>

                      {/* Arrow */}
                      <motion.div
                        className="absolute bottom-0 right-0 text-white/20
                                   group-hover:text-white/60 transition-colors"
                        whileHover={{ x: 4, y: -4 }}
                      >
                        ↗
                      </motion.div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
