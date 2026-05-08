'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ReactNode, useRef } from 'react'

interface LiquidButtonProps {
  children: ReactNode
  onClick?: () => void
  href?: string
  variant?: 'brand' | 'ghost' | 'glass'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  magnetic?: boolean
}

const SIZES = {
  sm:  'px-5 py-2 text-sm',
  md:  'px-7 py-3 text-sm',
  lg:  'px-9 py-4 text-base',
  xl:  'px-12 py-5 text-lg',
}

const VARIANTS = {
  brand: {
    base: 'text-white font-bold relative overflow-hidden rounded-full',
    bg: 'linear-gradient(135deg, #E94560 0%, #F5A623 100%)',
    shadow: '0 8px 32px rgba(233,69,96,0.35)',
  },
  ghost: {
    base: 'text-white/60 hover:text-white font-semibold rounded-full border border-white/10 hover:border-white/25 transition-colors',
    bg: 'transparent',
    shadow: 'none',
  },
  glass: {
    base: 'text-white font-semibold rounded-full',
    bg: 'rgba(255,255,255,0.07)',
    shadow: 'inset 0 1px 0 rgba(255,255,255,0.1)',
  },
}

export default function LiquidButton({
  children,
  onClick,
  href,
  variant = 'brand',
  size = 'md',
  className = '',
  magnetic = true,
}: LiquidButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { stiffness: 150, damping: 15 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  const v = VARIANTS[variant]

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!magnetic || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const distX = (e.clientX - centerX) * 0.25
    const distY = (e.clientY - centerY) * 0.25
    x.set(distX)
    y.set(distY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const ButtonContent = () => (
    <motion.button
      ref={ref}
      style={{
        background: v.bg,
        boxShadow: v.shadow,
        x: springX,
        y: springY,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`
        inline-flex items-center justify-center gap-2.5
        ${v.base} ${SIZES[size]} ${className}
        transition-shadow duration-300
      `}
    >
      {variant === 'brand' && (
        // Shimmer эффект
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.5 }}
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
          }}
        />
      )}
      <span className="relative z-10 flex items-center gap-2.5">
        {children}
      </span>
    </motion.button>
  )

  if (href) {
    return (
      <a href={href} className="inline-block">
        <ButtonContent />
      </a>
    )
  }

  return <ButtonContent />
}
