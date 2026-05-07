'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

const NAV_LINKS = [
  { label: 'Каталог',     href: '/catalog' },
  { label: 'Конструктор', href: '/custom',     badge: 'NEW' },
  { label: 'B2B',         href: '/b2b' },
  { label: 'Производство',href: '/production' },
  { label: 'Блог',        href: '/blog' },
]

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname                     = usePathname()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [pathname])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${scrolled
            ? 'bg-[#0D0D1A]/90 backdrop-blur-xl border-b border-white/10 shadow-lg'
            : 'bg-transparent'
          }
        `}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">

            {/* Лого */}
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ rotate: 5, scale: 1.1 }}
                className="w-10 h-10 rounded-xl bg-wool-gradient flex items-center justify-center shadow-wool"
              >
                <span className="text-white font-black text-xl">S</span>
              </motion.div>
              <div>
                <span className="block text-white font-black text-lg tracking-tight leading-none">
                  SHERSTON
                </span>
                <span className="block text-white/30 text-[10px] tracking-[3px] uppercase leading-none mt-0.5">
                  wool ecosystem
                </span>
              </div>
            </Link>

            {/* Десктоп навигация */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
                    transition-colors duration-200
                    ${pathname.startsWith(link.href)
                      ? 'text-wool-red'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                    }
                  `}
                >
                  {link.label}
                  {link.badge && (
                    <span className="px-1.5 py-0.5 rounded-full bg-wool-red text-white text-[9px] font-black">
                      {link.badge}
                    </span>
                  )}
                  {pathname.startsWith(link.href) && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-wool-red rounded-full"
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* Правые кнопки */}
            <div className="flex items-center gap-3">
              <Link
                href="/b2b/dealer"
                className="hidden md:block"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-5 py-2.5 rounded-xl bg-wool-gradient text-white font-bold text-sm shadow-wool"
                >
                  Стать дилером
                </motion.button>
              </Link>

              {/* Бургер */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden w-10 h-10 rounded-xl glass flex items-center justify-center"
              >
                <div className="space-y-1.5">
                  <motion.span
                    animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                    className="block w-5 h-0.5 bg-white"
                  />
                  <motion.span
                    animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                    className="block w-5 h-0.5 bg-white"
                  />
                  <motion.span
                    animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                    className="block w-5 h-0.5 bg-white"
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Мобильное меню */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 30 }}
            className="fixed inset-0 z-40 bg-[#0D0D1A]/98 backdrop-blur-xl pt-24 px-6 pb-8 lg:hidden"
          >
            <nav className="space-y-2 mb-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 px-4 py-4 rounded-2xl text-white text-xl font-semibold hover:bg-white/5 transition-colors"
                >
                  {link.label}
                  {link.badge && (
                    <span className="px-2 py-0.5 rounded-full bg-wool-red text-white text-xs font-black">
                      {link.badge}
                    </span>
                  )}
                </Link>
              ))}
            </nav>
            <div className="space-y-3">
              <Link href="/b2b/dealer" className="block">
                <button className="w-full py-4 rounded-2xl bg-wool-gradient text-white font-black text-lg">
                  🤝 Стать дилером
                </button>
              </Link>
              <Link href="/catalog" className="block">
                <button className="w-full py-4 rounded-2xl glass text-white font-bold text-lg border border-white/20">
                  📦 Каталог
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
              }
