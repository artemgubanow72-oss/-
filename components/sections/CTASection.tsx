'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'

const MANIFESTO = [
  'МЫ ДЕЛАЕМ НОСКИ',
  'КОТОРЫЕ НОСЯТ',
  'ЛЮДИ',
]

const TRUST = [
  '✓ Без взносов',
  '✓ Договор онлайн',
  '✓ Первый заказ за 1 день',
  '✓ Менеджер за 2 часа',
  '✓ Честный ЗНАК',
  '✓ ГОСТ сертификат',
]

export default function CTASection() {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.88, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])

  return (
    <section
      ref={ref}
      className="py-32 bg-[#060608] overflow-hidden relative"
    >
      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <motion.span
          animate={{ opacity: [0.015, 0.035, 0.015] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="font-black text-white whitespace-nowrap select-none"
          style={{
            fontSize: 'clamp(6rem, 20vw, 22rem)',
            lineHeight: 1,
            WebkitTextStroke: '1px rgba(255,255,255,0.04)',
            WebkitTextFillColor: 'transparent',
          }}
        >
          SHERSTON
        </motion.span>
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div style={{ scale, opacity }}>
          {/* Манифест */}
          <div className="text-center mb-16">
            {MANIFESTO.map((line, i) => (
              <div key={line} className="overflow-hidden">
                <motion.p
                  initial={{ y: '100%' }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: i * 0.12,
                    duration: 0.9,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="font-black leading-none"
                  style={{
                    fontSize: 'clamp(2.5rem, 9vw, 11rem)',
                    color:
                      i === 2
                        ? 'transparent'
                        : i === 1
                        ? 'rgba(255,255,255,0.9)'
                        : 'rgba(255,255,255,0.3)',
                    background:
                      i === 2
                        ? 'linear-gradient(135deg, #E94560, #F5A623)'
                        : undefined,
                    WebkitBackgroundClip: i === 2 ? 'text' : undefined,
                    WebkitTextFillColor: i === 2 ? 'transparent' : undefined,
                  }}
                >
                  {line}
                </motion.p>
              </div>
            ))}
          </div>

          {/* Кнопки */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-10"
          >
            <div className="md:col-span-2">
              <Link href="/b2b/dealer">
                <motion.button
                  whileHover={{ scale: 1.04, y: -4 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-6 rounded-2xl font-black text-white text-xl relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, #E94560, #F5A623)',
                    boxShadow: '0 12px 50px rgba(233,69,96,0.4)',
                  }}
                >
                  <motion.div
                    className="absolute inset-0 bg-white/15"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.5 }}
                  />
                  <span className="relative z-10">
                    🤝 Стать дилером SHERSTON
                  </span>
                </motion.button>
              </Link>
            </div>

            <Link href="/custom">
              <motion.button
                whileHover={{ scale: 1.04, y: -4 }}
                className="w-full py-6 rounded-2xl font-bold text-white/50 hover:text-white border border-white/[0.08] hover:border-white/20 transition-all text-lg h-full"
              >
                🎨 Конструктор
              </motion.button>
            </Link>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-5 text-white/20 text-xs"
          >
            {TRUST.map((t) => (
              <span
                key={t}
                className="hover:text-white/50 transition-colors"
              >
                {t}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
