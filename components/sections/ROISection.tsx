'use client'

import { useState, useMemo, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const CATEGORIES = [
  { id: 'wool',   icon: '🐑', label: 'Шерсть',  price: 85,  desc: 'Натуральная 80%' },
  { id: 'merino', icon: '⭐', label: 'Мерино',   price: 130, desc: 'Премиум 80%'     },
  { id: 'blend',  icon: '🧶', label: 'Микс',     price: 65,  desc: 'Шерсть 60%'      },
  { id: 'cotton', icon: '🌾', label: 'Хлопок',   price: 50,  desc: 'Базовый'         },
]

const CHANNELS = [
  { id: 'wb',     label: 'Wildberries', margin: 0.78, icon: '🛒' },
  { id: 'retail', label: 'Розница',     margin: 1.0,  icon: '🏪' },
  { id: 'online', label: 'Интернет',    margin: 0.92, icon: '💻' },
  { id: 'b2b',    label: 'Корп.продажи',margin: 1.1,  icon: '🏢' },
]

export default function ROISection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })

  const [catId,     setCatId]     = useState('wool')
  const [channelId, setChannelId] = useState('retail')
  const [pairs,     setPairs]     = useState(500)
  const [retail,    setRetail]    = useState(250)

  const cat     = CATEGORIES.find((c) => c.id === catId)!
  const channel = CHANNELS.find((c) => c.id === channelId)!

  const calc = useMemo(() => {
    const disc   = pairs >= 2000 ? 0.15 : pairs >= 1000 ? 0.10 : pairs >= 500 ? 0.05 : 0
    const unit   = Math.round(cat.price * (1 - disc))
    const netRet = Math.round(retail * channel.margin)
    const margin = netRet - unit
    const pct    = Math.round((margin / netRet) * 100)
    return {
      unit, disc, margin, pct,
      monthly: margin * pairs,
      yearly:  margin * pairs * 12,
      roi:     Math.round(((margin * pairs) / (unit * pairs)) * 100),
    }
  }, [catId, channelId, pairs, retail, cat, channel])

  return (
    <section id="roi" ref={ref} className="py-28 bg-[#060608]">
      <div className="max-w-6xl mx-auto px-6 md:px-12">

        {/* Заголовок */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="text-[10px] text-[#F5A623] tracking-[8px] uppercase font-bold mb-4"
          >
            Для дилеров
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="font-black text-white leading-none"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 7rem)' }}
          >
            КАЛЬКУЛЯТОР
            <span
              className="block"
              style={{
                background: 'linear-gradient(135deg, #F5A623, #E94560)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              ПРИБЫЛИ
            </span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">

          {/* ── ЛЕВЫЙ БЛОК: ПАРАМЕТРЫ ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >

            {/* Категория */}
            <div
              className="p-5 rounded-2xl"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <label className="text-white/40 text-xs uppercase tracking-[4px] block mb-4">
                Тип носка
              </label>
              <div className="grid grid-cols-2 gap-2">
                {CATEGORIES.map((c) => (
                  <motion.button
                    key={c.id}
                    onClick={() => setCatId(c.id)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`
                      p-3 rounded-xl text-left transition-all duration-300
                      ${catId === c.id
                        ? 'border-[#E94560]'
                        : 'border-white/[0.07] hover:border-white/15'
                      }
                    `}
                    style={{
                      background: catId === c.id
                        ? 'rgba(233,69,96,0.1)'
                        : 'rgba(255,255,255,0.02)',
                      border: `1px solid ${catId === c.id ? '#E94560' : 'rgba(255,255,255,0.07)'}`,
                    }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span>{c.icon}</span>
                      <span className="text-white font-bold text-sm">{c.label}</span>
                    </div>
                    <div className="text-[#E94560] font-black text-sm">{c.price} ₽/пара</div>
                    <div className="text-white/25 text-xs">{c.desc}</div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Канал продаж */}
            <div
              className="p-5 rounded-2xl"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <label className="text-white/40 text-xs uppercase tracking-[4px] block mb-4">
                Канал продаж
              </label>
              <div className="grid grid-cols-2 gap-2">
                {CHANNELS.map((ch) => (
                  <button
                    key={ch.id}
                    onClick={() => setChannelId(ch.id)}
                    className="p-3 rounded-xl text-sm font-semibold transition-all flex items-center gap-2"
                    style={{
                      background: channelId === ch.id
                        ? 'rgba(245,166,35,0.12)'
                        : 'rgba(255,255,255,0.02)',
                      border: `1px solid ${channelId === ch.id ? '#F5A623' : 'rgba(255,255,255,0.07)'}`,
                      color: channelId === ch.id ? '#F5A623' : 'rgba(255,255,255,0.4)',
                    }}
                  >
                    <span>{ch.icon}</span>
                    {ch.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Слайдеры */}
            <div
              className="p-5 rounded-2xl space-y-6"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              {/* Объём */}
              <div>
                <div className="flex justify-between mb-3">
                  <label className="text-white/40 text-xs uppercase tracking-[3px]">
                    Объём в месяц
                  </label>
                  <span className="text-white font-black">{pairs.toLocaleString('ru-RU')} пар</span>
                </div>
                <input
                  type="range" min={50} max={5000} step={50}
                  value={pairs}
                  onChange={(e) => setPairs(+e.target.value)}
                  className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                  style={{ accentColor: '#E94560' }}
                />
                <div className="flex gap-2 mt-3 flex-wrap">
                  {[100, 500, 1000, 2000].map((q) => (
                    <button
                      key={q}
                      onClick={() => setPairs(q)}
                      className="px-2.5 py-1 rounded-lg text-xs transition-all"
                      style={{
                        background: pairs === q ? '#E94560' : 'rgba(255,255,255,0.06)',
                        color: pairs === q ? 'white' : 'rgba(255,255,255,0.4)',
                      }}
                    >
                      {q.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Розничная цена */}
              <div>
                <div className="flex justify-between mb-3">
                  <label className="text-white/40 text-xs uppercase tracking-[3px]">
                    Ваша розничная цена
                  </label>
                  <span className="text-[#F5A623] font-black">{retail} ₽/пара</span>
                </div>
                <input
                  type="range" min={100} max={500} step={10}
                  value={retail}
                  onChange={(e) => setRetail(+e.target.value)}
                  className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                  style={{ accentColor: '#F5A623' }}
                />
              </div>
            </div>
          </motion.div>

          {/* ── ПРАВЫЙ БЛОК: РЕЗУЛЬТАТЫ ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="space-y-3"
          >
            {/* Оптовая цена */}
            <div
              className="p-5 rounded-2xl"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-white/40 text-sm">Ваша оптовая цена</span>
                {calc.disc > 0 && (
                  <span
                    className="px-2 py-0.5 rounded-full text-xs font-bold"
                    style={{ background: 'rgba(34,197,94,0.15)', color: '#22C55E' }}
                  >
                    −{(calc.disc * 100).toFixed(0)}% скидка
                  </span>
                )}
              </div>
              <div className="text-white font-black text-4xl mt-2">
                {calc.unit} ₽
                <span className="text-white/30 text-sm font-normal ml-2">за пару</span>
              </div>
            </div>

            {/* Маржа */}
            <div
              className="p-5 rounded-2xl"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(245,166,35,0.15)',
              }}
            >
              <span className="text-white/40 text-sm block mb-2">Маржа на паре</span>
              <div className="text-[#F5A623] font-black text-4xl mb-3">
                {calc.margin} ₽
                <span className="text-[#F5A623]/60 text-lg ml-2">({calc.pct}%)</span>
              </div>
              <div
                className="h-2 rounded-full overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.06)' }}
              >
                <motion.div
                  animate={{ width: `${Math.min(calc.pct, 100)}%` }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, #F5A623, #E94560)',
                  }}
                />
              </div>
            </div>

            {/* Месяц */}
            <div
              className="p-5 rounded-2xl"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <span className="text-white/40 text-sm block mb-2">Прибыль в месяц</span>
              <div className="text-white font-black text-4xl">
                {calc.monthly.toLocaleString('ru-RU')} ₽
              </div>
            </div>

            {/* ГОД — главный */}
            <motion.div
              animate={{ scale: [1, 1.01, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="p-7 rounded-2xl relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #E94560, #F5A623)',
              }}
            >
              <div
                className="absolute top-0 right-0 w-40 h-40 rounded-full blur-2xl opacity-30"
                style={{ background: 'white' }}
              />
              <span className="text-white/80 text-sm relative z-10 block mb-2">
                💰 Прибыль за год
              </span>
              <div className="text-white font-black relative z-10"
                style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
              >
                {calc.yearly.toLocaleString('ru-RU')} ₽
              </div>
              <div className="text-white/60 text-xs relative z-10 mt-2">
                ROI: {calc.roi}% | {pairs} пар/мес | канал: {channel.label}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.a
              href="/b2b/dealer"
              whileHover={{ scale: 1.03, y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="block w-full py-5 rounded-2xl bg-white font-black text-lg text-center"
              style={{ color: '#1A1A2E' }}
            >
              🤝 Начать зарабатывать →
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
            }
