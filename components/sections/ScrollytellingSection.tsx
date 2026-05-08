'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

const STEPS = [
  {
    id: 'wool',
    num: '01',
    icon: '🐑',
    title: 'Натуральная шерсть',
    body: 'Закупаем только сертифицированную шерсть у проверенных поставщиков России. Каждая партия — лабораторный контроль по 12 параметрам.',
    stat: { value: '100%', label: 'натуральный состав' },
    accent: '#F5A623',
  },
  {
    id: 'yarn',
    num: '02',
    icon: '🧶',
    title: 'Пряжа высшего класса',
    body: 'Шерсть превращается в мягкую, прочную пряжу. Контроль толщины нити на каждом этапе — не более ±2% от стандарта.',
    stat: { value: '28мкм', label: 'толщина мерино' },
    accent: '#E94560',
  },
  {
    id: 'knit',
    num: '03',
    icon: '🏭',
    title: 'Итальянские станки Lonati',
    body: 'Автоматические станки Lonati (Италия) — 2000 пар в день. Каждый настраивается под конкретную модель. Датчик останавливает при обрыве нити.',
    stat: { value: '2000', label: 'пар в день' },
    accent: '#7C3AED',
  },
  {
    id: 'design',
    num: '04',
    icon: '🎨',
    title: 'Жаккардовый рисунок',
    body: 'Ваш логотип или наш дизайн — жаккардовый способ. Рисунок вплетён в структуру нити. Не стирается, не выцветает, сохраняется весь срок жизни носка.',
    stat: { value: '8', label: 'цветов жаккард' },
    accent: '#F5A623',
  },
  {
    id: 'quality',
    num: '05',
    icon: '✅',
    title: 'ОТК — 100% проверка',
    body: 'Каждая пара проходит контроль качества: плотность, размер, прочность швов, качество рисунка. Брак — менее 0.2%.',
    stat: { value: '99.8%', label: 'качества' },
    accent: '#059669',
  },
  {
    id: 'pack',
    num: '06',
    icon: '📦',
    title: 'Упаковка и Честный ЗНАК',
    body: 'Цифровая маркировка «Честный ЗНАК» на каждой паре. Индивидуальная упаковка, брендирование, формирование коробов для отгрузки.',
    stat: { value: '1 день', label: 'отгрузка' },
    accent: '#E94560',
  },
]

// Одиночный шаг с parallax
function ScrollStep({
  step,
  index,
}: {
  step: (typeof STEPS)[0]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 85%', 'end 30%'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0.3])
  const x = useTransform(
    scrollYProgress,
    [0, 0.3],
    [index % 2 === 0 ? -50 : 50, 0]
  )
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.9, 1])

  const springX     = useSpring(x,     { stiffness: 80, damping: 20 })
  const springScale = useSpring(scale, { stiffness: 80, damping: 20 })

  return (
    <motion.div
      ref={ref}
      style={{ opacity }}
      className="min-h-[60vh] flex items-center py-16"
    >
      <motion.div
        style={{ x: springX, scale: springScale }}
        className={`
          grid md:grid-cols-2 gap-10 items-center w-full
          ${index % 2 === 0 ? '' : 'md:[&>*:first-child]:order-2'}
        `}
      >
        {/* ТЕКСТ */}
        <div>
          {/* Номер */}
          <div className="flex items-center gap-4 mb-6">
            <span
              className="text-7xl font-black opacity-15 leading-none"
              style={{ color: step.accent }}
            >
              {step.num}
            </span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          {/* Иконка */}
          <motion.span
            className="text-6xl block mb-5"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
          >
            {step.icon}
          </motion.span>

          {/* Контент */}
          <h3
            className="font-black text-white mb-4 leading-tight"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}
          >
            {step.title}
          </h3>
          <p className="text-white/45 text-lg leading-relaxed mb-8">
            {step.body}
          </p>

          {/* Метрика */}
          <div
            className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl"
            style={{
              background: `${step.accent}12`,
              border: `1px solid ${step.accent}25`,
            }}
          >
            <span className="font-black text-2xl" style={{ color: step.accent }}>
              {step.stat.value}
            </span>
            <span className="text-white/40 text-sm">{step.stat.label}</span>
          </div>
        </div>

        {/* ВИЗУАЛЬНАЯ КАРТОЧКА — Glassmorphism 2.0 */}
        <div className="relative">
          <motion.div
            className="aspect-square max-w-md mx-auto rounded-3xl p-8
                       flex flex-col items-center justify-center text-center"
            style={{
              background: `linear-gradient(135deg, ${step.accent}12 0%, rgba(255,255,255,0.03) 100%)`,
              border: `1px solid ${step.accent}20`,
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              boxShadow: `
                inset 0 1px 0 ${step.accent}15,
                0 20px 60px rgba(0,0,0,0.4),
                0 0 80px ${step.accent}08
              `,
            }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            {/* Grain на карточке */}
            <div
              className="absolute inset-0 rounded-3xl opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              }}
            />

            <motion.span
              className="text-8xl block mb-6"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              {step.icon}
            </motion.span>

            <div
              className="text-5xl font-black mb-2"
              style={{ color: step.accent }}
            >
              {step.stat.value}
            </div>
            <div className="text-white/40 text-sm tracking-[3px] uppercase">
              {step.stat.label}
            </div>

            {/* Декор углы */}
            <div
              className="absolute top-4 left-4 w-6 h-6 rounded-tl-lg border-t border-l"
              style={{ borderColor: `${step.accent}40` }}
            />
            <div
              className="absolute bottom-4 right-4 w-6 h-6 rounded-br-lg border-b border-r"
              style={{ borderColor: `${step.accent}40` }}
            />
          </motion.div>

          {/* Connecting dot */}
          {index < STEPS.length - 1 && (
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
              <div className="w-px h-12 bg-gradient-to-b from-white/10 to-transparent" />
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: STEPS[index + 1].accent }}
              />
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function ScrollytellingSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })

  // Прогресс линия
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section ref={containerRef} className="bg-[#060608] relative">

      {/* Прогресс линия слева */}
      <div className="absolute left-6 md:left-12 top-0 bottom-0 w-px bg-white/[0.04]">
        <motion.div
      {/* Прогресс линия слева */}
      <div className="absolute left-6 md:left-12 top-0 bottom-0 w-px bg-white/[0.04]">
        <motion.div
          className="w-full origin-top"
          style={{
            height: lineHeight,
            background: 'linear-gradient(180deg, #E94560, #F5A623)',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-12 md:px-24 py-20">

        {/* Заголовок — Sheep Inc. стиль */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <p className="text-[10px] text-[#F5A623] tracking-[8px] uppercase font-bold mb-4">
            Наше производство
          </p>
          <h2
            className="font-black text-white leading-none mb-6"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 8rem)' }}
          >
            ОТ ШЕРСТИ
            <span
              className="block"
              style={{
                background: 'linear-gradient(135deg, #E94560, #F5A623)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              ДО НОСКА
            </span>
          </h2>
          <p className="text-white/30 text-lg max-w-md mx-auto">
            6 этапов создания идеального носка.
            Прозрачно и честно.
          </p>
        </motion.div>

        {/* ШАГИ */}
        <div className="space-y-0">
          {STEPS.map((step, i) => (
            <ScrollStep key={step.id} step={step} index={i} />
          ))}
        </div>

        {/* Финальный аккорд */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <div
            className="inline-block p-10 rounded-3xl"
            style={{
              background: 'linear-gradient(135deg, rgba(233,69,96,0.1), rgba(245,166,35,0.06))',
              border: '1px solid rgba(233,69,96,0.15)',
            }}
          >
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-2xl font-black text-white mb-2">
              Готово! Ваши носки едут к вам
            </h3>
            <p className="text-white/35 text-sm mb-6">
              Весь цикл: от заявки до получения — 14 рабочих дней
            </p>
            <a href="/custom">
              <motion.button
                whileHover={{ scale: 1.06, y: -3 }}
                whileTap={{ scale: 0.97 }}
                className="px-9 py-4 rounded-full font-bold text-white text-base"
                style={{
                  background: 'linear-gradient(135deg, #E94560, #F5A623)',
                  boxShadow: '0 8px 30px rgba(233,69,96,0.35)',
                }}
              >
                🎨 Создать свои носки
              </motion.button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
          }
