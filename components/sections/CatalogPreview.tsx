'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { CATALOG, CATALOG_CATEGORIES } from '@/data/catalog'
import LiquidButton from '@/components/ui/LiquidButton'

export default function CatalogPreview() {
  const [active, setActive]   = useState('all')
  const [hovered, setHovered] = useState<string | null>(null)
  const [sort, setSort]       = useState('popular')

  const items = useMemo(() => {
    let list = active === 'all'
      ? [...CATALOG]
      : CATALOG.filter((p) => p.category === active)

    if (sort === 'new')
      list.sort((a, b) => Number(b.isNew) - Number(a.isNew))
    else if (sort === 'price')
      list.sort((a, b) => a.price - b.price)
    else
      list.sort((a, b) => Number(b.isBestseller) - Number(a.isBestseller))

    return list.slice(0, 8)
  }, [active, sort])

  return (
    <section className="py-32 bg-[#060608]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* ЗАГОЛОВОК */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[11px] text-[#E94560] tracking-[6px] uppercase mb-4 font-semibold"
            >
              Каталог продукции
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-black leading-none"
              style={{ fontSize: 'clamp(2.5rem, 7vw, 8rem)' }}
            >
              <span className="text-white">500</span>
              <span className="text-stroke"> + МОДЕЛЕЙ</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link href="/catalog">
              <motion.div
                whileHover={{ x: 8 }}
                className="flex items-center gap-3 text-white/35 hover:text-white transition-colors group cursor-none"
              >
                <span className="text-xs tracking-[3px] uppercase font-semibold">
                  Смотреть все
                </span>
                <motion.span
                  animate={{ x: [0,5,0] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                  className="text-lg group-hover:text-[#E94560] transition-colors"
                >
                  →
                </motion.span>
              </motion.div>
            </Link>
          </motion.div>
        </div>

        {/* ФИЛЬТРЫ */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {CATALOG_CATEGORIES.map((cat) => (
              <motion.button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-full
                  text-xs font-semibold whitespace-nowrap
                  transition-all duration-300
                  ${active === cat.id
                    ? 'text-white shadow-brand'
                    : 'text-white/35 border border-white/[0.07] hover:text-white/60 hover:border-white/15'
                  }
                `}
                style={active === cat.id ? {
                  background: 'linear-gradient(135deg, #E94560, #F5A623)',
                } : {}}
              >
                <span>{cat.icon}</span>
                {cat.label}
              </motion.button>
            ))}
          </div>

          {/* Сортировка */}
          <div className="flex gap-1 p-1 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
            {[
              { id: 'popular', label: 'Хиты' },
              { id: 'new',     label: 'Новинки' },
              { id: 'price',   label: 'Цена' },
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => setSort(s.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  sort === s.id ? 'bg-[#E94560] text-white' : 'text-white/30 hover:text-white/60'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* СЕТКА */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
        >
          <AnimatePresence mode="popLayout">
            {items.map((p, i) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1  }}
                exit={{ opacity: 0, scale: 0.88  }}
                transition={{ delay: i * 0.05, duration: 0.5, ease: [0.16,1,0.3,1] }}
                onHoverStart={() => setHovered(p.id)}
                onHoverEnd={() => setHovered(null)}
                className="group"
              >
                <Link href={`/catalog/${p.slug}`} className="block">
                  <div
                    className="relative overflow-hidden rounded-2xl"
                    style={{
                      background: '#0C0C10',
                      border: '1px solid rgba(255,255,255,0.06)',
                      transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
                    }}
                  >
                    {/* ФОТО */}
                    <div className="aspect-square relative overflow-hidden">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        className="object-cover transition-all duration-700
                                   group-hover:scale-110 group-hover:brightness-110"
                        sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
                      />

                      {/* Gradient overlay */}
                      <motion.div
                        animate={{ opacity: hovered === p.id ? 1 : 0 }}
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background:
                            'linear-gradient(to top, rgba(6,6,8,0.95) 0%, rgba(6,6,8,0.3) 50%, transparent 100%)',
                        }}
                      />

                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                        {p.isNew && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-black bg-[#F5A623] text-black">
                            NEW
                          </span>
                        )}
                        {p.isBestseller && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-black bg-[#E94560] text-white">
                            ХИТ
                          </span>
                        )}
                      </div>

                      {/* Eco */}
                      <div className="absolute top-3 right-3 z-10">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black backdrop-blur-sm ${
                            p.ecoScore >= 9
                              ? 'bg-emerald-400/20 text-emerald-400 border border-emerald-400/30'
                              : 'bg-[#F5A623]/20 text-[#F5A623] border border-[#F5A623]/30'
                          }`}
                        >
                          {p.ecoScore}
                        </div>
                      </div>

                      {/* Hover — инфо */}
                      <motion.div
                        animate={{ y: hovered === p.id ? 0 : 12, opacity: hovered === p.id ? 1 : 0 }}
                        transition={{ duration: 0.25 }}
                        className="absolute bottom-0 left-0 right-0 p-4 z-10"
                      >
                        <p className="text-white font-bold text-xs leading-tight mb-2">
                          {p.name}
                        </p>
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1">
                            {p.colorHex.slice(0, 4).map((c) => (
                              <div key={c} className="w-3 h-3 rounded-full border border-white/30"
                                style={{ backgroundColor: c }} />
                            ))}
                          </div>
                          <span className="text-white font-black ml-auto">{p.price} ₽</span>
                        </div>
                      </motion.div>
                    </div>

                    {/* Нижняя часть */}
                    <div className="p-4">
                      <h3 className="text-white/80 font-semibold text-sm leading-tight mb-2
                                     group-hover:text-[#E94560] transition-colors duration-300 truncate">
                        {p.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-white font-black text-lg">{p.price} ₽</span>
                        <span className="text-white/25 text-xs">от {p.minQty} пар</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div
            className="inline-block p-10 rounded-3xl max-w-xl mx-auto w-full"
            style={{
              background: 'linear-gradient(135deg, rgba(233,69,96,0.07), rgba(245,166,35,0.04))',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <h3 className="text-2xl font-black text-white mb-3">
              Нет нужной модели?
            </h3>
            <p className="text-white/40 text-sm mb-6">
              Создайте носки с вашим логотипом — от 50 пар за 14 дней
            </p>
            <LiquidButton href="/custom" size="lg">
              🎨 Открыть конструктор →
            </LiquidButton>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
