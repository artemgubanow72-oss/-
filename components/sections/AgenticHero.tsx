'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

type Segment = 'unknown' | 'dealer' | 'corporate' | 'retail'

const CONTENT = {
  unknown: {
    badge: '⚡ SHERSTON Wool Ecosystem',
    color: '#E94560',
    headline: 'Шерстяные носки для бизнеса',
    sub: 'Производитель оптом. B2B платформа. Конструктор носков с логотипом.',
    cta1: { text: 'Стать дилером', href: '/b2b/dealer' },
    cta2: { text: 'Конструктор', href: '/custom' },
    stats: [
      { value: '500+',  label: 'моделей' },
      { value: '150+',  label: 'дилеров' },
      { value: '20+',   label: 'лет' },
    ],
  },
  dealer: {
    badge: '🤝 Для оптовых дилеров',
    color: '#E94560',
    headline: 'Зарабатывайте на носках',
    sub: 'Личный кабинет, персональный прайс, маржа 40–60%. Первый заказ за 1 день.',
    cta1: { text: 'Подать заявку', href: '/b2b/dealer' },
    cta2: { text: 'ROI калькулятор', href: '/b2b/dealer' },
    stats: [
      { value: '40–60%', label: 'маржа' },
      { value: '1 день', label: 'отгрузка' },
      { value: '−15%',   label: 'скидка' },
    ],
  },
  corporate: {
    badge: '🏢 Корпоративным клиентам',
    color: '#7C3AED',
    headline: 'Носки с вашим логотипом',
    sub: '3D-превью за 30 минут. Жаккард не стирается. От 50 пар за 14 дней.',
    cta1: { text: 'Открыть конструктор', href: '/custom' },
    cta2: { text: 'Каталог', href: '/catalog' },
    stats: [
      { value: '30 мин', label: 'превью' },
      { value: '14 дней', label: 'производство' },
      { value: '50 пар',  label: 'минимум' },
    ],
  },
  retail: {
    badge: '🛍️ Розничным покупателям',
    color: '#059669',
    headline: 'Натуральные носки',
    sub: 'Шерсть, мерино, ангора. Прямо с фабрики. Eco Score 10/10.',
    cta1: { text: 'Смотреть каталог', href: '/catalog' },
    cta2: { text: 'Стать дилером', href: '/b2b/dealer' },
    stats: [
      { value: '500+', label: 'моделей' },
      { value: '10/10', label: 'eco score' },
      { value: '20 лет', label: 'качество' },
    ],
  },
}

const TABS: { type: Segment; label: string; icon: string }[] = [
  { type: 'dealer',    label: 'Дилер',      icon: '🤝' },
  { type: 'corporate', label: 'Корпоратив', icon: '🏢' },
  { type: 'retail',    label: 'Розница',    icon: '🛍️' },
]

export default function AgenticHero() {
  const [segment, setSegment] = useState<Segment>('unknown')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (typeof window === 'undefined') return

    const params = new URLSearchParams(window.location.search)
    const utm = params.get('utm_content') ?? params.get('utm_campaign') ?? ''
    const ref = document.referrer.toLowerCase()

    let detected: Segment = 'unknown'

    if (
      utm.includes('dealer') || utm.includes('b2b') ||
      ref.includes('wildberries') || ref.includes('ozon')
    ) {
      detected = 'dealer'
    } else if (utm.includes('corp') || utm.includes('logo')) {
      detected = 'corporate'
    } else if (utm.includes('retail') || utm.includes('shop')) {
      detected = 'retail'
    } else {
      const saved = localStorage.getItem('sherston_segment') as Segment | null
      if (saved && CONTENT[saved]) detected = saved
    }

    setSegment(detected)
  }, [])

  const handleTab = (type: Segment) => {
    setSegment(type)
    if (typeof window !== 'undefined') {
      localStorage.setItem('sherston_segment', type)
    }
  }

  const c = CONTENT[segment]

  if (!mounted) return null

  return (
    <section className="py-20 bg-[#060608] relative overflow-hidden">
      {/* Ambient glow */}
      <motion.div
        animate={{ opacity: [0.06, 0.14, 0.06] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
      >
        <div
          className="w-[80vw] h-[50vh] rounded-full blur-[120px]"
          style={{ background: c.color }}
        />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div
            className="flex p-1 rounded-2xl gap-1"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            {TABS.map((tab) => (
              <motion.button
                key={tab.type}
                onClick={() => handleTab(tab.type)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300"
                style={{
                  background:
                    segment === tab.type
                      ? `linear-gradient(135deg, ${c.color}CC, ${c.color}88)`
                      : 'transparent',
                  color:
                    segment === tab.type ? 'white' : 'rgba(255,255,255,0.35)',
                }}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={segment}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{
                background: `${c.color}15`,
                border: `1px solid ${c.color}30`,
              }}
            >
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: c.color }}
              />
              <span className="text-xs font-semibold" style={{ color: c.color }}>
                {c.badge}
              </span>
            </div>

            {/* Headline */}
            <h2
              className="font-black text-white mb-4"
              style={{
                fontSize: 'clamp(2rem, 6vw, 6rem)',
                lineHeight: 1,
              }}
            >
              {c.headline}
            </h2>

            {/* Sub */}
            <p className="text-white/45 text-lg max-w-xl mx-auto mb-8 leading-relaxed">
              {c.sub}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
              <Link href={c.cta1.href}>
                <motion.button
                  whileHover={{ scale: 1.06, y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-9 py-4 rounded-full font-bold text-white text-base overflow-hidden relative"
                  style={{
                    background: `linear-gradient(135deg, ${c.color}, #F5A623)`,
                    boxShadow: `0 8px 30px ${c.color}40`,
                  }}
                >
                  {c.cta1.text}
                </motion.button>
              </Link>
              <Link href={c.cta2.href}>
                <motion.button
                  whileHover={{ scale: 1.06 }}
                  className="px-9 py-4 rounded-full font-semibold text-white/55 hover:text-white border border-white/[0.08] hover:border-white/20 transition-all text-base"
                >
                  {c.cta2.text}
                </motion.button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-center gap-10">
              {c.stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="text-center"
                >
                  <div className="text-2xl font-black" style={{ color: c.color }}>
                    {s.value}
                  </div>
                  <div className="text-white/30 text-xs mt-0.5">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
