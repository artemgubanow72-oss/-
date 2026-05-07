'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const STATS = [
  { value: 20,    suf: '+',     label: 'лет производства',  sub: 'Рассказово, Тамбовская обл.', color: '#F5A623' },
  { value: 500,   suf: '+',     label: 'моделей носков',     sub: 'В постоянном наличии',         color: '#E94560' },
  { value: 150,   suf: '+',     label: 'дилеров России',     sub: 'Активные партнёры',            color: '#7C3AED' },
  { value: 99.8,  suf: '%',     label: 'контроль качества',  sub: 'Менее 0.2% брака',             color: '#059669' },
  { value: 2000,  suf: '',      label: 'пар в день',         sub: 'Итальянские станки Lonati',    color: '#0F3460' },
  { value: 1,     suf: ' день', label: 'срок отгрузки',      sub: 'По всей России и СНГ',         color: '#E94560' },
]

function Counter({ value, suffix, color }: { value: number; suffix: string; color: string }) {
  const [display, setDisplay] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    if (!inView) return
    const duration = 2200
    const start = Date.now()

    const tick = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 4)
      setDisplay(Math.round(eased * value * 10) / 10)
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, value])

  return (
    <span
      ref={ref}
      className="tabular-nums"
      style={{ color }}
    >
      {display}{suffix}
    </span>
  )
}

export default function StatsSection() {
  return (
    <section className="py-32 bg-[#060608] relative overflow-hidden">

      {/* Линия сверху */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 left-0 right-0 h-px origin-left"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, #E94560 30%, #F5A623 70%, transparent 100%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center gap-6 mb-20"
        >
          <div className="h-px flex-1 bg-white/[0.05]" />
          <span className="text-[10px] text-white/20 tracking-[8px] uppercase shrink-0">
            SHERSTON В ЦИФРАХ
          </span>
          <div className="h-px flex-1 bg-white/[0.05]" />
        </motion.div>

        {/* GRID */}
        <div
          className="grid grid-cols-2 md:grid-cols-3 gap-px rounded-2xl overflow-hidden"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.04)',
          }}
        >
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.09, duration: 0.65, ease: [0.16,1,0.3,1] }}
              whileHover={{ backgroundColor: 'rgba(255,255,255,0.02)' }}
              className="relative p-8 md:p-10 bg-[#060608] group overflow-hidden"
              style={{ transition: 'background-color 0.4s' }}
            >
              {/* Glow при hover */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-700"
                style={{
                  background: `radial-gradient(circle at 30% 50%, ${s.color}10 0%, transparent 65%)`,
                }}
              />

              {/* Верхняя линия при hover */}
              <div
                className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, ${s.color}, transparent)` }}
              />

              {/* Число */}
              <div className="text-5xl md:text-7xl font-black leading-none mb-3">
                <Counter value={s.value} suffix={s.suf} color={s.color} />
              </div>

              {/* Лейбл */}
              <p className="text-white/50 text-sm font-semibold mb-1">{s.label}</p>
              <p className="text-white/20 text-xs">{s.sub}</p>

              {/* Фоновый номер */}
              <div
                className="absolute bottom-3 right-5 text-8xl font-black pointer-events-none select-none opacity-[0.025]"
                style={{ color: s.color, lineHeight: 1 }}
              >
                {String(i + 1).padStart(2, '0')}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
