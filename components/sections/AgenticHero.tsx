'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

// Определяем тип посетителя по поведению
type VisitorType = 'unknown' | 'dealer' | 'retail' | 'corporate'

interface VisitorContent {
  badge: string
  headline: string
  sub: string
  cta1: { text: string; href: string }
  cta2: { text: string; href: string }
  stats: { value: string; label: string }[]
  color: string
}

const CONTENT: Record<VisitorType, VisitorContent> = {
  dealer: {
    badge: '🤝 Для оптовых дилеров',
    headline: 'Зарабатывайте на носках',
    sub: 'Личный кабинет, персональный прайс, маржа 40–60%. Первый заказ за 1 день.',
    cta1: { text: 'Подать заявку дилера', href: '/b2b/dealer' },
    cta2: { text: 'ROI калькулятор', href: '#roi' },
    stats: [
      { value: '40–60%', label: 'маржа' },
      { value: '1 день', label: 'отгрузка' },
      { value: '−15%', label: 'скидка опт' },
    ],
    color: '#E94560',
  },
  corporate: {
    badge: '🏢 Корпоративным клиентам',
    headline: 'Носки с вашим логотипом',
    sub: '3D-превью за 30 минут. Жаккард не стирается. От 50 пар за 14 дней.',
    cta1: { text: 'Открыть конструктор', href: '/custom' },
    cta2: { text: 'Примеры работ', href: '/catalog' },
    stats: [
      { value: '30 мин', label: 'превью' },
      { value: '14 дней', label: 'производство' },
      { value: '50 пар', label: 'минимум' },
    ],
    color: '#7C3AED',
  },
  retail: {
    badge: '🛍️ Розничным покупателям',
    headline: 'Натуральные носки',
    sub: 'Шерсть, мерино, ангора. Прямо с фабрики. Eco Score 10/10.',
    cta1: { text: 'Смотреть каталог', href: '/catalog' },
    cta2: { text: 'Стать дилером', href: '/b2b/dealer' },
    stats: [
      { value: '500+', label: 'моделей' },
      { value: '10/10', label: 'eco score' },
      { value: '20 лет', label: 'качество' },
    ],
    color: '#059669',
  },
  unknown: {
    badge: '⚡ SHERSTON Wool Ecosystem',
    headline: 'Шерстяные носки для бизнеса',
    sub: 'Производитель оптом. B2B платформа. Конструктор носков с логотипом.',
    cta1: { text: 'Стать дилером', href: '/b2b/dealer' },
    cta2: { text: 'Конструктор носков', href: '/custom' },
    stats: [
      { value: '500+', label: 'моделей' },
      { value: '150+', label: 'дилеров' },
      { value: '20+', label: 'лет' },
    ],
    color: '#E94560',
  },
}

// Определяем тип по UTM, реферреру, поведению
function detectVisitor(): VisitorType {
  if (typeof window === 'undefined') return 'unknown'
  const params = new URLSearchParams(window.location.search)
  const utm = params.get('utm_content') || params.get('utm_campaign') || ''
  const ref = document.referrer.toLowerCase()

  if (utm.includes('dealer') || utm.includes('b2b') ||
      ref.includes('wildberries') || ref.includes('ozon'))
    return 'dealer'
  if (utm.includes('corp') || utm.includes('logo') || utm.includes('brand'))
    return 'corporate'
  if (utm.includes('retail') || utm.includes('shop'))
    return 'retail'

  // Проверяем localStorage
  const saved = localStorage.getItem('sherston_visitor_type')
  if (saved) return saved as VisitorType

  return 'unknown'
}

const VISITOR_TABS: { type: VisitorType; label: string; icon: string }[] = [
  { type: 'dealer',    label: 'Дилер',        icon: '🤝' },
  { type: 'corporate', label: 'Корпоратив',   icon: '🏢' },
  { type: 'retail',    label: 'Розница',      icon: '🛍️' },
]

export default function AgenticHero() {
  const [visitor, setVisitor] = useState<VisitorType>('unknown')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const detected = detectVisitor()
    setVisitor(detected)
    setMounted(true)
  }, [])

  const content = CONTENT[visitor]

  const handleTabChange = (type: VisitorType) => {
    setVisitor(type)
    localStorage.setItem('sherston_visitor_type', type)
  }

  if (!mounted) return null

  return (
    <section className="py-20 bg-[#060608] relative overflow-hidden">

      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ opacity: [0.08, 0.14, 0.08] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                     w-[80vw] h-[50vh] rounded-full blur-[100px]"
          style={{ background: content.color }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* TABS — выбор роли */}
        <div className="flex justify-center mb-10">
          <div
            className="flex p-1 rounded-2xl gap-1"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            {VISITOR_TABS.map((tab) => (
              <motion.button
                key={tab.type}
                onClick={() => handleTabChange(tab.type)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`
                  flex items-center gap-2 px-5 py-2.5 rounded-xl
                  text-sm font-semibold transition-all duration-300
                  ${visitor === tab.type
                    ? 'text-white shadow-lg'
                    : 'text-white/35 hover:text-white/60'
                  }
                `}
                style={visitor === tab.type ? {
                  background: `linear-gradient(135deg, ${content.color}CC, ${content.color}88)`,
                } : {}}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* КОНТЕНТ — меняется по типу посетителя */}
        <AnimatePresence mode="wait">
          <motion.div
            key={visitor}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{
                background: `${content.color}15`,
                border: `1px solid ${content.color}30`,
              }}
            >
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: content.color }}
              />
              <span className="text-xs font-semibold" style={{ color: content.color }}>
                {content.badge}
              </span>
            </div>

            {/* Заголовок */}
            <h2
              className="font-black text-white mb-4"
              style={{ fontSize: 'clamp(2rem, 5vw, 5.5rem)', lineHeight: 1 }}
            >
              {content.headline}
            </h2>

            {/* Описание */}
            <p className="text-white/45 text-lg max-w-xl mx-auto mb-8 leading-relaxed">
              {content.sub}
            </p>

            {/* Кнопки */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
              <Link href={content.cta1.href}>
                <motion.button
                  whileHover={{ scale: 1.06, y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-9 py-4 rounded-full font-bold text-white text-base
                             relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${content.color}, #F5A623)`,
                    boxShadow: `0 8px 30px ${content.color}40`,
                  }}
                >
                  {content.cta1.text}
                </motion.button>
              </Link>
              <Link href={content.cta2.href}>
                <motion.button
                  whileHover={{ scale: 1.06 }}
                  className="px-9 py-4 rounded-full font-semibold text-white/55
                             hover:text-white border border-white/[0.08]
                             hover:border-white/20 transition-all text-base"
                >
                  {content.cta2.text}
                </motion.button>
              </Link>
            </div>

            {/* Мини-статистика */}
            <div className="flex items-center justify-center gap-8">
              {content.stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="text-center"
                >
                  <div
                    className="text-2xl font-black"
                    style={{ color: content.color }}
                  >
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
