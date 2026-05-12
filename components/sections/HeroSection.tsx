'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'

/* ── Кастомный курсор ── */
function SmartCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    let mx = 0,
      my = 0,
      rx = 0,
      ry = 0
    let rafId: number

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`
      }
    }

    const tick = () => {
      rx += (mx - rx) * 0.1
      ry += (my - ry) * 0.1
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`
      }
      rafId = requestAnimationFrame(tick)
    }

    const onOver = () => setHovered(true)
    const onOut = () => setHovered(false)

    window.addEventListener('mousemove', onMove, { passive: true })
    rafId = requestAnimationFrame(tick)

    document.querySelectorAll('a, button').forEach((el) => {
      el.addEventListener('mouseenter', onOver)
      el.addEventListener('mouseleave', onOut)
    })

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[99999] pointer-events-none rounded-full bg-[#E94560]"
        style={{
          width: 8,
          height: 8,
          mixBlendMode: 'difference',
          willChange: 'transform',
        }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[99998] pointer-events-none rounded-full border transition-all duration-300"
        style={{
          width: hovered ? 64 : 36,
          height: hovered ? 64 : 36,
          borderColor: hovered ? 'rgba(233,69,96,0.8)' : 'rgba(255,255,255,0.25)',
          background: hovered ? 'rgba(233,69,96,0.08)' : 'transparent',
          willChange: 'transform',
        }}
      />
    </>
  )
}

/* ── Grain ── */
function Grain() {
  return (
    <div
      className="fixed inset-0 z-[99997] pointer-events-none opacity-[0.042]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3CfeDisplacementMap in='SourceGraphic' scale='30'/%3E%3C/filter%3E%3Crect width='512' height='512' filter='url(%23n)'/%3E%3C/svg%3E")`,
        animation: 'grain 0.35s steps(1) infinite',
      }}
    />
  )
}

/* ── Scroll Progress ── */
function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])
  return (
    <motion.div
      style={{ scaleX, originX: 0 }}
      className="fixed top-0 left-0 right-0 z-[9999] h-[2px]"
      aria-hidden
    >
      <div
        className="w-full h-full"
        style={{ background: 'linear-gradient(90deg,#E94560,#F5A623)' }}
      />
    </motion.div>
  )
}

/* ── Marquee ── */
function Marquee() {
  const items = [
    'SHERSTON',
    '✦',
    'WOOL ECOSYSTEM',
    '✦',
    'B2B ПЛАТФОРМА',
    '✦',
    '500+ МОДЕЛЕЙ',
    '✦',
    '20 ЛЕТ',
    '✦',
    'РАССКАЗОВО',
    '✦',
    'ОТГРУЗКА 1 ДЕНЬ',
    '✦',
  ]
  const doubled = [...items, ...items]
  return (
    <div className="overflow-hidden border-y border-white/[0.05] py-4 select-none">
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="flex gap-10 whitespace-nowrap w-max"
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className={
              item === '✦'
                ? 'text-[#E94560]/30 text-lg'
                : 'text-[10px] font-bold tracking-[7px] uppercase text-white/15'
            }
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

/* ── ГЛАВНЫЙ HERO ── */
export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const yPos = useTransform(scrollYProgress, [0, 1], ['0%', '-20%'])

  const WORDS = [
    { text: 'ШЕРСТЯНЫЕ', accent: false },
    { text: 'НОСКИ', accent: true },
    { text: 'ДЛЯ', accent: false },
    { text: 'БИЗНЕСА', accent: false },
  ]

  return (
    <>
      <SmartCursor />
      <Grain />
      <ScrollProgress />

      <section
        ref={sectionRef}
        className="relative min-h-[100svh] flex flex-col bg-[#060608] overflow-hidden"
      >
        {/* Сетка */}
        <div
          className="absolute inset-0 pointer-events-none grid-bg"
          style={{
            maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)',
          }}
        />

        {/* Orb 1 */}
        <motion.div
          className="absolute pointer-events-none rounded-full"
          style={{
            top: '-20%',
            left: '-10%',
            width: '60vw',
            height: '60vw',
            background: 'radial-gradient(circle, rgba(233,69,96,0.14) 0%, transparent 70%)',
            filter: 'blur(90px)',
            y: useTransform(scrollYProgress, [0, 1], [0, -120]),
          }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Orb 2 */}
        <motion.div
          className="absolute pointer-events-none rounded-full"
          style={{
            bottom: '-10%',
            right: '-5%',
            width: '45vw',
            height: '45vw',
            background: 'radial-gradient(circle, rgba(245,166,35,0.1) 0%, transparent 70%)',
            filter: 'blur(110px)',
          }}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        />

        {/* Контент */}
        <motion.div style={{ opacity, y: yPos }} className="relative z-10 flex flex-col flex-1">
          {/* Badge */}
          <div className="pt-32 md:pt-36 px-6 md:px-12 lg:px-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.7 }}
              className="inline-flex items-center gap-3 mb-10"
            >
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E94560] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#E94560]" />
              </span>
              <span className="text-[11px] text-white/30 tracking-[5px] uppercase font-medium">
                Производитель · Рассказово · Тамбовская обл.
              </span>
            </motion.div>
          </div>

          {/* Title */}
          <div className="px-4 md:px-8 lg:px-14 flex-1" style={{ perspective: '1200px' }}>
            {WORDS.map((word, wi) => (
              <div key={word.text} className="overflow-hidden leading-[0.87]">
                <motion.div
                  initial={{ y: '108%', rotateX: -22 }}
                  animate={{ y: '0%', rotateX: 0 }}
                  transition={{
                    delay: 0.3 + wi * 0.12,
                    duration: 0.88,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <span
                    className="block font-black tracking-tight"
                    style={{
                      fontSize: 'clamp(3rem, 13.5vw, 15rem)',
                      lineHeight: 0.87,
                      ...(word.accent
                        ? {
                            background:
                              'linear-gradient(135deg,#E94560 0%,#F5A623 45%,#E94560 100%)',
                            backgroundSize: '200% auto',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            animation: 'shimmer 4s linear infinite',
                          }
                        : { color: 'white' }),
                    }}
                  >
                    {word.text}
                  </span>
                </motion.div>
              </div>
            ))}

            {/* Sub + CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95, duration: 0.8 }}
              className="mt-10 md:mt-14 grid md:grid-cols-2 gap-10 pb-10"
            >
              <div>
                <p className="text-white/35 text-base md:text-lg leading-relaxed max-w-sm mb-8">
                  Производитель шерстяных носков с 20-летним опытом.
                  B2B экосистема от заказа до носков с вашим логотипом.
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    '💰 Маржа 40–60%',
                    '📦 Отгрузка 1 день',
                    '🎨 Конструктор',
                    '🌿 Eco 10/10',
                  ].map((f) => (
                    <span
                      key={f}
                      className="px-3 py-1.5 rounded-full text-xs text-white/40 border border-white/[0.07] hover:border-white/20 hover:text-white/60 transition-colors duration-300"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3 md:items-end justify-end">
                <Link href="/b2b/dealer">
                  <motion.button
                    whileHover={{ scale: 1.06, x: 6 }}
                    whileTap={{ scale: 0.97 }}
                    className="relative flex items-center gap-4 px-8 py-4 rounded-full font-bold text-white overflow-hidden w-full md:w-auto justify-center"
                    style={{ background: 'linear-gradient(135deg,#E94560,#F5A623)' }}
                  >
                    <span className="relative z-10">Стать дилером</span>
                    <motion.span
                      animate={{ x: [0, 6, 0] }}
                      transition={{ duration: 1.8, repeat: Infinity }}
                      className="relative z-10"
                    >
                      →
                    </motion.span>
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.45 }}
                    />
                  </motion.button>
                </Link>

                <Link href="/custom">
                  <motion.button
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-3 px-8 py-4 rounded-full text-white/50 hover:text-white border border-white/[0.08] hover:border-white/25 transition-all duration-300 w-full md:w-auto justify-center"
                  >
                    🎨 Конструктор носков
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Marquee */}
          <Marquee />
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="absolute bottom-8 right-6 md:right-10 z-20 flex items-center gap-3 text-white/20"
        >
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          >
            ↓
          </motion.span>
          <span className="text-[10px] tracking-[5px] uppercase">скролл</span>
        </motion.div>
      </section>
    </>
  )
}
