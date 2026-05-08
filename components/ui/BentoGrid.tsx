'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import Link from 'next/link'

interface BentoItem {
  id: string
  icon: string
  title: string
  desc: string
  href: string
  span?: 'normal' | 'wide' | 'tall' | 'large'
  accent?: 'red' | 'gold' | 'purple' | 'green' | 'blue'
  badge?: string
}

const ACCENT_STYLES = {
  red:    { bg: 'rgba(233,69,96,0.08)',   border: 'rgba(233,69,96,0.15)',   glow: '#E94560' },
  gold:   { bg: 'rgba(245,166,35,0.08)',  border: 'rgba(245,166,35,0.15)',  glow: '#F5A623' },
  purple: { bg: 'rgba(124,58,237,0.08)',  border: 'rgba(124,58,237,0.15)',  glow: '#7C3AED' },
  green:  { bg: 'rgba(5,150,105,0.08)',   border: 'rgba(5,150,105,0.15)',   glow: '#059669' },
  blue:   { bg: 'rgba(59,130,246,0.08)',  border: 'rgba(59,130,246,0.15)',  glow: '#3B82F6' },
}

const SPAN_CLASSES = {
  normal: 'col-span-1 row-span-1',
  wide:   'col-span-2 row-span-1',
  tall:   'col-span-1 row-span-2',
  large:  'col-span-2 row-span-2',
}

const DEFAULT_ITEMS: BentoItem[] = [
  {
    id: 'catalog',
    icon: '📦',
    title: 'Каталог 500+ моделей',
    desc: 'Шерсть, мерино, ангора, эко — оптом с фабрики',
    href: '/catalog',
    span: 'wide',
    accent: 'red',
  },
  {
    id: 'custom',
    icon: '🎨',
    title: 'Конструктор носков',
    desc: 'Загрузи логотип → 3D превью за 30 мин',
    href: '/custom',
    span: 'normal',
    accent: 'gold',
    badge: 'NEW',
  },
  {
    id: 'b2b',
    icon: '🤝',
    title: 'B2B Платформа',
    desc: 'Кабинет дилера онлайн 24/7',
    href: '/b2b/dealer',
    span: 'normal',
    accent: 'purple',
  },
  {
    id: 'delivery',
    icon: '🚀',
    title: 'Отгрузка за 1 день',
    desc: 'Склад в Рассказово — доставка по России',
    href: '/b2b/dealer',
    span: 'normal',
    accent: 'green',
  },
  {
    id: 'eco',
    icon: '🌿',
    title: 'Эко-линейка',
    desc: 'GOTS. 100% органика. Eco Score 10/10',
    href: '/catalog',
    span: 'normal',
    accent: 'green',
  },
]

interface BentoGridProps {
  items?: BentoItem[]
  className?: string
}

export default function BentoGrid({
  items = DEFAULT_ITEMS,
  className = '',
}: BentoGridProps) {
  return (
    <div
      className={`grid grid-cols-2 md:grid-cols-3 gap-3 ${className}`}
      style={{ gridAutoRows: '160px' }}
    >
      {items.map((item, i) => {
        const accent = ACCENT_STYLES[item.accent ?? 'red']
        const spanClass = SPAN_CLASSES[item.span ?? 'normal']

        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{
              delay: i * 0.07,
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={spanClass}
          >
            <Link href={item.href} className="block h-full group">
              <div
                className="relative h-full rounded-2xl p-6 overflow-hidden
                           transition-all duration-400 ease-spring
                           hover:-translate-y-1"
                style={{
                  background: '#0C0C10',
                  border: `1px solid ${accent.border}`,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                }}
              >
                {/* Glow при hover */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100
                             transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 30% 40%, ${accent.glow}15 0%, transparent 65%)`,
                  }}
                />

                {/* Верхняя линия */}
                <div
                  className="absolute top-0 left-0 right-0 h-px
                             opacity-0 group-hover:opacity-100
                             transition-opacity duration-400"
                  style={{
                    background: `linear-gradient(90deg, ${accent.glow}, transparent)`,
                  }}
                />

                {/* Badge */}
                {item.badge && (
                  <div className="absolute top-4 right-4">
                    <span
                      className="px-2 py-0.5 rounded text-[10px] font-black text-white"
                      style={{ background: accent.glow }}
                    >
                      {item.badge}
                    </span>
                  </div>
                )}

                {/* Контент */}
                <div className="relative h-full flex flex-col">
                  <span className="text-4xl mb-auto block
                                   group-hover:scale-110 group-hover:rotate-6
                                   transition-transform duration-500">
                    {item.icon}
                  </span>

                  <div className="mt-4">
                    <h3 className="text-white font-bold text-base leading-tight mb-1
                                   group-hover:text-[#E94560] transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-white/35 text-xs leading-relaxed line-clamp-2">
                      {item.desc}
                    </p>
                  </div>

                  {/* Стрелка */}
                  <motion.span
                    className="absolute bottom-0 right-0 text-white/20
                               group-hover:text-white/60 transition-colors duration-300"
                    animate={{ x: 0 }}
                    whileHover={{ x: 4 }}
                  >
                    →
                  </motion.span>
                </div>
              </div>
            </Link>
          </motion.div>
        )
      })}
    </div>
  )
                      }
