'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { CATALOG, CATALOG_CATEGORIES } from '@/data/catalog'

export default function CatalogPageFull() {
  const [active, setActive] = useState('all')
  const [sort, setSort] = useState('popular')

  const filtered = useMemo(() => {
    let items = active === 'all' ? [...CATALOG] : CATALOG.filter((p) => p.category === active)
    switch (sort) {
      case 'new':       items.sort((a, b) => Number(b.isNew) - Number(a.isNew)); break
      case 'price-asc': items.sort((a, b) => a.price - b.price); break
      case 'price-desc':items.sort((a, b) => b.price - a.price); break
      case 'eco':       items.sort((a, b) => b.ecoScore - a.ecoScore); break
      default:          items.sort((a, b) => Number(b.isBestseller) - Number(a.isBestseller)); break
    }
    return items
  }, [active, sort])

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0D0D1A] pt-28 pb-20">
        <div className="container mx-auto px-4">

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-black text-white leading-none">
              КАТАЛОГ <span className="text-transparent bg-clip-text bg-wool-gradient">НОСКОВ</span>
            </h1>
            <p className="text-white/40 text-lg mt-4">500+ моделей оптом напрямую с фабрики</p>
          </motion.div>

          {/* Фильтры */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {CATALOG_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActive(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${active === cat.id ? 'bg-[#E94560] text-white shadow-wool' : 'glass border border-white/10 text-white/60 hover:text-white'}`}
                >
                  {cat.icon} {cat.label}
                </button>
              ))}
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-[#1A1A2E] border border-white/20 text-white/70 text-sm rounded-xl px-3 py-2 focus:outline-none"
            >
              <option value="popular">По популярности</option>
              <option value="new">Новинки</option>
              <option value="price-asc">Цена ↑</option>
              <option value="price-desc">Цена ↓</option>
              <option value="eco">Eco Score</option>
            </select>
          </div>

          <p className="text-white/30 text-sm mb-6">Найдено: {filtered.length} товаров</p>

          {/* Товары */}
          <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.04 }}
                  whileHover={{ y: -8 }}
                  className="group rounded-2xl overflow-hidden glass border border-white/10 hover:border-[#E94560]/30 hover:shadow-wool transition-all"
                >
                  <Link href={`/catalog/${p.slug}`}>
                    <div className="aspect-square relative overflow-hidden bg-white/5">
                      <Image src={p.image} alt={p.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" sizes="25vw" />
                      <div className="absolute top-2 left-2 flex flex-col gap-1">
                        {p.isNew && <span className="px-2 py-0.5 rounded-full bg-[#F5A623] text-[#0D0D1A] text-[10px] font-black">NEW</span>}
                        {p.isBestseller && <span className="px-2 py-0.5 rounded-full bg-[#E94560] text-white text-[10px] font-black">ХИТ</span>}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-white font-bold text-sm leading-tight mb-2 group-hover:text-[#E94560] transition-colors">{p.name}</h3>
                      <div className="flex gap-1 mb-2">
                        {p.colorHex.slice(0, 4).map((c) => (
                          <div key={c} className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: c }} />
                        ))}
                      </div>
                      <div className="flex items-end justify-between">
                        <div>
                          <span className="text-white font-black text-lg">{p.price} ₽</span>
                          <span className="text-white/30 text-xs block">за пару</span>
                        </div>
                        <span className="text-white/20 text-xs">от {p.minQty} пар</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* CTA */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-16 text-center">
            <div className="max-w-2xl mx-auto p-10 rounded-3xl glass border border-white/10">
              <h3 className="text-3xl font-black text-white mb-4">Нужна кастомная модель?</h3>
              <p className="text-white/50 mb-6">Создайте носки с вашим логотипом — от 50 пар, за 14 дней</p>
              <Link href="/custom">
                <motion.button whileHover={{ scale: 1.05 }} className="px-8 py-4 rounded-xl bg-wool-gradient text-white font-bold text-lg shadow-wool">
                  🎨 Открыть конструктор
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  )
                  }
