'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'

const FEATURES = [
  { icon: '💰', num: '01', title: 'Маржа 40–60%',     desc: 'Оптовые цены от производителя без посредников',   color: '#F5A623' },
  { icon: '🖥️', num: '02', title: 'Кабинет 24/7',     desc: 'Заказы, прайсы, документы — всё онлайн',          color: '#E94560' },
  { icon: '🎨', num: '03', title: 'Конструктор носков',desc: '3D-превью с вашим логотипом за 30 минут',         color: '#7C3AED' },
  { icon: '📦', num: '04', title: 'Склад всегда полон',desc: '500+ моделей. Отгрузка за 1 рабочий день',       color: '#059669' },
  { icon: '🤝', num: '05', title: 'Менеджер за 2 часа',desc: 'Персональный — знает ваш бизнес',                 color: '#0891B2' },
  { icon: '📜', num: '06', title: 'Все документы',      desc: 'Честный ЗНАК, ГОСТ, УПД — всё в порядке',        color: '#E94560' },
]

export default function B2BSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef   = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Параллакс заголовка
  const titleX = useTransform(scrollYProgress, [0, 1], ['5%', '-8%'])

  const BIG_WORDS = [
    { w: 'ЗАРАБАТЫВАЙ', solid: true  },
    { w: '✦',           solid: false },
    { w: 'НА',          solid: false },
    { w: 'НОСКАХ',      solid: true  },
    { w: '✦',           solid: false },
    { w: 'B2B',         solid: false },
    { w: 'ЭКОСИСТЕМА',  solid: false },
    { w: '✦',           solid: false },
  ]

  return (
    <section ref={sectionRef} className="py-32 bg-[#060608] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* ── ПАРАЛЛАКС ЗАГОЛОВОК ── */}
        <div className="overflow-hidden mb-16 -mx-6 md:-mx-12">
          <motion.div
            ref={titleRef}
            style={{ x: titleX }}
            className="flex items-baseline gap-6 md:gap-10 py-4 whitespace-nowrap"
          >
            {BIG_WORDS.map((item, i) => {
              const isStar = item.w === '✦'
              return (
                <span
                  key={i}
                  className={`font-black leading-none select-none ${
                    isStar ? 'text-[#E94560]/35' : ''
                  }`}
                  style={{
                    fontSize: isStar
                      ? 'clamp(2rem,5vw,5rem)'
                      : 'clamp(2.5rem,8vw,9rem)',
                    color: item.solid && !isStar ? 'white' : undefined,
                    WebkitTextStroke:
                      !item.solid && !isStar
                        ? '1px rgba(255,255,255,0.08)'
                        : undefined,
                    WebkitTextFillColor:
                      !item.solid && !isStar ? 'transparent' : undefined,
                  }}
                >
                  {item.w}
                </span>
              )
            })}
          </motion.div>
        </div>

        {/* ── СПИСОК ФИЧЕЙ ── */}
        <div className="divide-y divide-white/[0.04] mb-20">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.07, duration: 0.6, ease: [0.16,1,0.3,1] }}
              whileHover={{ x: 12 }}
              className="group flex items-center gap-5 md:gap-8 py-5 md:py-6
                         -mx-4 px-4 rounded-xl
                         hover:bg-white/[0.02]
                         transition-all duration-400 cursor-default"
            >
              {/* Номер */}
              <span
                className="font-mono text-xs font-black w-7 shrink-0
                           text-white/[0.07] group-hover:text-[#E94560]
                           transition-colors duration-300"
              >
                {f.num}
              </span>

              {/* Иконка */}
              <span
                className="text-2xl md:text-3xl shrink-0
                           transition-transform duration-500
                           group-hover:scale-125 group-hover:rotate-6"
              >
                {f.icon}
              </span>

              {/* Текст */}
              <div className="flex-1 min-w-0">
                <h3
                  className="text-white font-bold text-base md:text-lg
                             group-hover:text-[#E94560]
                             transition-colors duration-300"
                >
                  {f.title}
                </h3>
                <p className="text-white/25 text-sm mt-0.5 truncate">
                  {f.desc}
                </p>
              </div>

              {/* Цветная точка */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileHover={{ opacity: 1, scale: 1 }}
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: f.color }}
              />
            </motion.div>
          ))}
        </div>

        {/* ── CTA БЛОК ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="relative overflow-hidden rounded-3xl p-10 md:p-16 text-center"
          style={{
            background:
              'linear-gradient(135deg,rgba(233,69,96,0.06) 0%, rgba(245,166,35,0.04) 100%)',
            border: '1px solid rgba(255,255,255,0.05)',
          }}
        >
          {/* Декор круги */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
            className="absolute -top-24 -right-24 w-96 h-96 rounded-full
                       border border-[#E94560]/08 pointer-events-none"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full
                       border border-[#F5A623]/06 pointer-events-none"
          />

          {/* Glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(circle at 50% 50%, rgba(233,69,96,0.08) 0%, transparent 65%)',
            }}
          />

          <div className="relative z-10">
            <motion.div
              animate={{ rotate: [0, 12, -12, 0] }}
              transition={{ duration: 3.5, repeat: Infinity }}
              className="text-6xl mb-6 inline-block"
            >
              🧦
            </motion.div>

            <h3
              className="font-black text-white leading-none mb-6"
              style={{ fontSize: 'clamp(2rem, 5vw, 5rem)' }}
            >
              ГОТОВЫ НАЧАТЬ?
            </h3>

            <p className="text-white/35 text-lg mb-10 max-w-md mx-auto leading-relaxed">
              150+ дилеров уже зарабатывают с нами.
              Заявка за 3 минуты. Менеджер за 2 часа.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/b2b/dealer">
                <motion.button
                  whileHover={{ scale: 1.07, y: -4 }}
                  whileTap={{ scale: 0.96 }}
                  className="relative px-10 py-5 rounded-full font-black text-white text-lg overflow-hidden"
                  style={{ background: 'linear-gradient(135deg,#E94560,#F5A623)' }}
                >
                  <span className="relative z-10">🤝 Стать дилером</span>
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.45 }}
                  />
                </motion.button>
              </Link>

              <Link href="/catalog">
                <motion.button
                  whileHover={{ scale: 1.07, y: -4 }}
                  className="px-10 py-5 rounded-full font-bold text-white/50
                             hover:text-white border border-white/10
                             hover:border-white/25 transition-all text-lg"
                >
                  📦 Каталог
                </motion.button>
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-5 text-white/20 text-xs">
              {[
                '✓ Без взносов',
                '✓ Договор онлайн',
                '✓ Первый заказ за 1 день',
                '✓ Менеджер за 2 часа',
              ].map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
