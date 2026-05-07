'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface AnimatedCounterProps {
  from?: number
  to: number
  suffix?: string
  label: string
  sublabel?: string
  color?: string
  duration?: number
}

export default function AnimatedCounter({
  from = 0,
  to,
  suffix = '',
  label,
  sublabel,
  color = '#E94560',
  duration = 2200,
}: AnimatedCounterProps) {
  const [display, setDisplay] = useState(from)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const started = useRef(false)

  useEffect(() => {
    if (!inView || started.current) return
    started.current = true

    const startTime = Date.now()

    const tick = () => {
      const elapsed  = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      // easeOutQuart
      const eased = 1 - Math.pow(1 - progress, 4)
      const current = from + (to - from) * eased
      setDisplay(Math.round(current * 10) / 10)
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [inView, from, to, duration])

  return (
    <div ref={ref} className="flex flex-col items-center gap-1">
      {/* Число */}
      <div
        className="text-5xl md:text-7xl font-black leading-none tabular-nums"
        style={{ color }}
      >
        {display}
        <span>{suffix}</span>
      </div>

      {/* Лейбл */}
      <div className="text-white/60 font-semibold text-sm mt-2">
        {label}
      </div>

      {/* Подлейбл */}
      {sublabel && (
        <div className="text-white/25 text-xs">
          {sublabel}
        </div>
      )}
    </div>
  )
      }
