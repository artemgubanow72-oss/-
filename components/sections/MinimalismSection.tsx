'use client'

import { motion } from 'framer-motion'

const NUMBERS = [
  { num: '20',  unit: 'лет',    desc: 'безупречного качества' },
  { num: '500', unit: '+',      desc: 'моделей в каталоге' },
  { num: '1',   unit: ' день',  desc: 'срок отгрузки' },
]

const PRINCIPLES = [
  'Натуральные материалы',
  'Прозрачное производство',
  'Честные цены',
  'Поддержка дилеров 24/7',
  'Eco-first подход',
  'Персональный сервис',
]

export default function MinimalismSection() {
  return (
    <section className="py-40 bg-[#060608]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Числа */}
        <div className="grid grid-cols-3 gap-4 mb-24">
          {NUMBERS.map((item, i) => (
            <motion.div
              key={item.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <div
                className="font-black leading-none mb-3"
                style={{ fontSize: 'clamp(3rem, 10vw, 12rem)' }}
              >
                <span className="text-white">{item.num}</span>
                <span className="text-white/15" style={{ fontSize: '0.4em' }}>
                  {item.unit}
                </span>
              </div>
              <p className="text-white/20 text-xs md:text-sm font-light tracking-widest uppercase">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Разделитель */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          className="h-px origin-left mb-24"
          style={{ background: 'linear-gradient(90deg,#E94560,#F5A623,transparent)' }}
        />

        {/* Принципы */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-4 mb-24">
          {PRINCIPLES.map((p, i) => (
            <motion.div
              key={p}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ x: 8 }}
              className="flex items-center gap-4 group"
            >
              <span
                className="w-1 h-8 rounded-full shrink-0 transition-all duration-300 group-hover:h-12"
                style={{ background: i % 2 === 0 ? '#E94560' : '#F5A623' }}
              />
              <span
                className="font-medium transition-colors duration-300 group-hover:text-white/60"
                style={{
                  color: 'rgba(255,255,255,0.35)',
                  fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
                }}
              >
                {p}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Цитата */}
        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p
            className="font-light text-white/55 leading-[1.6] max-w-2xl mx-auto"
            style={{
              fontSize: 'clamp(1.1rem, 2.5vw, 1.8rem)',
              letterSpacing: '-0.01em',
            }}
          >
            «Носки — это первое, что человек надевает утром
            и последнее, что снимает вечером.
            Мы считаем, что они должны быть совершенными.»
          </p>
          <p className="text-white/20 text-xs tracking-[5px] uppercase mt-6">
            — Команда SHERSTON
          </p>
        </motion.blockquote>
      </div>
    </section>
  )
}
