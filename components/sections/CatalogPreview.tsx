'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { CATALOG, CATALOG_CATEGORIES } from '@/data/catalog'

export default function CatalogPreview() {
  const [active, setActive] = useState('all')

  const filtered = active === 'all'
    ? CATALOG.slice(0, 8)
    : CATALOG.filter((p) => p.category === active).slice(0, 8)

  return (
    <section className="py-24 bg-[#0D0D1A]">
      <div className="container mx-auto px-4">

        {/* Заголовок */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-[#E94560] text-sm font-medium tracking-wider uppercase">
            Каталог продукции
          </span>
          <h2
            className="font-black text-white mt-3 leading-none"
            style={{ fontSize: 'clamp(2.5rem,6vw,6rem)' }}
          >
            500+{' '}
            <span className="text-transparent bg-clip-text bg-wool-gradient">
              МОДЕЛЕЙ
            </span>
          </h2>
          <p className="text-white/40 text-lg mt-4 max-w-xl mx-auto">
            Шерсть, мерино, ангора, хлопок. Оптом напрямую с фабрики.
          </p>
        </motion.div>

        {/* Фильтры */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {CATALOG_CATEGORIES.map((cat) => (
            <motion.button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all
                ${active === cat.id
                  ? 'bg-[#E94560] text-white shadow-wool'
                  : 'glass border border-white/10 text-white/60 hover:text-white'
                }
              `}
            >
              <span>{cat.icon}</span>
              {cat.label}
            </motion.button>
          ))}
        </div>

        {/* Сетка товаров */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-10"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -8 }}
                className="group relative rounded-2xl overflow-hidden glass border border-white/10 hover:border-[#E94560]/30 hover:shadow-wool transition-all duration-300"
              >
                <Link href={`/catalog/${product.slug}`} className="block">

                  {/* Badges */}
                  <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
                    {product.isNew && (
                      <span className="px-2 py-0.5 rounded-full bg-[#F5A623] text-[#0D0D1A] text-xs font-black">
                        NEW
                      </span>
                    )}
                    {product.isBestseller && (
                      <span className="px-2 py-0.5 rounded-full bg-[#E94560] text-white text-xs font-black">
                        ХИТ
                      </span>
                    )}
                  </div>

                  {/* Eco Score */}
                  <div className="absolute top-3 right-3 z-10">
                    <div className={`
                      w-9 h-9 rounded-full flex items-center justify-center text-xs font-black border
                      ${product.ecoScore >= 9
                        ? 'bg-emerald-400/20 border-emerald-400/50 text-emerald-400'
                        : 'bg-[#F5A623]/20 border-[#F5A623]/50 text-[#F5A623]'
                      }
                    `}>
                      {product.ecoScore}
                    </div>
                  </div>

                  {/* Фото */}
                  <div className="aspect-square relative overflow-hidden bg-white/5">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-[#E94560]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="px-3 py-1.5 rounded-lg bg-[#E94560] text-white text-xs font-bold">
                        Подробнее
                      </span>
                    </div>
                  </div>

                  {/* Инфо */}
                  <div className="p-4">
                    <h3 className="text-white font-bold text-sm leading-tight mb-2 group-hover:text-[#E94560] transition-colors">
                      {product.name}
                    </h3>

                    {/* Цвета */}
                    <div className="flex gap-1 mb-3">
                      {product.colorHex.slice(0, 4).map((hex) => (
                        <div
                          key={hex}
                          className="w-3.5 h-3.5 rounded-full border border-white/20"
                          style={{ backgroundColor: hex }}
                        />
                      ))}
                      {product.colorHex.length > 4 && (
                        <span className="text-white/30 text-xs">+{product.colorHex.length - 4}</span>
                      )}
                    </div>

                    {/* Цена */}
                    <div className="flex items-end justify-between">
                      <div>
                        <span className="text-white font-black text-xl">
                          {product.price} ₽
                        </span>
                        <span className="text-white/30 text-xs block">за пару</span>
                      </div>
                      <span className="text-white/20 text-xs">от {product.minQty} пар</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Кнопка всё */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/catalog">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="px-10 py-4 rounded-2xl bg-wool-gradient text-white font-bold text-lg shadow-wool"
            >
              Смотреть все 500+ моделей →
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
        }
