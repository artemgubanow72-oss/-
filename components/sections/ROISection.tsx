'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const CATEGORIES = [
  { id: 'wool',   icon: '🐑', label: 'Шерсть',  price: 85  },
  { id: 'merino', icon: '⭐', label: 'Мерино',   price: 130 },
  { id: 'blend',  icon: '🧶', label: 'Микс',     price: 65  },
  { id: 'cotton', icon: '🌾', label: 'Хлопок',   price: 50  },
]

const CHANNELS = [
  { id: 'retail', label: 'Розница',      margin: 1.0,  icon: '🏪' },
  { id: 'wb',     label: 'Wildberries',  margin: 0.78, icon: '🛒' },
  { id: 'online', label: 'Интернет',     margin: 0.92, icon: '💻' },
  { id: 'corp',   label: 'Корпоратив',   margin: 1.1,  icon: '🏢' },
]

export default function ROISection() {
  const [catId,     setCatId]     = useState('wool')
  const [channelId, setChannelId] = useState('retail')
  const [pairs,     setPairs]     = useState(500)
  const [retail,    setRetail]    = useState(250)

  const calc = useMemo(() => {
    const catPrice  = CATEGORIES.find((c) => c.id === catId)?.price ?? 85
    const chanMarg  = CHANNELS.find((c) => c.id === channelId)?.margin ?? 1
    const disc   = pairs >= 2000 ? 0.15 : pairs >= 1000 ? 0.10 : pairs >= 500 ? 0.05 : 0
    const unit   = Math.round(catPrice * (1 - disc))
    const netRet = Math.round(retail * chanMarg)
    const margin = netRet - unit
    const pct    = netRet > 0 ? Math.round((margin / netRet) * 100) : 0
    const monthly  = margin * pairs
    const yearly   = monthly * 12
    const roi      = unit > 0 ? Math.round((margin / unit) * 100) : 0
    return { unit, disc, margin, pct, monthly, yearly, roi }
  }, [catId, channelId, pairs, retail])

  return (
    <section id="roi" className="py-28 bg-[#060608]">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <p className="text-[10px] text-[#F5A623] tracking-[8px] uppercase font-bold mb-4">
            Для дилеров
          </p>
          <h2
            className="font-black text-white leading-none"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 7rem)' }}
          >
            КАЛЬКУЛЯТОР{' '}
            <span
              style={{
                background: 'linear-gradient(135deg,#F5A623,#E94560)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              ПРИБЫЛИ
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Параметры */}
          <div className="space-y-5">
            {/* Категория */}
            <div
              className="p-5 rounded-2xl"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <label className="text-white/40 text-xs uppercase tracking-[4px] block mb-4">Тип носка</label>
              <div className="grid grid-cols-2 gap-2">
                {CATEGORIES.map((c) => (
                  <motion.button
                    key={c.id}
                    onClick={() => setCatId(c.id)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="p-3 rounded-xl text-left transition-all duration-300"
                    style={{
                      background: catId === c.id ? 'rgba(233,69,96,0.1)' : 'rgba(255,255,255,0.02)',
                      border: `1px solid ${catId === c.id ? '#E94560' : 'rgba(255,255,255,0.07)'}`,
                    }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span>{c.icon}</span>
                      <span className="text-white font-bold text-sm">{c.label}</span>
                    </div>
                    <div className="text-[#E94560] font-black text-sm">{c.price} ₽/пара</div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Канал */}
            <div
              className="p-5 rounded-2xl"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <label className="text-white/40 text-xs uppercase tracking-[4px] block mb-4">Канал продаж</label>
              <div className="grid grid-cols-2 gap-2">
                {CHANNELS.map((ch) => (
                  <button
                    key={ch.id}
                    onClick={() => setChannelId(ch.id)}
                    className="p-3 rounded-xl text-sm font-semibold transition-all flex items-center gap-2"
                    style={{
                      background: channelId === ch.id ? 'rgba(245,166,35,0.12)' : 'rgba(255,255,255,0.02)',
                      border: `1px solid ${channelId === ch.id ? '#F5A623' : 'rgba(255,255,255,0.07)'}`,
                      color: channelId === ch.id ? '#F5A623' : 'rgba(255,255,255,0.4)',
                    }}
                  >
                    <span>{ch.icon}</span>{ch.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Слайдеры */}
            <div
              className="p-5 rounded-2xl space-y-6"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <div>
                <div className="flex justify-between mb-3">
                  <label className="text-white/40 text-xs uppercase tracking-[3px]">Объём / месяц</label>
                  <span className="text-white font-black">{pairs.toLocaleString('ru-RU')} пар</span>
                </div>
                <input
                  type="range" min={50} max={5000} step={50}
                  value={pairs}
                  onChange={(e) => setPairs(+e.target.value)}
                  className="w-full h-1.5 rounded-full appearance-none"
                  style={{ accentColor: '#E94560' }}
                />
                <div className="flex gap-2 mt-3 flex-wrap">
                  {[100, 500, 1000, 2000].map((q) => (
                    <button key={q} onClick={() => setPairs(q)}
                      className="px-2.5 py-1 rounded-lg text-xs transition-all"
                      style={{ background: pairs === q ? '#E94560' : 'rgba(255,255,255,0.06)', color: pairs === q ? 'white' : 'rgba(255,255,255,0.4)' }}
                    >
                      {q.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-3">
                  <label className="text-white/40 text-xs uppercase tracking-[3px]">Ваша розничная цена</label>
                  <span className="text-[#F5A623] font-black">{retail} ₽</span>
                </div>
                <input
                  type="range" min={100} max={500} step={10}
                  value={retail}
                  onChange={(e) => setRetail(+e.target.value)}
                  className="w-full h-1.5 rounded-full appearance-none"
                  style={{ accentColor: '#F5A623' }}
                />
              </div>
            </div>
          </div>

          {/* Результаты */}
          <div className="space-y-3">
            <div
              className="p-5 rounded-2xl"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <div className="flex items-center justify-between">
                <span className="text-white/40 text-sm">Ваша оптовая цена</span>
                {calc.disc > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold" style={{ background: 'rgba(34,197,94,0.15)', color: '#22C55E' }}>
                    −{(calc.disc * 100).toFixed(0)}% скидка
                  </span>
                )}
              </div>
              <div className="text-white font-black text-4xl mt-2">
                {calc.unit} ₽
                <span className="text-white/30 text-sm font-normal ml-2">за пару</span>
              </div>
            </div>

            <div
              className="p-5 rounded-2xl"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(245,166,35,0.15)' }}
            >
              <span className="text-white/40 text-sm block mb-2">Маржа на паре</span>
              <div className="text-[#F5A623] font-black text-4xl mb-3">
                {calc.margin} ₽
                <span className="text-[#F5A623]/60 text-lg ml-2">({calc.pct}%)</span>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <motion.div
                  animate={{ width: `${Math.min(Math.max(calc.pct, 0), 100)}%` }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg,#F5A623,#E94560)' }}
                />
              </div>
            </div>

            <div
              className="p-5 rounded-2xl"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <span className="text-white/40 text-sm block mb-2">Прибыль в месяц</span>
              <div className="text-white font-black text-4xl">
                {calc.monthly.toLocaleString('ru-RU')} ₽
              </div>
            </div>

            <motion.div
              animate={{ scale: [1, 1.01, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="p-7 rounded-2xl relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg,#E94560,#F5A623)' }}
            >
              <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-2xl opacity-30 bg-white" />
              <span className="text-white/80 text-sm block mb-2 relative z-10">💰 Прибыль за год</span>
              <div
                className="text-white font-black relative z-10"
                style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
              >
                {calc.yearly.toLocaleString('ru-RU')} ₽
              </div>
              <div className="text-white/60 text-xs mt-2 relative z-10">
                ROI: {calc.roi}% | {pairs.toLocaleString()} пар/мес
              </div>
            </motion.div>

            <Link href="/b2b/dealer">
              <motion.div
                whileHover={{ scale: 1.03, y: -3 }}
                whileTap={{ scale: 0.97 }}
                className="block w-full py-5 rounded-2xl font-black text-lg text-center bg-white transition-all"
                style={{ color: '#1A1A2E' }}
              >
                🤝 Начать зарабатывать →
              </motion.div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
