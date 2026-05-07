'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function CTASection() {
  return (
    <section className="py-24 bg-[#0D0D1A]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto relative p-12 md:p-16 rounded-3xl overflow-hidden text-center"
          style={{ background: 'linear-gradient(135deg, #1A1A2E, #0F3460)' }}
        >
          {/* Декор */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#E94560]/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#F5A623]/20 rounded-full blur-3xl" />

          <div className="relative z-10">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-7xl mb-6 block"
            >
              🧦
            </motion.div>

            <h2
              className="font-black text-white mb-6 leading-none"
              style={{ fontSize: 'clamp(2rem,5vw,5rem)' }}
            >
              ГОТОВЫ К{' '}
              <span className="text-transparent bg-clip-text bg-wool-gradient">
                СОТРУДНИЧЕСТВУ?
              </span>
            </h2>

            <p className="text-white/50 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Присоединяйтесь к экосистеме SHERSTON — более 150 дилеров
              уже зарабатывают с нами по всей России
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/b2b/dealer">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-10 py-5 rounded-2xl bg-wool-gradient text-white font-black text-xl shadow-wool"
                >
                  🤝 Стать дилером
                </motion.button>
              </Link>
              <Link href="/custom">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="px-10 py-5 rounded-2xl border-2 border-white/30 text-white font-bold text-xl hover:border-[#F5A623]/50 transition-colors"
                >
                  🎨 Конструктор носков
                </motion.button>
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-6 mt-10 text-white/40 text-sm">
              <span>✅ Без взносов</span>
              <span>✅ Договор онлайн</span>
              <span>✅ Первый заказ за 1 день</span>
              <span>✅ Менеджер за 2 часа</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
