'use client'

import { motion } from 'framer-motion'

const REVIEWS = [
  {
    name: 'Алексей Михайлов',
    city: 'Москва',
    role: 'Магазин «ТеплоДом»',
    avatar: 'А',
    rating: 5,
    text: 'Работаем с SHERSTON 2 года. За это время вышли на уровень Золото — скидка 10% и всегда есть нужные позиции. Носки летят как горячие пирожки.',
    revenue: '+380 000 ₽/мес',
    color: '#E94560',
  },
  {
    name: 'Марина Козлова',
    city: 'Краснодар',
    role: 'Wildberries продавец',
    avatar: 'М',
    rating: 5,
    text: 'Конструктор носков — просто находка. Сделала носки с логотипом своего бренда и продаю в 3 раза дороже стандартных. Маржа 58% при партии 200 пар.',
    revenue: '+215 000 ₽/мес',
    color: '#F5A623',
  },
  {
    name: 'Дмитрий Петров',
    city: 'Екатеринбург',
    role: 'Оптовик, 5 магазинов',
    avatar: 'Д',
    rating: 5,
    text: 'Личный кабинет — это кайф. Всё онлайн: заказы, накладные, прайсы. Менеджер отвечает за 2 часа. За год открыл 2 новых точки только на доходах от носков.',
    revenue: '+650 000 ₽/мес',
    color: '#7C3AED',
  },
]

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-[#0D0D1A]">
      <div className="container mx-auto px-4">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#E94560] text-sm font-medium tracking-wider uppercase">
            Наши дилеры
          </span>
          <h2
            className="font-black text-white mt-3 leading-none"
            style={{ fontSize: 'clamp(2.5rem,6vw,6rem)' }}
          >
            ГОВОРЯТ{' '}
            <span className="text-transparent bg-clip-text bg-wool-gradient">ПАРТНЁРЫ</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="p-7 rounded-2xl glass border border-white/10 hover:border-white/20 transition-all"
            >
              {/* Звёзды */}
              <div className="flex gap-1 mb-4">
                {'★★★★★'.split('').map((s, si) => (
                  <span key={si} className="text-[#F5A623] text-lg">{s}</span>
                ))}
              </div>

              <p className="text-white/70 text-sm leading-relaxed mb-6 italic">
                «{r.text}»
              </p>

              <div className="flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-white font-black text-lg shrink-0"
                  style={{ background: `linear-gradient(135deg, ${r.color}, #1A1A2E)` }}
                >
                  {r.avatar}
                </div>
                <div className="flex-1">
                  <p className="text-white font-bold text-sm">{r.name}</p>
                  <p className="text-white/30 text-xs">{r.city} · {r.role}</p>
                </div>
                <div
                  className="text-sm font-black text-right"
                  style={{ color: r.color }}
                >
                  {r.revenue}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
