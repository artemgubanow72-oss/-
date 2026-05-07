'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function ContactPage() {
  const [sent, setSent] = useState(false)

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0D0D1A] pt-28 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-black text-white leading-none">
              КОНТАКТЫ
            </h1>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              {[
                { icon: '📞', label: 'Телефон', value: '+7 (XXX) XXX-XX-XX', href: 'tel:+7XXXXXXXXXX' },
                { icon: '📧', label: 'Email', value: 'b2b@sherston.ru', href: 'mailto:b2b@sherston.ru' },
                { icon: '📍', label: 'Адрес', value: 'г. Рассказово, Тамбовская область', href: null },
                { icon: '🕐', label: 'Режим работы', value: 'Пн–Пт: 9:00–18:00 МСК', href: null },
                { icon: '✈️', label: 'Telegram', value: '@sherston_wool', href: 'https://t.me/sherston_wool' },
              ].map((c) => (
                <div key={c.label} className="flex items-center gap-4 p-5 rounded-2xl glass border border-white/10">
                  <span className="text-3xl">{c.icon}</span>
                  <div>
                    <p className="text-white/40 text-xs">{c.label}</p>
                    {c.href ? (
                      <a href={c.href} className="text-white font-bold hover:text-[#E94560] transition-colors">{c.value}</a>
                    ) : (
                      <p className="text-white font-bold">{c.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {sent ? (
              <div className="flex items-center justify-center glass border border-emerald-400/30 rounded-3xl p-10 text-center">
                <div>
                  <div className="text-7xl mb-4">✅</div>
                  <h3 className="text-2xl font-black text-white">Сообщение отправлено!</h3>
                  <p className="text-white/50 mt-2">Ответим в течение 2 часов</p>
                </div>
              </div>
            ) : (
              <form onSubmit={async (e) => { e.preventDefault(); await new Promise((r) => setTimeout(r, 1000)); setSent(true) }}
                className="space-y-4 glass border border-white/10 p-8 rounded-3xl">
                <input required type="text" placeholder="Ваше имя *"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:border-[#E94560]" />
                <input required type="tel" placeholder="Телефон *"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:border-[#E94560]" />
                <input required type="email" placeholder="Email *"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:border-[#E94560]" />
                <textarea required placeholder="Ваш вопрос *" rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:border-[#E94560] resize-none" />
                <button type="submit" className="w-full py-4 rounded-2xl bg-wool-gradient text-white font-black text-lg shadow-wool">
                  Отправить сообщение
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
