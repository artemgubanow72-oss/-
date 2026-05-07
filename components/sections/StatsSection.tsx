'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

const STATS = [
  { value: 20,    suffix: '+',  label: 'лет на рынке',        icon: '🏆', color: '#F5A623' },
  { value: 500,   suffix: '+',  label: 'моделей в каталоге',  icon: '🧦', color: '#E94560' },
  { value: 150,   suffix: '+',  label: 'дилеров по России',   icon: '🤝', color: '#7C3AED' },
  { value: 2000,  suffix: '',   label: 'пар в день',          icon: '🏭', color: '#059669' },
  { value: 99.8,  suffix: '%',  label: 'качества продукции',  icon: '✅', color: '#0F3460' },
  { value: 1,     suffix: ' день', label: 'срок отгрузки',    icon: '🚀', color: '#E94560' },
]

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [display, setDisplay] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const duration = 1500
    const start = Date.now()
    const timer = setInterval(() => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(eased * value * 10) / 10)
      if (progress === 1) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [inView, value])

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-black font-display">
      {display}{suffix}
    </div>
  )
}

export default function StatsSection() {
  return (
    <section className="py-24 bg-[#0D0D1A] relative overflow-hidden">
      {/* Фон */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A2E]/30 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#F5A623] text-sm font-medium tracking-wider uppercase">
            SHERSTON в цифрах
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white mt-3 leading-none">
            20 ЛЕТ{' '}
            <span className="text-transparent bg-clip-text bg-wool-gradient">
              КАЧЕСТВА
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative p-6 rounded-2xl glass border border-white/10 hover:border-white/20 text-center overflow-hidden transition-all"
            >
              {/* Glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl"
                style={{ backgroundColor: stat.color }}
              />

              <span className="text-3xl block mb-3">{stat.icon}</span>

              <div style={{ color: stat.color }}>
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </div>

              <p className="text-white/40 text-xs mt-2 leading-tight">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
              }
