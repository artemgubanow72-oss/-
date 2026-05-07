'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function DealerPage() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '', phone: '', email: '', company: '', region: '', volume: '', channel: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1500))
    setLoading(false)
    setSent(true)
  }

  const BENEFITS = [
    { icon: '💰', title: 'Маржа 40–60%',        desc: 'Оптовые цены от производителя' },
    { icon: '📦', title: 'Отгрузка за 1 день',   desc: 'Склад в Рассказово' },
    { icon: '🎨', title: 'Конструктор носков',   desc: 'Носки с вашим логотипом' },
    { icon: '🖥️', title: 'Личный кабинет',       desc: 'Заказы и документы онлайн' },
    { icon: '🤝', title: 'Менеджер за 2 часа',   desc: 'Персональная поддержка' },
    { icon: '📜', title: 'Все документы',         desc: 'Честный ЗНАК, ГОСТ, УПД' },
  ]

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0D0D1A] pt-28 pb-20">
        <div className="container mx-auto px-4">

          {/* Hero */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <h1 className="font-black text-white leading-none" style={{ fontSize: 'clamp(3rem,8vw,8rem)' }}>
              СТАТЬ<br />
              <span className="text-transparent bg-clip-text bg-wool-gradient">ДИЛЕРОМ</span>
            </h1>
            <p className="text-white/50 text-xl mt-6 max-w-2xl mx-auto">
              Готовая B2B экосистема. 150+ партнёров по России. Маржа 40–60%.
            </p>
          </motion.div>

          {/* Преимущества */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-20">
            {BENEFITS.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-6 rounded-2xl glass border border-white/10 text-center"
              >
                <span className="text-4xl block mb-3">{b.icon}</span>
                <h3 className="text-white font-bold text-base">{b.title}</h3>
                <p className="text-white/40 text-sm mt-1">{b.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Форма */}
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-black text-white text-center mb-10">
              Подать заявку
            </h2>

            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16 px-8 rounded-3xl glass border border-emerald-400/30"
                >
                  <div className="text-7xl mb-6">🎉</div>
                  <h3 className="text-3xl font-black text-white mb-4">Заявка принята!</h3>
                  <p className="text-white/50 text-lg">
                    Ваш менеджер свяжется в течение 2 часов в рабочее время.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="p-8 rounded-3xl glass border border-white/10 space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { key: 'name', placeholder: 'Ваше имя *', type: 'text' },
                      { key: 'phone', placeholder: '+7 (___) ___-__-__ *', type: 'tel' },
                      { key: 'email', placeholder: 'Email *', type: 'email' },
                      { key: 'company', placeholder: 'Компания / ИП *', type: 'text' },
                      { key: 'region', placeholder: 'Регион / город *', type: 'text' },
                    ].map((f) => (
                      <input
                        key={f.key}
                        type={f.type}
                        placeholder={f.placeholder}
                        required
                        value={form[f.key as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                        className="col-span-1 px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:border-[#E94560] transition-colors"
                      />
                    ))}

                    <select
                      required
                      value={form.volume}
                      onChange={(e) => setForm({ ...form, volume: e.target.value })}
                      className="px-4 py-3 rounded-xl bg-[#1A1A2E] border border-white/20 text-white/70 focus:outline-none focus:border-[#E94560]"
                    >
                      <option value="">Объём в месяц *</option>
                      <option>50–200 пар/мес</option>
                      <option>200–500 пар/мес</option>
                      <option>500–1000 пар/мес</option>
                      <option>1000–2000 пар/мес</option>
                      <option>2000+ пар/мес</option>
                    </select>

                    <select
                      required
                      value={form.channel}
                      onChange={(e) => setForm({ ...form, channel: e.target.value })}
                      className="px-4 py-3 rounded-xl bg-[#1A1A2E] border border-white/20 text-white/70 focus:outline-none focus:border-[#E94560]"
                    >
                      <option value="">Канал продаж *</option>
                      <option>Розничный магазин</option>
                      <option>Интернет-магазин</option>
                      <option>Wildberries / Ozon</option>
                      <option>Корпоративные продажи</option>
                      <option>Оптовая торговля</option>
                    </select>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-5 rounded-2xl bg-wool-gradient text-white font-black text-xl shadow-wool disabled:opacity-60"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Отправляем...
                      </div>
                    ) : '🤝 Стать дилером SHERSTON'}
                  </motion.button>

                  <p className="text-white/20 text-xs text-center">
                    Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности.
                    Ответ в течение 2 часов в рабочее время.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
                        }
