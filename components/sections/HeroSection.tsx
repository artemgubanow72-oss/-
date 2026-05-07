'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const FACTS = [
  { icon: '💰', text: 'Маржа 40–60%' },
  { icon: '📦', text: 'Отгрузка за 1 день' },
  { icon: '🧦', text: '500+ моделей' },
  { icon: '🤝', text: '150+ дилеров' },
]

const BENTO = [
  { icon: '📦', title: 'Каталог 500+ моделей', desc: 'Шерсть, мерино, ангора, эко', href: '/catalog',   col: 'md:col-span-2', grad: 'from-[#E94560]/20' },
  { icon: '🎨', title: 'Конструктор носков',   desc: 'Загрузи логотип → 3D превью', href: '/custom',    col: '',              grad: 'from-[#F5A623]/20' },
  { icon: '🤝', title: 'B2B Платформа',        desc: 'Кабинет дилера онлайн 24/7',  href: '/b2b',       col: '',              grad: 'from-blue-500/20'  },
  { icon: '🌿', title: 'Эко-линейка',          desc: 'GOTS. 100% органика',          href: '/catalog/eco',col: '',             grad: 'from-emerald-500/20'},
]

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0D0D1A]">

      {/* Фон */}
      <div className="absolute inset-0 bg-hero-mesh opacity-30 animate-gradient-shift bg-[length:400%_400%]" />
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Орбы */}
      <motion.div
        animate={{ x: [0,50,0], y: [0,-30,0] }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 bg-[#E94560] pointer-events-none"
      />
      <motion.div
        animate={{ x: [0,-40,0], y: [0,40,0] }}
        transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px] opacity-15 bg-[#F5A623] pointer-events-none"
      />

      <div className="container mx-auto px-4 pt-28 pb-20 relative z-10">

        {/* Бейдж */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-10"
        >
          <div className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#E94560]/30 bg-[#E94560]/10 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-[#E94560] animate-pulse" />
            <span className="text-sm text-[#E94560] font-semibold">
              Производитель • Рассказово, Тамбовская обл.
            </span>
          </div>
        </motion.div>

        {/* Заголовок */}
        <div className="text-center mb-12 overflow-hidden">
          {['ШЕРСТЯНЫЕ', 'НОСКИ', 'ДЛЯ БИЗНЕСА'].map((word, i) => (
            <motion.div
              key={word}
              initial={{ y: '110%', skewY: 5 }}
              animate={{ y: 0, skewY: 0 }}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.8, ease: [0.16,1,0.3,1] }}
              className="block overflow-hidden"
            >
              <span
                className={`block font-black leading-none tracking-tight ${i === 1 ? 'text-transparent bg-clip-text bg-wool-gradient' : 'text-white'}`}
                style={{ fontSize: 'clamp(3.5rem,9vw,10rem)' }}
              >
                {word}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Подзаголовок */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center text-xl text-white/50 max-w-2xl mx-auto mb-8 leading-relaxed"
        >
          Производитель шерстяных носков с 20-летним опытом.
          Собственная B2B экосистема для дилеров — от заказа
          до кастомного дизайна с вашим логотипом.
        </motion.p>

        {/* Факты */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {FACTS.map((f) => (
            <div key={f.text} className="flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-white/70">
              <span>{f.icon}</span>{f.text}
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
        >
          <Link href="/b2b/dealer">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="relative px-10 py-5 rounded-2xl bg-wool-gradient text-white font-black text-xl shadow-wool overflow-hidden group"
            >
              <span className="relative z-10 flex items-center gap-3">
                🤝 Стать дилером
                <motion.span animate={{ x: [0,4,0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
              </span>
              <motion.div className="absolute inset-0 bg-white/10" initial={{ x: '-100%' }} whileHover={{ x: '100%' }} transition={{ duration: 0.5 }} />
            </motion.button>
          </Link>

          <Link href="/custom">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="px-10 py-5 rounded-2xl glass border border-white/20 text-white font-bold text-xl hover:border-[#F5A623]/50 transition-colors"
            >
              🎨 Конструктор носков
            </motion.button>
          </Link>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto"
        >
          {BENTO.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + i * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`${item.col} group relative rounded-2xl overflow-hidden glass border border-white/10 hover:border-[#E94560]/30 transition-all duration-300`}
            >
              <Link href={item.href} className="absolute inset-0 z-10" />
              <div className={`absolute inset-0 bg-gradient-to-br ${item.grad} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              <div className="relative p-6">
                <span className="text-4xl block mb-3">{item.icon}</span>
                <h3 className="text-white font-bold text-lg mb-1">{item.title}</h3>
                <p className="text-white/50 text-sm mb-4">{item.desc}</p>
                <span className="text-[#E94560]/70 text-sm font-medium group-hover:text-[#E94560] transition-colors">
                  Подробнее →
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll */}
      <motion.div
        animate={{ y: [0,8,0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/20 text-xs tracking-widest uppercase">Скролл</span>
        <div className="w-5 h-9 rounded-full border-2 border-white/20 flex items-start justify-center p-1">
          <motion.div animate={{ y: [0,14,0] }} transition={{ duration: 2, repeat: Infinity }} className="w-1.5 h-1.5 rounded-full bg-white/40" />
        </div>
      </motion.div>
    </section>
  )
        }
