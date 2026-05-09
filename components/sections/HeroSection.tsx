'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

/* ═══ КАСТОМНЫЙ КУРСОР (Минимализм 2.0) ═══ */
function SmartCursor() {
  const dot    = useRef<HTMLDivElement>(null)
  const ring   = useRef<HTMLDivElement>(null)
  const label  = useRef<HTMLSpanElement>(null)
  const [size, setSize]   = useState<'sm' | 'lg'>('sm')
  const [text, setText]   = useState('')
  const raf = useRef<number>()
  let mx = 0, my = 0, rx = 0, ry = 0

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY
      if (dot.current)
        dot.current.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`
    }

    const tick = () => {
      rx += (mx - rx) * 0.1
      ry += (my - ry) * 0.1
      if (ring.current)
        ring.current.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`
      raf.current = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', move, { passive: true })
    raf.current = requestAnimationFrame(tick)

    document.querySelectorAll('[data-cursor]').forEach((el) => {
      const t = (el as HTMLElement).dataset.cursor ?? ''
      el.addEventListener('mouseenter', () => { setSize('lg'); setText(t) })
      el.addEventListener('mouseleave', () => { setSize('sm'); setText('') })
    })

    return () => {
      window.removeEventListener('mousemove', move)
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <>
      {/* Точка */}
      <div ref={dot}
        className="fixed top-0 left-0 z-[99999] pointer-events-none rounded-full bg-[#E94560]"
        style={{ width: 8, height: 8, mixBlendMode: 'difference', willChange: 'transform' }}
      />
      {/* Кольцо */}
      <div ref={ring}
        className="fixed top-0 left-0 z-[99998] pointer-events-none rounded-full
                   border border-[#E94560]/50 flex items-center justify-center
                   transition-all duration-300"
        style={{
          width:  size === 'lg' ? 72 : 36,
          height: size === 'lg' ? 72 : 36,
          background: size === 'lg' ? 'rgba(233,69,96,0.08)' : 'transparent',
          willChange: 'transform',
        }}
      >
        {text && (
          <span ref={label} className="text-[9px] text-white/80 font-bold text-center px-1 leading-tight">
            {text}
          </span>
        )}
      </div>
      <style jsx global>{`body,a,button{cursor:none!important;}`}</style>
    </>
  )
}

/* ═══ GRAIN + SCANLINE (Ретро-цифровая) ═══ */
function RetroOverlay() {
  return (
    <>
      {/* Grain */}
      <div className="fixed inset-0 z-[99997] pointer-events-none opacity-[0.042]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          animation: 'grain 0.35s steps(1) infinite',
        }}
      />
      {/* Scanlines */}
      <div className="fixed inset-0 z-[99996] pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,1) 2px,rgba(0,0,0,1) 4px)',
        }}
      />
    </>
  )
}

/* ═══ SCROLL PROGRESS ═══ */
function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])
  return (
    <motion.div style={{ scaleX, originX: 0 }}
      className="fixed top-0 left-0 right-0 h-[2px] z-[9999]"
      aria-hidden
    >
      <div className="w-full h-full"
        style={{ background: 'linear-gradient(90deg,#E94560,#F5A623)' }} />
    </motion.div>
  )
}

/* ═══ ГЛИТЧ ТЕКСТ (Ретро-цифровая) ═══ */
function GlitchText({ text, className }: { text: string; className?: string }) {
  const [active, setActive] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setActive(true)
      setTimeout(() => setActive(false), 300)
    }, 4000 + Math.random() * 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{text}</span>
      {active && (
        <>
          <span
            className="absolute inset-0 text-[#0FF]"
            style={{
              animation: 'glitch-1 0.3s steps(1) infinite',
              clipPath: 'inset(30% 0 40% 0)',
            }}
          >{text}</span>
          <span
            className="absolute inset-0"
            style={{
              animation: 'glitch-2 0.3s steps(1) infinite',
              clipPath: 'inset(60% 0 10% 0)',
            }}
          >{text}</span>
        </>
      )}
    </span>
  )
}

/* ═══ КИНЕТИЧЕСКАЯ ТИПОГРАФИКА ═══ */
function KineticChar({ char, delay }: { char: string; delay: number }) {
  return (
    <motion.span
      className="inline-block"
      initial={{ y: '110%', rotateX: -30, opacity: 0 }}
      animate={{ y: 0, rotateX: 0, opacity: 1 }}
      transition={{
        delay,
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{
        y: -8,
        color: '#E94560',
        transition: { duration: 0.2 },
      }}
    >
      {char === ' ' ? '\u00A0' : char}
    </motion.span>
  )
}

/* ═══ МАРКИЗЫ (вертикальная + горизонтальная) ═══ */
function HorizontalMarquee() {
  const items = ['SHERSTON','✦','WOOL','✦','B2B','✦','2026','✦','НОСКИ','✦','РАССКАЗОВО','✦','ЭКО','✦']
  const doubled = [...items, ...items]
  return (
    <div className="overflow-hidden border-y border-white/[0.05] py-4 select-none">
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="flex gap-10 whitespace-nowrap w-max"
      >
        {doubled.map((item, i) => (
          <span key={i}
            className={item === '✦'
              ? 'text-[#E94560]/30 text-lg'
              : 'text-[10px] font-bold tracking-[7px] uppercase text-white/15'
            }
          >{item}</span>
        ))}
      </motion.div>
    </div>
  )
}

function VerticalMarquee() {
  const items = ['500+', 'МОДЕЛЕЙ', '20', 'ЛЕТ', '150+', 'ДИЛЕРОВ', 'B2B', 'ЭКО', '1', 'ДЕНЬ']
  const doubled = [...items, ...items]
  return (
    <div className="hidden lg:flex flex-col overflow-hidden h-full max-h-[400px]"
      style={{ writingMode: 'vertical-rl' }}>
      <motion.div
        animate={{ y: ['0%', '-50%'] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="flex gap-6"
      >
        {doubled.map((item, i) => (
          <span key={i}
            className="text-[9px] font-bold tracking-[5px] uppercase text-white/[0.08]"
          >{item}</span>
        ))}
      </motion.div>
    </div>
  )
}

/* ═══ ОРГАНИЧЕСКИЙ BLOB ═══ */
function OrganicBlob({ color, delay = 0, size = 400 }: {
  color: string; delay?: number; size?: number
}) {
  return (
    <motion.div
      className="absolute pointer-events-none rounded-full"
      style={{
        width: size, height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: 'blur(80px)',
        animation: `float-organic ${12 + delay}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
    />
  )
}

/* ═══ МИНИМАЛИЗМ 2.0 BADGE ═══ */
function MinimalBadge({ text }: { text: string }) {
  return (
    <div className="inline-flex items-center gap-3">
      <motion.span
        animate={{ scale: [1, 1.4, 1] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        className="w-1.5 h-1.5 rounded-full bg-[#E94560] shrink-0"
      />
      <span className="text-[11px] font-medium text-white/30 tracking-[5px] uppercase">
        {text}
      </span>
    </div>
  )
}

/* ═══════════════════════════════════
   ГЛАВНЫЙ HERO
   ═══════════════════════════════════ */
export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const opacity  = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const yContent = useTransform(scrollYProgress, [0, 1], ['0%', '-20%'])

  // Минимализм 2.0 — большие шрифты, «воздух»
  const WORDS = [
    { text: 'ШЕРСТЯНЫЕ', accent: false, delay: 0.3 },
    { text: 'НОСКИ',     accent: true,  delay: 0.45 },
    { text: 'ДЛЯ',       accent: false, delay: 0.6 },
    { text: 'БИЗНЕСА',   accent: false, delay: 0.72 },
  ]

  return (
    <>
      <SmartCursor />
      <RetroOverlay />
      <ScrollProgress />

      <section
        ref={sectionRef}
        className="relative min-h-[100svh] flex flex-col bg-[#060608] overflow-hidden"
      >
        {/* Сетка — Минимализм 2.0 */}
        <div className="absolute inset-0 grid-bg opacity-100 pointer-events-none"
          style={{
            maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 10%, transparent 100%)',
          }}
        />

        {/* Органические blobs */}
        <div className="absolute -top-[20%] -left-[10%] pointer-events-none">
          <OrganicBlob color="rgba(233,69,96,0.14)" delay={0} size={500} />
        </div>
        <div className="absolute -bottom-[10%] -right-[5%] pointer-events-none">
          <OrganicBlob color="rgba(245,166,35,0.09)" delay={3} size={380} />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <OrganicBlob color="rgba(74,94,58,0.06)" delay={6} size={600} />
        </div>

        {/* Контент */}
        <motion.div style={{ opacity, y: yContent }} className="relative z-10 flex flex-col flex-1">

          {/* TOP — Минимализм 2.0: чистый воздух */}
          <div className="pt-32 md:pt-36 px-6 md:px-12 lg:px-16 mb-8">
            <MinimalBadge text="Производитель · Рассказово · Тамбовская обл." />
          </div>

          {/* КИНЕТИЧЕСКАЯ ТИПОГРАФИКА — главный тренд */}
          <div className="flex-1 px-4 md:px-8 lg:px-14">
            <div className="perspective-1500 overflow-hidden">

              {WORDS.map((word, wi) => (
                <div key={word.text} className="overflow-hidden leading-[0.86]">
                  {word.accent ? (
                    /* Глитч + шиммер для акцентного слова */
                    <motion.div
                      initial={{ y: '108%', rotateX: -25 }}
                      animate={{ y: 0, rotateX: 0 }}
                      transition={{ delay: word.delay, duration: 0.85, ease: [0.16,1,0.3,1] }}
                    >
                      <GlitchText
                        text={word.text}
                        className="font-black tracking-tight block"
                      />
                    </motion.div>
                  ) : (
                    /* Кинетика побуквенно */
                    <div className="overflow-hidden">
                      <div
                        className="font-black tracking-tight flex flex-wrap"
                        style={{
                          fontSize: 'clamp(3rem, 13.5vw, 15rem)',
                          lineHeight: 0.86,
                        }}
                      >
                        {word.text.split('').map((char, ci) => (
                          <KineticChar
                            key={ci}
                            char={char}
                            delay={word.delay + ci * 0.025}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  {/* Стиль для глитч-слова */}
                  {word.accent && (
                    <style jsx global>{`
                      .relative.inline-block span:first-child {
                        font-size: clamp(3rem, 13.5vw, 15rem);
                        line-height: 0.86;
                        font-weight: 900;
                        background: linear-gradient(135deg, #E94560 0%, #F5A623 45%, #E94560 100%);
                        background-size: 200% auto;
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                        animation: shimmer 4s linear infinite;
                        display: block;
                      }
                    `}</style>
                  )}
                </div>
              ))}
            </div>

            {/* ПОДЗАГОЛОВОК + CTA — Минимализм 2.0 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.8, ease: [0.16,1,0.3,1] }}
              className="mt-10 md:mt-14 grid md:grid-cols-2 gap-10 pb-10"
            >
              {/* Левая — текст с воздухом (Минимализм 2.0) */}
              <div>
                <p className="text-white/35 text-base md:text-lg leading-[1.8] max-w-sm mb-8 font-light">
                  Производитель шерстяных носков с 20-летним опытом.
                  B2B экосистема — от заказа до носков с вашим логотипом.
                </p>

                {/* Тэги — Минимализм 2.0 */}
                <div className="flex flex-wrap gap-2">
                  {[
                    { text: '💰 40–60%',    tip: 'МАРЖА' },
                    { text: '📦 1 день',    tip: 'ОТГРУЗКА' },
                    { text: '🎨 Конструктор', tip: '3D' },
                    { text: '🌿 Eco 10',    tip: 'SCORE' },
                  ].map((tag) => (
                    <motion.span
                      key={tag.text}
                      data-cursor={tag.tip}
                      whileHover={{ scale: 1.06, borderColor: 'rgba(233,69,96,0.4)' }}
                      className="px-3 py-1.5 rounded-full text-xs text-white/40
                                 border border-white/[0.07]
                                 hover:text-white/70 transition-colors duration-300"
                    >
                      {tag.text}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Правая — кнопки с магнитным эффектом */}
              <div className="flex flex-col gap-3 md:items-end justify-end">
                <Link href="/b2b/dealer">
                  <motion.button
                    data-cursor="ДИЛЕР"
                    whileHover={{ scale: 1.06, x: 6 }}
                    whileTap={{ scale: 0.97 }}
                    className="relative flex items-center gap-4 px-8 py-4 rounded-full
                               font-bold text-white overflow-hidden
                               w-full md:w-auto justify-center animate-pulse-brand"
                    style={{ background: 'linear-gradient(135deg,#E94560,#F5A623)' }}
                  >
                    <span className="relative z-10">Стать дилером</span>
                    <motion.span
                      animate={{ x: [0, 6, 0] }}
                      transition={{ duration: 1.8, repeat: Infinity }}
                      className="relative z-10"
                    >→</motion.span>
                    {/* Shimmer sweep */}
                    <motion.div
                      className="absolute inset-0"
                      style={{
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                      }}
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.45 }}
                    />
                  </motion.button>
                </Link>

                <Link href="/custom">
                  <motion.button
                    data-cursor="3D"
                    whileHover={{ scale: 1.06 }}
                    className="flex items-center gap-3 px-8 py-4 rounded-full
                               text-white/45 hover:text-white
                               border border-white/[0.07] hover:border-white/20
                               transition-all duration-400
                               w-full md:w-auto justify-center backdrop-blur-sm"
                  >
                    🎨 Конструктор носков
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Горизонтальная маркиза */}
          <HorizontalMarquee />
        </motion.div>

        {/* Вертикальная маркиза справа */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20">
          <VerticalMarquee />
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="absolute bottom-8 left-8 z-20 flex items-center gap-3 text-white/20"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          >↓</motion.div>
          <span className="text-[10px] tracking-[5px] uppercase">скролл</span>
        </motion.div>
      </section>
    </>
  )
          }
