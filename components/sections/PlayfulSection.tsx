'use client'

import { useState } from 'react'
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion'

const SOCKS = [
  { id: 'classic', emoji: '🧦', name: 'Классик', mood: 'серьёзный', price: 85,  color: '#1A1A2E' },
  { id: 'merino',  emoji: '⭐', name: 'Мерино',  mood: 'гордый',    price: 130, color: '#F5A623' },
  { id: 'angora',  emoji: '🐰', name: 'Ангора',  mood: 'пушистый',  price: 95,  color: '#E94560' },
  { id: 'eco',     emoji: '🌿', name: 'Эко',     mood: 'заботливый',price: 120, color: '#4A9A7A' },
  { id: 'sport',   emoji: '🏃', name: 'Спортик', mood: 'быстрый',   price: 145, color: '#7C3AED' },
  { id: 'kids',    emoji: '🐻', name: 'Малыш',   mood: 'игривый',   price: 65,  color: '#F59E0B' },
]

const REACTIONS = ['😄', '🎉', '🔥', '⚡', '💯', '🚀']

const FACTS = [
  { icon: '🐑', text: 'Из 1 кг шерсти выходит ~15 пар носков' },
  { icon: '🕐', text: 'Один носок вяжется за ~4 минуты' },
  { icon: '📏', text: 'Самый маленький размер — 8 (для новорождённых)' },
  { icon: '🌡️', text: 'Шерсть греет при −40°C и охлаждает при +30°C' },
]

function TiltCard({ children }: { children: React.ReactNode }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-100, 100], [8, -8])
  const rotateY = useTransform(x, [-100, 100], [-8, 8])

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set(e.clientX - rect.left - rect.width / 2)
    y.set(e.clientY - rect.top - rect.height / 2)
  }

  const handleLeave = () => { x.set(0); y.set(0) }

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {children}
    </motion.div>
  )
}

function SockChar({ sock }: { sock: typeof SOCKS[0] }) {
  const [clicked, setClicked] = useState(false)
  const [reaction, setReaction] = useState('')

  const handleClick = () => {
    if (clicked) return
    setClicked(true)
    setReaction(REACTIONS[Math.floor(Math.random() * REACTIONS.length)])
    setTimeout(() => { setClicked(false); setReaction('') }, 900)
  }

  return (
    <TiltCard>
      <motion.div
        onClick={handleClick}
        whileHover={{ y: -10, scale: 1.04 }}
        whileTap={{ scale: 0.93 }}
        className="relative p-5 rounded-2xl text-center select-none"
        style={{
          background: `${sock.color}12`,
          border: `1px solid ${sock.color}25`,
        }}
      >
        <AnimatePresence>
          {reaction && (
            <motion.div
              initial={{ opacity: 1, y: 0, scale: 0.5 }}
              animate={{ opacity: 0, y: -40, scale: 1.5 }}
              exit={{ opacity: 0 }}
              className="absolute top-2 left-1/2 -translate-x-1/2 text-2xl z-20 pointer-events-none"
            >
              {reaction}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          animate={clicked
            ? { rotate: [0, 20, -20, 10, -10, 0], scale: [1, 1.3, 0.9, 1.1, 1] }
            : { y: [0, -4, 0] }
          }
          transition={clicked
            ? { duration: 0.6 }
            : { duration: 3, repeat: Infinity, ease: 'easeInOut' }
          }
          className="text-5xl mb-3 block"
        >
          {sock.emoji}
        </motion.div>

        <p className="text-white font-bold text-sm mb-0.5">{sock.name}</p>
        <p className="text-white/30 text-xs mb-2">«{sock.mood}»</p>
        <div className="font-black text-base" style={{ color: sock.color }}>
          {sock.price} ₽/пара
        </div>
      </motion.div>
    </TiltCard>
  )
}

export default function PlayfulSection() {
  const [count, setCount] = useState(0)
  const [burst, setBurst] = useState(false)

  const inc = () => {
    const next = count + 1
    setCount(next)
    if (next % 10 === 0) {
      setBurst(true)
      setTimeout(() => setBurst(false), 600)
    }
  }

  return (
    <section className="py-28 bg-[#060608]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-[10px] text-[#F5A623] tracking-[8px] uppercase font-bold mb-4">
            Игра
          </p>
          <h2
            className="font-black leading-none mb-4"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 8rem)' }}
          >
            <span className="text-white">ПОЗНАКОМЬТЕСЬ </span>
            <span
              style={{
                fontStyle: 'italic',
                background: 'linear-gradient(135deg,#F5A623,#E94560)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              с командой
            </span>
          </h2>
          <p className="text-white/25 text-sm">Нажмите на любого персонажа 👆</p>
        </motion.div>

        {/* Носки */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-16">
          {SOCKS.map((sock, i) => (
            <motion.div
              key={sock.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <SockChar sock={sock} />
            </motion.div>
          ))}
        </div>

        {/* Счётчик + факты */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Счётчик */}
          <div
            className="relative p-8 rounded-2xl text-center overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <AnimatePresence>
              {burst && (
                <motion.div
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 3, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 pointer-events-none rounded-2xl"
                  style={{ background: 'radial-gradient(circle,rgba(233,69,96,0.3),transparent)' }}
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
              onClick={inc}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className="px-6 py-3 rounded-full font-bold text-sm text-white"
              style={{ background: 'linear-gradient(135deg,#E94560,#F5A623)' }}
            >
              ➕ Добавить свои
            </motion.button>
          </div>

          {/* Факты */}
          <div
            className="p-8 rounded-2xl"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <p className="text-white/30 text-xs uppercase tracking-[4px] mb-6">
              Знаете ли вы?
            </p>
            <div className="space-y-4">
              {FACTS.map((fact, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ x: 6 }}
                  className="flex items-start gap-4 group"
                >
                  <motion.span
                    className="text-2xl shrink-0"
                    whileHover={{ scale: 1.3, rotate: 10 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    {fact.icon}
                  </motion.span>
                  <span className="text-white/45 text-sm leading-relaxed group-hover:text-white/70 transition-colors">
                    {fact.text}
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
