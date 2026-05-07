'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { stats } from '@/data/stats'
import AnimatedCounter from '@/components/AnimatedCounter'

// Цвета для каждой карточки
const COLORS = [
  '#F5A623',
  '#E94560',
  '#7C3AED',
  '#059669',
  '#0891B2',
  '#E94560',
]

export default function StatsSection() {
  // Защита от SSR гидрации
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Скелетон на сервере
  if (!isMounted) {
    return (
      <section className="py-32 bg-[#060608]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div
            className="grid grid-cols-2 md:grid-cols-3 gap-px rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.04)',
            }}
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="p-8 md:p-10 bg-[#060608] flex flex-col gap-3"
              >
                <div className="h-16 w-32 rounded-lg bg-white/5 animate-pulse" />
                <div className="h-4 w-20 rounded bg-white/5 animate-pulse" />
                <div className="h-3 w-28 rounded bg-white/5 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-32 bg-[#060608] relative overflow-hidden">

      {/* Линия сверху */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 left-0 right-0 h-px origin-left"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, #E94560 30%, #F5A623 70%, transparent 100%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Разделитель */}
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

        {/* Сетка */}
        <div
          className="grid grid-cols-2 md:grid-cols-3 gap-px rounded-2xl overflow-hidden"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.04)',
          }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                delay: i * 0.09,
                duration: 0.65,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ backgroundColor: 'rgba(255,255,255,0.02)' }}
              className="relative p-8 md:p-10 bg-[#060608] group overflow-hidden"
              style={{ transition: 'background-color 0.4s' }}
            >
              {/* Glow при hover */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100
                           pointer-events-none transition-opacity duration-700"
                style={{
                  background: `radial-gradient(circle at 30% 50%, ${COLORS[i]}10 0%, transparent 65%)`,
                }}
              />

              {/* Верхняя линия при hover */}
              <div
                className="absolute top-0 left-0 right-0 h-px
                           opacity-0 group-hover:opacity-100
                           transition-opacity duration-500"
                style={{
                  background: `linear-gradient(90deg, ${COLORS[i]}, transparent)`,
                }}
              />

              {/* Счётчик */}
              <AnimatedCounter
                from={0}
                to={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                sublabel={stat.sublabel}
                color={COLORS[i]}
              />

              {/* Фоновый номер */}
              <div
                className="absolute bottom-3 right-5 text-8xl font-black
                           pointer-events-none select-none opacity-[0.025]"
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
