'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const CARDS = [
  {
    num: '01',
    icon: '📦',
    title: '500+ моделей носков',
    desc: 'Шерсть, мерино, ангора, хлопок. Оптом напрямую с фабрики. Честный ЗНАК на каждой паре.',
    cta: { text: 'Смотреть каталог', href: '/catalog' },
    accent: '#E94560',
    bg: '#0A0A0E',
    stat: { v: '500+', l: 'моделей' },
  },
  {
    num: '02',
    icon: '🎨',
    title: 'Носки с вашим логотипом',
    desc: 'Загрузите логотип — 3D-превью за 30 минут. Жаккард не стирается. От 50 пар.',
    cta: { text: 'Открыть конструктор', href: '/custom' },
    accent: '#F5A623',
    bg: '#0D0808',
    stat: { v: '30мин', l: 'превью' },
  },
  {
    num: '03',
    icon: '🤝',
    title: 'Личный кабинет дилера',
    desc: 'Заказы, прайсы, аналитика, документы — всё онлайн 24/7. Маржа 40–60%.',
    cta: { text: 'Стать дилером', href: '/b2b/dealer' },
    accent: '#7C3AED',
    bg: '#080810',
    stat: { v: '40%+', l: 'маржа' },
  },
  {
    num: '04',
    icon: '🌿',
    title: 'Органическая шерсть GOTS',
    desc: 'Без синтетики, без химии. Биоразлагаемая упаковка. Eco Score 10/10.',
    cta: { text: 'Эко-коллекция', href: '/catalog' },
    accent: '#059669',
    bg: '#060A06',
    stat: { v: '10/10', l: 'eco score' },
  },
]

export default function StackScrollSection() {
  return (
    <section className="py-20 bg-[#060608]">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-[10px] text-[#E94560] tracking-[8px] uppercase font-bold mb-4">
            Экосистема
          </p>
          <h2
            className="font-black text-white leading-none"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 8rem)' }}
          >
            ЧТО МЫ{' '}
            <span
              style={{
                WebkitTextStroke: '2px rgba(255,255,255,0.15)',
                WebkitTextFillColor: 'transparent',
              }}
            >
              ПРЕДЛАГАЕМ
            </span>
          </h2>
        </motion.div>

        <div className="space-y-4">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden rounded-3xl p-8 md:p-12"
              style={{
                background: card.bg,
                border: `1px solid ${card.accent}20`,
                boxShadow: `0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 ${card.accent}15`,
                minHeight: '240px',
              }}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 80% 50%, ${card.accent}08, transparent 60%)`,
                }}
              />
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: `linear-gradient(90deg,${card.accent},transparent)` }}
              />

              <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <span
                      className="text-7xl font-black opacity-15 leading-none"
                      style={{ color: card.accent }}
                    >
                      {card.num}
                    </span>
                    <span className="text-4xl">{card.icon}</span>
                  </div>
                  <h3
                    className="font-black text-white leading-tight mb-4"
                    style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}
                  >
                    {card.title}
                  </h3>
                  <p className="text-white/40 text-base leading-relaxed mb-6">
                    {card.desc}
                  </p>
                  <Link href={card.cta.href}>
                    <motion.button
                      whileHover={{ scale: 1.05, x: 4 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex items-center gap-3 px-7 py-3 rounded-full font-bold text-white text-sm"
                      style={{ background: `linear-gradient(135deg,${card.accent},${card.accent}99)` }}
                    >
                      {card.cta.text}
                      <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
                        →
                      </motion.span>
                    </motion.button>
                  </Link>
                </div>

                <div className="hidden md:flex items-center justify-center">
                  <motion.div
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-44 h-44 rounded-3xl flex flex-col items-center justify-center relative overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg,${card.accent}20,${card.accent}08)`,
                      border: `1px solid ${card.accent}25`,
                    }}
                  >
                    <span className="text-6xl mb-3">{card.icon}</span>
                    <div className="text-3xl font-black" style={{ color: card.accent }}>
                      {card.stat.v}
                    </div>
                    <div className="text-white/30 text-xs tracking-[3px] uppercase">
                      {card.stat.l}
                    </div>
                  </motion.div>
                </div>
              </div>

              <div
                className="absolute bottom-4 right-8 font-black text-6xl opacity-[0.04] leading-none select-none"
                style={{ color: card.accent }}
              >
                {card.num}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
