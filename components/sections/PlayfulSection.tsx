'use client'

import { useState, useRef } from 'react'
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion'

// Интерактивные носок-персонажи (Levity тренд)
const SOCK_CHARACTERS = [
  { id: 'classic', emoji: '🧦', name: 'Классик', mood: 'серьёзный', price: 85,  color: '#1A1A2E' },
  { id: 'merino',  emoji: '⭐', name: 'Мерино',  mood: 'гордый',    price: 130, color: '#F5A623' },
  { id: 'angora',  emoji: '🐰', name: 'Ангора',  mood: 'пушистый',  price: 95,  color: '#FFC0CB' },
  { id: 'eco',     emoji: '🌿', name: 'Эко',     mood: 'заботливый',price: 120, color: '#4A9A7A' },
  { id: 'sport',   emoji: '🏃', name: 'Спортик', mood: 'быстрый',   price: 145, color: '#E94560' },
  { id: 'kids',    emoji: '🐻', name: 'Малыш',   mood: 'игривый',   price: 65,  color: '#FFB84D' },
]

const REACTIONS = ['😄', '🎉', '🔥', '⚡', '💯', '🚀', '👏', '✨']

// 3D карточка с наклоном
function TiltCard({ children, className }: {
  children: React.ReactNode; className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-100, 100], [8, -8])
  const rotateY = useTransform(x, [-100, 100], [-8, 8])

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set(e.clientX - rect.left - rect.width / 2)
    y.set(e.clientY - rect.top - rect.height / 2)
  }

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={`cursor-none ${className}`}
    >
      {children}
    </motion.div>
  )
}

// Символ носка с реакциями
function SockCharacter({ sock }: { sock: typeof SOCK_CHARACTERS[0] }) {
  const [clicked, setClicked]     = useState(false)
  const [reaction, setReaction]   = useState('')
  const [particles, setParticles] = useState<{ id: number; emoji: string; x: number; y: number }[]>([])

  const handleClick = () => {
    setClicked(true)
    const r = REACTIONS[Math.floor(Math.random() * REACTIONS.length)]
    setReaction(r)
    setParticles(
      Array.from({ length: 6 }, (_, i) => ({
        id: Date.now() + i,
        emoji: REACTIONS[Math.floor(Math.random() * REACTIONS.length)],
        x: (Math.random() - 0.5) * 120,
        y: -(Math.random() * 80 + 40),
      }))
    )
    setTimeout(() => { setClicked(false); setReaction(''); setParticles([]) }, 1000)
  }

  return (
    <TiltCard>
      <motion.div
        onClick={handleClick}
        whileHover={{ y: -12, scale: 1.05 }}
        whileTap={{ scale: 0.92 }}
        className="relative p-6 rounded-2xl text-center select-none overflow-visible"
        style={{
          background: `${sock.color}12`,
          border: `1px solid ${sock.color}25`,
          cursor: 'none',
        }}
      >
        {/* Частицы при клике */}
        <AnimatePresence>
          {particles.map((p) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 1, x: 0, y: 0, scale: 0 }}
              animate={{ opacity: 0, x: p.x, y: p.y, scale: 1.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="absolute top-1/2 left-1/2 text-2xl pointer-events-none z-20"
            >
              {p.emoji}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Реакция */}
        <AnimatePresence>
          {reaction && (
            <motion.div
              initial={{ opacity: 1, y: 0, scale: 0.5 }}
              animate={{ opacity: 0, y: -40, scale: 1.5 }}
              exit={{ opacity: 0 }}
              className="absolute -top-4 left-1/2 -translate-x-1/2 text-3xl z-10"
            >
              {reaction}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Иконка */}
        <motion.div
          animate={clicked
            ? { rotate: [0, 20, -20, 10, -10, 0], scale: [1, 1.3, 0.9, 1.1, 1] }
            : { y: [0, -4, 0] }
          }
          transition={clicked
            ? { duration: 0.6 }
            : { duration: 3 + Math.random() * 2, repeat: Infinity, ease: 'easeInOut' }
          }
          className="text-5xl mb-3 block"
        >
          {sock.emoji}
        </motion.div>

        <p className="text-white font-bold text-sm mb-0.5">{sock.name}</p>
        <p className="text-white/30 text-xs mb-3">«{sock.mood}»</p>
        <div className="font-black text-lg" style={{ color: sock.color }}>
          {sock.price} ₽/пара
        </div>

        {/* Tooltip подсказка */}
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          whileHover={{ opacity: 1, y: 0 }}
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap
                     px-2 py-1 rounded text-[10px] text-white/60"
          style={{ background: 'rgba(0,0,0,0.7)' }}
        >
          Нажмите на меня!
        </motion.div>
      </motion.div>
    </TiltCard>
  )
}

// Игровой счётчик
function PlayfulCounter() {
  const [count, setCount] = useState(0)
  const [burst, setBurst] = useState(false)

  const increment = () => {
    setCount(c => c + 1)
    if ((count + 1) % 10 === 0) {
      setBurst(true)
      setTimeout(() => setBurst(false), 600)
    }
  }

  return (
    <div className="text-center p-8 rounded-2xl relative overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <AnimatePresence>
        {burst && (
          <motion.div
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 3, opacity: 0 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(233,69,96,0.3), transparent)' }}
          />
        )}
      </AnimatePresence>

      <p className="text-white/30 text-xs uppercase tracking-[4px] mb-4">
        Пар носков заказано сегодня
      </p>
      <motion.div
        animate={burst ? { scale: [1, 1.3, 1] } : {}}
        className="text-6xl font-black mb-4"
        style={{ color: '#E94560' }}
      >
        {(1247 + count).toLocaleString('ru-RU')}
      </motion.div>
      <motion.button
        onClick={increment}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="px-6 py-3 rounded-full font-bold text-sm text-white"
        style={{ background: 'linear-gradient(135deg, #E94560, #F5A623)' }}
      >
        ➕ Добавить свои
      </motion.button>
    </div>
  )
}

export default function PlayfulSection() {
  return (
    <section className="py-28 bg-[#060608] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Заголовок — Levity тренд */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-[10px] text-[#F5A623] tracking-[8px] uppercase font-bold mb-4">
            Игра
          </p>
          <h2 className="font-black leading-none mb-4"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 8rem)' }}
          >
            <span className="text-white">ПОЗНАКОМЬТЕСЬ</span>
            <span
              className="block"
              style={{
                fontStyle: 'italic',
                background: 'linear-gradient(135deg,#F5A623,#E94560)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              с нашими носками
            </span>
          </h2>
          <p className="text-white/25 text-sm">
            Нажмите на любого персонажа 👆
          </p>
        </motion.div>

        {/* Носки-персонажи */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-16">
          {SOCK_CHARACTERS.map((sock, i) => (
            <motion.div
              key={sock.id}
              initial={{ opacity: 0, y: 40, rotate: (i % 2 === 0 ? -5 : 5) }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <SockCharacter sock={sock} />
            </motion.div>
          ))}
        </div>

        {/* Счётчик + факты */}
        <div className="grid md:grid-cols-2 gap-6">
          <PlayfulCounter />

          {/* Весёлые факты */}
          <div className="p-8 rounded-2xl"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            <p className="text-white/30 text-xs uppercase tracking-[4px] mb-6">
              Знаете ли вы?
            </p>
            <div className="space-y-4">
              {[
                { icon: '🐑', fact: 'Из 1 кг шерсти выходит ~15 пар носков' },
                { icon: '🕐', fact: 'Один носок вяжется за ~4 минуты' },
                { icon: '📏', fact: 'Самый маленький размер — 8 (для новорождённых)' },
                { icon: '🌡️', fact: 'Шерсть греет при −40°C и охлаждает при +30°C' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ x: 6 }}
                  className="flex items-start gap-4 group cursor-default"
                >
                  <motion.span
                    className="text-2xl shrink-0"
                    whileHover={{ scale: 1.3, rotate: 10 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    {item.icon}
                  </motion.span>
                  <span className="text-white/45 text-sm leading-relaxed
                                   group-hover:text-white/70 transition-colors">
                    {item.fact}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
              }
