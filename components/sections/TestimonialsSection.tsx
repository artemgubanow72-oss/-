'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const REVIEWS = {
  dealer: [
    {
      name: 'Алексей Михайлов',
      role: 'Магазин «ТеплоДом»',
      city: 'Москва',
      avatar: 'А',
      color: '#E94560',
      revenue: '+380 000 ₽/мес',
      tier: '🥇 Золото',
      text: 'Работаем с SHERSTON 2 года. Вышли на уровень Золото. Носки расходятся как горячие пирожки.',
    },
    {
      name: 'Марина Козлова',
      role: 'Wildberries продавец',
      city: 'Краснодар',
      avatar: 'М',
      color: '#F5A623',
      revenue: '+215 000 ₽/мес',
      tier: '🥈 Серебро',
      text: 'Конструктор носков — находка. Сделала носки с логотипом своего бренда. Маржа 58%.',
    },
    {
      name: 'Дмитрий Петров',
      role: 'Оптовик, 5 магазинов',
      city: 'Екатеринбург',
      avatar: 'Д',
      color: '#7C3AED',
      revenue: '+650 000 ₽/мес',
      tier: '💎 Платинум',
      text: 'Личный кабинет — кайф. Всё онлайн. Менеджер за 2 часа. За год открыл 2 новых точки.',
    },
  ],
  corporate: [
    {
      name: 'Анна Смирнова',
      role: 'HR директор, IT компания',
      city: 'Санкт-Петербург',
      avatar: 'А',
      color: '#059669',
      revenue: '500 пар / квартал',
      tier: '🏢 Корпоратив',
      text: 'Заказывали носки с логотипом для команды. 3D-превью за 30 минут, готово за 14 дней. Все в восторге.',
    },
    {
      name: 'Максим Орлов',
      role: 'Бренд-менеджер',
      city: 'Новосибирск',
      avatar: 'М',
      color: '#0891B2',
      revenue: '1000 пар / год',
      tier: '🎁 Мерч',
      text: 'Брендированные носки стали хитом нашего мерча. Качество отличное, жаккард держится.',
    },
  ],
}

export default function TestimonialsSection() {
  const [tab, setTab] = useState<'dealer' | 'corporate'>('dealer')

  return (
    <section className="py-28 bg-[#060608]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Заголовок */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div>
            <p className="text-[10px] text-[#E94560] tracking-[8px] uppercase font-bold mb-3">
              Отзывы
            </p>
            <h2 className="font-black text-white leading-none"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 7rem)' }}>
              ГОВОРЯТ
              <span
                className="block"
                style={{
                  WebkitTextStroke: '2px rgba(255,255,255,0.12)',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                ПАРТНЁРЫ
              </span>
            </h2>
          </div>

          {/* Переключатель — Lupine Lights паттерн */}
          <div
            className="flex p-1 rounded-xl gap-1 self-start md:self-auto"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            {[
              { id: 'dealer',    label: '🤝 Дилеры' },
              { id: 'corporate', label: '🏢 Корпоратив' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id as 'dealer' | 'corporate')}
                className="px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-300"
                style={{
                  background: tab === t.id
                    ? 'linear-gradient(135deg, #E94560, #F5A623)'
                    : 'transparent',
                  color: tab === t.id ? 'white' : 'rgba(255,255,255,0.35)',
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* КАРТОЧКИ */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {REVIEWS[tab].map((r, i) => (
              <motion.div
                key={r.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16,1,0.3,1] }}
                whileHover={{ y: -6 }}
                className="p-7 rounded-2xl flex flex-col gap-5 transition-all duration-400"
                style={{
                  background: '#0C0C10',
                  border: `1px solid ${r.color}18`,
                  boxShadow: `0 4px 24px rgba(0,0,0,0.3)`,
                }}
              >
                {/* Звёзды */}
                <div className="flex gap-1">
                  {'★★★★★'.split('').map((s, si) => (
                    <span key={si} style={{ color: r.color }}>{s}</span>
                  ))}
                </div>

                {/* Текст */}
                <p className="text-white/60 text-sm leading-relaxed flex-1 italic">
                  «{r.text}»
                </p>

                {/* Автор */}
                <div className="flex items-center gap-3 pt-4"
                  style={{ borderTop: `1px solid rgba(255,255,255,0.05)` }}>
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center
                               text-white font-black text-sm shrink-0"
                    style={{
                      background: `linear-gradient(135deg, ${r.color}, #1A1A2E)`,
                    }}
                  >
                    {r.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-bold text-sm truncate">{r.name}</p>
                    <p className="text-white/30 text-xs truncate">
                      {r.city} · {r.role}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-black text-sm" style={{ color: r.color }}>
                      {r.revenue}
                    </div>
                    <div className="text-white/25 text-xs">{r.tier}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
