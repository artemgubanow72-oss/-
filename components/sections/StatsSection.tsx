'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const STATS = [
  { value: 20,    suffix: '+',     label: 'лет производства',  sublabel: 'Рассказово, Тамбовская обл.' },
  { value: 500,   suffix: '+',     label: 'моделей носков',     sublabel: 'В постоянном наличии' },
  { value: 150,   suffix: '+',     label: 'дилеров России',     sublabel: 'Активные партнёры' },
  { value: 99.8,  suffix: '%',     label: 'контроль качества',  sublabel: 'Менее 0.2% брака' },
  { value: 2000,  suffix: '',      label: 'пар в день',         sublabel: 'Итальянские станки Lonati' },
  { value: 1,     suffix: ' день', label: 'срок отгрузки',      sublabel: 'По всей России и СНГ' },
]

const COLORS = [
  '#F5A623', '#E94560', '#7C3AED',
  '#059669', '#0891B2', '#E94560',
]

function Counter({
  value,
  suffix,
  color,
}: {
  value: number
  suffix: string
  color: string
}) {
  const [display, setDisplay] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const started = useRef(false)

  useEffect(() => {
    if (!inView || started.current) return
    started.current = true
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
    <div ref={ref} className="text-5xl md:text-7xl font-black leading-none tabular-nums" style={{ color }}>
      {display}{suffix}
    </div>
  )
}

export default function StatsSection() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  return (
    <section className="py-32 bg-[#060608] relative overflow-hidden">
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 left-0 right-0 h-px origin-left"
        style={{ background: 'linear-gradient(90deg,transparent,#E94560,#F5A623,transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center gap-6 mb-16"
        >
          <div className="h-px flex-1 bg-white/[0.05]" />
          <span className="text-[10px] text-white/20 tracking-[8px] uppercase shrink-0">
            SHERSTON В ЦИФРАХ
          </span>
          <div className="h-px flex-1 bg-white/[0.05]" />
        </motion.div>

        <div
          className="grid grid-cols-2 md:grid-cols-3 gap-px rounded-2xl overflow-hidden"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.04)',
          }}
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.09, duration: 0.65 }}
              whileHover={{ backgroundColor: 'rgba(255,255,255,0.02)' }}
              className="relative p-8 md:p-10 bg-[#060608] group overflow-hidden"
              style={{ transition: 'background-color 0.4s' }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{ background: `radial-gradient(circle at 30% 50%, ${COLORS[i]}10, transparent 65%)` }}
              />
              <div
                className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg,${COLORS[i]},transparent)` }}
              />
              {mounted ? (
                <Counter value={stat.value} suffix={stat.suffix} color={COLORS[i]} />
              ) : (
                <div className="text-5xl md:text-7xl font-black leading-none" style={{ color: COLORS[i] }}>
                  0{stat.suffix}
                </div>
              )}
              <p className="text-white/50 text-sm font-semibold mt-3 mb-1">{stat.label}</p>
              <p className="text-white/20 text-xs">{stat.sublabel}</p>
              <div
                className="absolute bottom-3 right-5 text-8xl font-black pointer-events-none select-none opacity-[0.025]"
                style={{ color: COLORS[i], lineHeight: 1 }}
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
