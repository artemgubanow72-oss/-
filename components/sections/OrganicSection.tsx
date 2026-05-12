'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'

const ECO_ITEMS = [
  { icon: '🌱', title: 'GOTS сертификат', desc: 'Органическая шерсть с сертифицированных ферм без пестицидов.', color: '#4A5E3A', light: '#7A9E5A' },
  { icon: '♻️', title: '96% переработка',  desc: 'Производственные отходы идут в переработку. Замкнутый цикл.', color: '#2D5A4A', light: '#4A9A7A' },
  { icon: '💧', title: 'Водосбережение',   desc: '−60% потребления воды по сравнению с отраслевым стандартом.', color: '#1A3A5A', light: '#2A6A9A' },
  { icon: '📦', title: 'Эко-упаковка',     desc: '100% вторичный полипропилен. Картонные вкладыши из переработки.', color: '#4A3A1A', light: '#8A6A3A' },
]

export default function OrganicSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '-8%'])
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '8%'])

  return (
    <section ref={ref} className="py-32 relative overflow-hidden" style={{ background: '#08090A' }}>
      <motion.div
        style={{ y: y1 }}
        className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full pointer-events-none opacity-15"
        aria-hidden
      >
        <div className="w-full h-full animate-blob" style={{ background: 'radial-gradient(circle,rgba(74,94,58,0.6),transparent 70%)', filter: 'blur(60px)' }} />
      </motion.div>
      <motion.div
        style={{ y: y2 }}
        className="absolute -bottom-20 -right-20 w-[400px] h-[400px] rounded-full pointer-events-none opacity-10"
        aria-hidden
      >
        <div className="w-full h-full animate-blob" style={{ background: 'radial-gradient(circle,rgba(196,149,106,0.5),transparent 70%)', filter: 'blur(80px)', animationDelay: '4s' }} />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-end mb-20">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p className="text-[10px] font-bold tracking-[8px] uppercase mb-4" style={{ color: 'rgba(74,158,90,0.7)' }}>
              Экология
            </p>
            <h2 className="font-black text-white leading-[0.9]" style={{ fontSize: 'clamp(2.5rem, 7vw, 8rem)' }}>
              ПРИРОДА
              <span className="block italic" style={{ color: '#7A9E5A', fontFamily: 'Georgia, serif' }}>
                в каждой паре
              </span>
            </h2>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p className="text-white/35 text-lg leading-[1.8] mb-6">
              Органическая шерсть, переработка отходов, водосбережение — это наш стандарт, а не маркетинг.
            </p>
            <div
              className="inline-flex items-center gap-4 px-6 py-4 rounded-2xl"
              style={{ background: 'rgba(74,94,58,0.12)', border: '1px solid rgba(74,158,90,0.2)' }}
            >
              <span className="text-4xl">🌍</span>
              <div>
                <div className="text-3xl font-black" style={{ color: '#7A9E5A' }}>10/10</div>
                <div className="text-white/30 text-xs tracking-[3px] uppercase">Eco Score</div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {ECO_ITEMS.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40, scale: 0.92 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8, scale: 1.03 }}
              className="relative p-6 rounded-3xl overflow-hidden group"
              style={{
                background: `linear-gradient(135deg,${item.color}20,rgba(255,255,255,0.02))`,
                border: `1px solid ${item.light}20`,
                transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
              }}
            >
              <div
                className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full blur-2xl opacity-30 pointer-events-none animate-blob"
                style={{ background: item.light }}
              />
              <span className="text-4xl block mb-4 group-hover:scale-110 transition-transform duration-500">{item.icon}</span>
              <h3 className="font-bold text-sm mb-2" style={{ color: item.light }}>{item.title}</h3>
              <p className="text-white/35 text-xs leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center p-12 rounded-[2rem] relative overflow-hidden"
          style={{ background: 'rgba(74,94,58,0.06)', border: '1px solid rgba(74,158,90,0.1)' }}
        >
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
            <span className="text-[12vw] font-black text-white/[0.03] select-none whitespace-nowrap">ЭКО 2030</span>
          </div>
          <div className="relative z-10">
            <p className="text-[10px] font-bold tracking-[8px] uppercase mb-4" style={{ color: 'rgba(74,158,90,0.6)' }}>Наши цели</p>
            <h3 className="text-3xl font-black text-white mb-8">Carbon Neutral к 2028 году</h3>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {[
                { icon: '☀️', text: 'ВИЭ к 2028' },
                { icon: '🌊', text: 'Zero Waste к 2027' },
                { icon: '🐑', text: '100% этичная шерсть' },
              ].map((goal) => (
                <div key={goal.text}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm"
                  style={{ background: 'rgba(74,94,58,0.15)', border: '1px solid rgba(74,158,90,0.15)', color: '#7A9E5A' }}
                >
                  <span>{goal.icon}</span>{goal.text}
                </div>
              ))}
            </div>
            <Link href="/catalog">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-8 py-4 rounded-full font-bold text-white"
                style={{ background: 'linear-gradient(135deg,#4A5E3A,#7A9E5A)' }}
              >
                🌿 Смотреть эко-линейку
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
