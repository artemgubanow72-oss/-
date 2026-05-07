'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const FEATURES = [
  {
    icon: '💰',
    title: 'Маржа 40–60%',
    desc: 'Оптовые цены от производителя. При розничной 250 ₽ и закупочной 85 ₽ — маржа 66%.',
    color: '#F5A623',
  },
  {
    icon: '🖥️',
    title: 'Личный кабинет',
    desc: 'Заказы, прайсы, документы, аналитика — всё онлайн 24/7 без звонков и бумаг.',
    color: '#E94560',
  },
  {
    icon: '🎨',
    title: 'Конструктор носков',
    desc: 'Загрузите логотип → 3D-превью за 30 минут → носки с вашим брендом от 50 пар.',
    color: '#7C3AED',
  },
  {
    icon: '📦',
    title: 'Склад всегда полон',
    desc: '500+ моделей в постоянном наличии. Отгрузка за 1 рабочий день по всей России.',
    color: '#059669',
  },
  {
    icon: '🤝',
    title: 'Персональный менеджер',
    desc: 'Ваш личный менеджер знает ваш бизнес. Ответ в течение 2 часов в рабочее время.',
    color: '#0F3460',
  },
  {
    icon: '📜',
    title: 'Все документы',
    desc: 'Честный ЗНАК, сертификаты ГОСТ, УПД, счета — всё в порядке и в кабинете.',
    color: '#E94560',
  },
]

const TIERS = [
  { name: 'Старт 🌱',    range: 'от 50 пар/мес',    discount: '0%',   color: '#6B7280' },
  { name: 'Серебро 🥈',  range: '500+ пар/мес',     discount: '5%',   color: '#94A3B8' },
  { name: 'Золото 🥇',   range: '1000+ пар/мес',    discount: '10%',  color: '#F5A623', featured: true },
  { name: 'Платинум 💎', range: '2000+ пар/мес',    discount: '15%',  color: '#C084FC' },
]

export default function B2BSection() {
  return (
    <section className="py-24 bg-[#0D0D1A]">
      <div className="container mx-auto px-4">

        {/* Заголовок */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#F5A623] text-sm font-medium tracking-wider uppercase">
            B2B Экосистема
          </span>
          <h2
            className="font-black text-white mt-3 leading-none"
            style={{ fontSize: 'clamp(2.5rem,6vw,6rem)' }}
          >
            ЗАРАБАТЫВАЙ{' '}
            <span className="text-transparent bg-clip-text bg-wool-gradient">
              НА НОСКАХ
            </span>
          </h2>
          <p className="text-white/40 text-lg mt-4 max-w-xl mx-auto">
            Готовая B2B платформа для дилеров. Всё что нужно для бизнеса — в одном месте.
          </p>
        </motion.div>

        {/* Преимущества */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="group p-7 rounded-2xl glass border border-white/10 hover:border-white/20 transition-all overflow-hidden relative"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                style={{ backgroundColor: f.color }}
              />
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-5xl">{f.icon}</span>
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-black"
                    style={{ backgroundColor: f.color + '20', color: f.color }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>
                </div>
                <h3 className="text-white font-black text-xl mb-3">{f.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Тарифы */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-center text-3xl font-black text-white mb-10">
            Партнёрские уровни
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {TIERS.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`
                  relative p-6 rounded-2xl border text-center transition-all
                  ${tier.featured
                    ? 'border-[#F5A623]/50 bg-[#F5A623]/5'
                    : 'glass border-white/10'
                  }
                `}
              >
                {tier.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-1 rounded-full bg-[#E94560] text-white text-xs font-black">
                      ПОПУЛЯРНЫЙ
                    </span>
                  </div>
                )}
                <h4 className="text-white font-black text-lg mb-2">{tier.name}</h4>
                <p className="text-white/40 text-xs mb-4">{tier.range}</p>
                <div
                  className="text-3xl font-black"
                  style={{ color: tier.color }}
                >
                  -{tier.discount}
                </div>
                <p className="text-white/30 text-xs mt-1">скидка на всё</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/b2b/dealer">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="px-12 py-5 rounded-2xl bg-wool-gradient text-white font-black text-xl shadow-wool"
            >
              🤝 Стать дилером SHERSTON
            </motion.button>
          </Link>
          <p className="text-white/30 text-sm mt-4">
            Заявка за 3 минуты • Менеджер звонит за 2 часа
          </p>
        </motion.div>
      </div>
    </section>
  )
        }
