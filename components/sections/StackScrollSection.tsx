'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'

const STACK_CARDS = [
  {
    id: 'catalog',
    bg: '#0A0A0E',
    accent: '#E94560',
    label: '01 / КАТАЛОГ',
    title: '500+ моделей шерстяных носков',
    desc: 'Шерсть, мерино, ангора, хлопок. Оптом напрямую с фабрики в Рассказово. Честный ЗНАК.',
    cta: { text: 'Смотреть каталог', href: '/catalog' },
    visual: '📦',
    stat: { v: '500+', l: 'моделей' },
  },
  {
    id: 'custom',
    bg: '#0D0808',
    accent: '#F5A623',
    label: '02 / КОНСТРУКТОР',
    title: 'Носки с вашим логотипом',
    desc: 'Загрузите логотип — 3D-превью за 30 минут. Жаккард не стирается. От 50 пар.',
    cta: { text: 'Открыть конструктор', href: '/custom' },
    visual: '🎨',
    stat: { v: '30мин', l: 'превью' },
  },
  {
    id: 'b2b',
    bg: '#080810',
    accent: '#7C3AED',
    label: '03 / B2B ПЛАТФОРМА',
    title: 'Личный кабинет дилера',
    desc: 'Заказы, прайсы, аналитика, документы — всё онлайн 24/7. Маржа 40–60%.',
    cta: { text: 'Стать дилером', href: '/b2b/dealer' },
    visual: '🤝',
    stat: { v: '40%+', l: 'маржа' },
  },
  {
    id: 'eco',
    bg: '#060A06',
    accent: '#059669',
    label: '04 / ЭКО-ЛИНЕЙКА',
    title: 'Органическая шерсть GOTS',
    desc: 'Без синтетики, без химии. Биоразлагаемая упаковка. Eco Score 10/10.',
    cta: { text: 'Эко-коллекция', href: '/catalog' },
    visual: '🌿',
    stat: { v: '10/10', l: 'eco score' },
  },
]

function StackCard({
  card,
  index,
  total,
  scrollProgress,
}: {
  card: (typeof STACK_CARDS)[0]
  index: number
  total: number
  scrollProgress: any
}) {
  const start = index / total
  const end   = (index + 1) / total

  // Каждая карточка появляется и прилипает сверху
  const y = useTransform(
    scrollProgress,
    [start - 0.1, start, end],
    ['80px', '0px', '0px']
  )
  const opacity = useTransform(
    scrollProgress,
    [start - 0.05, start, end - 0.05, end],
    [0, 1, 1, index === total - 1 ? 1 : 0.4]
  )
  const scale = useTransform(
    scrollProgress,
    [start, end],
    [1, index === total - 1 ? 1 : 0.95]
  )

  return (
    <motion.div
      style={{
        y, opacity, scale,
        position: 'sticky',
        top: `${60 + index * 14}px`,
        zIndex: index + 1,
      }}
      className="w-full"
    >
      <div
        className="relative overflow-hidden rounded-3xl p-8 md:p-12"
        style={{
          background: card.bg,
          border: `1px solid ${card.accent}20`,
          boxShadow: `0 20px 60px rgba(0,0,0,0.6), inset 0 1px 0 ${card.accent}15`,
          minHeight: '320px',
        }}
      >
        {/* Grain на карточке */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03] rounded-3xl"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Верхняя линия */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg, ${card.accent}, transparent)` }}
        />

        {/* Органический blob */}
        <div
          className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ background: card.accent }}
        />

        <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
          {/* Текст */}
          <div>
            <span
              className="text-[10px] font-black tracking-[6px] uppercase mb-4 block"
              style={{ color: `${card.accent}80` }}
            >
              {card.label}
            </span>
            <h3
              className="font-black text-white leading-tight mb-4"
              style={{ fontSize: 'clamp(1.6rem, 3vw, 2.8rem)' }}
            >
              {card.title}
            </h3>
            <p className="text-white/40 text-base leading-relaxed mb-8">
              {card.desc}
            </p>
            <Link href={card.cta.href}>
              <motion.button
                whileHover={{ scale: 1.05, x: 4 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-3 px-7 py-3 rounded-full
                           font-bold text-white text-sm"
                style={{ background: `linear-gradient(135deg, ${card.accent}, ${card.accent}99)` }}
              >
                {card.cta.text}
                <motion.span animate={{ x: [0,5,0] }} transition={{ duration:1.8, repeat:Infinity }}>
                  →
                </motion.span>
              </motion.button>
            </Link>
          </div>

          {/* Визуал — Игривость и 3D */}
          <div className="hidden md:flex items-center justify-center">
            <motion.div
              className="relative"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              {/* Большая иконка */}
              <div
                className="w-48 h-48 rounded-3xl flex flex-col items-center justify-center
                           relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${card.accent}20, ${card.accent}08)`,
                  border: `1px solid ${card.accent}25`,
                  backdropFilter: 'blur(20px)',
                }}
              >
                <span className="text-7xl mb-3">{card.visual}</span>
                <div className="text-center">
                  <div
                    className="text-3xl font-black"
                    style={{ color: card.accent }}
                  >
                    {card.stat.v}
                  </div>
                  <div className="text-white/30 text-xs tracking-[3px] uppercase">
                    {card.stat.l}
                  </div>
                </div>
              </div>

              {/* Shadow */}
              <div
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-4 rounded-full blur-xl opacity-60"
                style={{ background: card.accent }}
              />
            </motion.div>
          </div>
        </div>

        {/* Номер карточки */}
        <div
          className="absolute top-6 right-8 font-black text-6xl opacity-[0.05] leading-none select-none"
          style={{ color: card.accent }}
        >
          {String(index + 1).padStart(2, '0')}
        </div>
      </div>
    </motion.div>
  )
}

export default function StackScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  return (
    <section className="bg-[#060608] py-20">
      <div className="max-w-5xl mx-auto px-6 md:px-12">

        {/* Заголовок */}
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
            className="font-black text-white leading-none mb-4"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 8rem)' }}
          >
            ЧТО МЫ
            <span
              className="block text-stroke"
              style={{
                WebkitTextStroke: '2px rgba(255,255,255,0.15)',
                WebkitTextFillColor: 'transparent',
              }}
            >
              ПРЕДЛАГАЕМ
            </span>
          </h2>
          <p className="text-white/25 text-sm tracking-[3px] uppercase">
            Скролльте вниз
          </p>
        </motion.div>

        {/* Stack контейнер */}
        <div ref={containerRef} style={{ height: `${STACK_CARDS.length * 80}vh` }}>
          <div className="space-y-4">
            {STACK_CARDS.map((card, i) => (
              <StackCard
                key={card.id}
                card={card}
                index={i}
                total={STACK_CARDS.length}
                scrollProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
