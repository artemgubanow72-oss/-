'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'

export default function ROISection() {
  const [pairs, setPairs] = useState(500)
  const [retail, setRetail] = useState(250)
  const [category, setCategory] = useState<'wool'|'blend'|'cotton'>('wool')

  const prices = { wool: 85, blend: 65, cotton: 50 }

  const calc = useMemo(() => {
    const base = prices[category]
    const disc = pairs >= 2000 ? 0.15 : pairs >= 1000 ? 0.10 : pairs >= 500 ? 0.05 : 0
    const unit = Math.round(base * (1 - disc))
    const margin = retail - unit
    const pct = Math.round((margin / retail) * 100)
    return {
      unit,
      disc,
      margin,
      pct,
      monthly: margin * pairs,
      yearly: margin * pairs * 12,
    }
  }, [pairs, retail, category])

  return (
    <section className="py-24 bg-[#0D0D1A]">
      <div className="container mx-auto px-4">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#F5A623] text-sm font-medium tracking-wider uppercase">
            Для дилеров
          </span>
          <h2
            className="font-black text-white mt-3 leading-none"
            style={{ fontSize: 'clamp(2.5rem,6vw,6rem)' }}
          >
            КАЛЬКУЛЯТОР{' '}
            <span className="text-transparent bg-clip-text bg-wool-gradient">ПРИБЫЛИ</span>
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">

          {/* Параметры */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-3xl glass border border-white/10 space-y-8"
          >
            {/* Категория */}
            <div>
              <label className="text-white/50 text-sm mb-3 block">Категория</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'wool' as const, label: '🐑 Шерсть', price: 85 },
                  { id: 'blend' as const, label: '🧶 Микс',  price: 65 },
                  { id: 'cotton' as const, label: '🌾 Хлопок',price: 50 },
                ].map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setCategory(c.id)}
                    className={`
                      p-3 rounded-xl text-xs font-bold text-center transition-all
                      ${category === c.id
                        ? 'bg-[#E94560] text-white'
                        : 'glass border border-white/10 text-white/50 hover:text-white'
                      }
                    `}
                  >
                    {c.label}
                    <div className="text-[10px] opacity-70 mt-0.5">{c.price} ₽/пара</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Объём */}
            <div>
              <label className="text-white/50 text-sm mb-3 block">
                Объём: <span className="text-white font-bold">{pairs.toLocaleString('ru-RU')} пар/мес</span>
              </label>
              <input
                type="range" min={50} max={5000} step={50}
                value={pairs}
                onChange={(e) => setPairs(+e.target.value)}
                className="w-full accent-[#E94560]"
              />
              <div className="flex gap-2 mt-3 flex-wrap">
                {[100, 500, 1000, 2000].map((q) => (
                  <button
                    key={q}
                    onClick={() => setPairs(q)}
                    className={`px-3 py-1 rounded-lg text-xs transition-all ${pairs === q ? 'bg-[#E94560] text-white' : 'glass text-white/50 hover:text-white'}`}
                  >
                    {q.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>

            {/* Розничная цена */}
            <div>
              <label className="text-white/50 text-sm mb-3 block">
                Ваша розничная цена: <span className="text-white font-bold">{retail} ₽/пара</span>
              </label>
              <input
                type="range" min={100} max={500} step={10}
                value={retail}
                onChange={(e) => setRetail(+e.target.value)}
                className="w-full accent-[#F5A623]"
              />
            </div>
          </motion.div>

          {/* Результаты */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="p-5 rounded-2xl glass border border-white/10">
              <div className="flex justify-between items-center">
                <span className="text-white/50 text-sm">Ваша оптовая цена</span>
                {calc.disc > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-400 text-xs font-bold">
                    -{(calc.disc * 100).toFixed(0)}%
                  </span>
                )}
              </div>
              <div className="text-3xl font-black text-white mt-2">
                {calc.unit} ₽ <span className="text-white/30 text-sm font-normal">за пару</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl glass border border-white/10">
              <span className="text-white/50 text-sm">Маржа на паре</span>
              <div className="text-3xl font-black text-[#F5A623] mt-2">
                {calc.margin} ₽ <span className="text-[#F5A623]/50 text-sm font-normal">({calc.pct}%)</span>
              </div>
              <div className="h-2 rounded-full bg-white/10 mt-3">
                <motion.div
                  animate={{ width: `${Math.min(calc.pct, 100)}%` }}
                  className="h-full rounded-full bg-wool-gradient"
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            <div className="p-5 rounded-2xl glass border border-white/10">
              <span className="text-white/50 text-sm">Прибыль в месяц</span>
              <div className="text-4xl font-black text-white mt-2">
                {calc.monthly.toLocaleString('ru-RU')} ₽
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-wool-gradient relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
              <span className="text-white/80 text-sm relative z-10">💰 Прибыль за год</span>
              <div className="text-5xl font-black text-white mt-2 relative z-10">
                {calc.yearly.toLocaleString('ru-RU')} ₽
              </div>
            </div>

            <motion.a
              href="/b2b/dealer"
              whileHover={{ scale: 1.02 }}
              className="block w-full py-4 rounded-2xl bg-white text-[#1A1A2E] font-black text-lg text-center hover:bg-white/90 transition-colors"
            >
              🤝 Начать зарабатывать
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
