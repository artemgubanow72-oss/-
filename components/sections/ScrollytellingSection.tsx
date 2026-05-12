'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const STEPS = [
  {
    num: '01', icon: '🐑', accent: '#F5A623',
    title: 'Натуральная шерсть',
    body: 'Закупаем только сертифицированную шерсть у проверенных поставщиков России. Каждая партия — лабораторный контроль по 12 параметрам.',
    stat: { value: '100%', label: 'натуральный состав' },
  },
  {
    num: '02', icon: '🧶', accent: '#E94560',
    title: 'Пряжа высшего класса',
    body: 'Шерсть превращается в мягкую прочную пряжу. Контроль толщины нити на каждом этапе — не более ±2% от стандарта.',
    stat: { value: '28мкм', label: 'толщина мерино' },
  },
  {
    num: '03', icon: '🏭', accent: '#7C3AED',
    title: 'Станки Lonati (Италия)',
    body: 'Автоматические станки — 2000 пар в день. Каждый настраивается под конкретную модель. Датчик останавливает при обрыве нити.',
    stat: { value: '2000', label: 'пар в день' },
  },
  {
    num: '04', icon: '🎨', accent: '#F5A623',
    title: 'Жаккардовый рисунок',
    body: 'Ваш логотип — жаккардовый способ. Рисунок вплетён в структуру нити. Не стирается, не выцветает.',
    stat: { value: '8', label: 'цветов в дизайне' },
  },
  {
    num: '05', icon: '✅', accent: '#059669',
    title: 'ОТК — 100% проверка',
    body: 'Каждая пара: плотность, размер, прочность швов, качество рисунка. Брак — менее 0.2%.',
    stat: { value: '99.8%', label: 'качества' },
  },
  {
    num: '06', icon: '📦', accent: '#E94560',
    title: 'Упаковка и Честный ЗНАК',
    body: 'Цифровая маркировка на каждой паре. Индивидуальная упаковка. Отгрузка за 1 рабочий день.',
    stat: { value: '1 день', label: 'отгрузка' },
  },
]

export default function ScrollytellingSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })
  const lineH = useTransform(scrollYProgress, [0.05, 0.9], ['0%', '100%'])

  return (
    <section className="bg-[#060608] py-20 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
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
            className="font-black text-white leading-none mb-4"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 8rem)' }}
          >
            ОТ ШЕРСТИ{' '}
            <span
              style={{
                background: 'linear-gradient(135deg,#E94560,#F5A623)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              ДО НОСКА
            </span>
          </h2>
          <p className="text-white/30 text-lg max-w-md mx-auto">
            6 этапов. Прозрачно и честно.
          </p>
        </motion.div>

        <div ref={containerRef} className="relative max-w-3xl mx-auto">
          {/* Прогресс линия */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-white/[0.05]">
            <motion.div
              style={{ height: lineH }}
              className="w-full origin-top"
            >
              <div
                className="w-full h-full"
                style={{ background: 'linear-gradient(180deg,#E94560,#F5A623)' }}
              />
            </motion.div>
          </div>

          <div className="space-y-0">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: 0.05, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex gap-8 pb-16 last:pb-0"
              >
                {/* Точка */}
                <div className="relative shrink-0 flex flex-col items-center" style={{ width: 64 }}>
                  <motion.div
                    whileInView={{ scale: [0, 1.3, 1] }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="w-4 h-4 rounded-full border-2 border-[#060608] relative z-10 mt-1"
                    style={{ backgroundColor: step.accent }}
                  />
                </div>

                {/* Карточка */}
                <motion.div
                  whileHover={{ x: 8 }}
                  transition={{ duration: 0.3 }}
                  className="flex-1 pb-2"
                >
                  <div
                    className="relative p-6 rounded-2xl overflow-hidden group"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: `1px solid ${step.accent}20`,
                      backdropFilter: 'blur(12px)',
                    }}
                  >
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ background: `radial-gradient(circle at 20% 50%, ${step.accent}10, transparent 65%)` }}
                    />
                    <div className="flex items-start gap-4 relative">
                      <span className="text-4xl shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                        {step.icon}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-xs font-black tracking-[3px]" style={{ color: step.accent }}>
                            {step.num}
                          </span>
                          <h3 className="text-white font-bold text-lg">{step.title}</h3>
                        </div>
                        <p className="text-white/40 text-sm leading-relaxed mb-3">{step.body}</p>
                        <span
                          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold"
                          style={{
                            background: `${step.accent}15`,
                            color: step.accent,
                            border: `1px solid ${step.accent}25`,
                          }}
                        >
                          ✓ {step.stat.value} {step.stat.label}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <a href="/contact">
            <motion.button
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 rounded-full font-bold text-white/60 hover:text-white border border-white/10 hover:border-white/25 transition-all text-sm"
            >
              📍 Записаться на экскурсию →
            </motion.button>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
