'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDropzone } from 'react-dropzone'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const MODELS = [
  { id: 'classic', name: 'Классические', icon: '🧦', min: 100 },
  { id: 'golf',    name: 'Гольфы',       icon: '🎿', min: 50  },
  { id: 'sport',   name: 'Спортивные',   icon: '🏃', min: 100 },
  { id: 'kids',    name: 'Детские',      icon: '🧒', min: 200 },
  { id: 'ankle',   name: 'Следки',       icon: '👟', min: 200 },
]

const GALLERY = [
  { id: 'g1', name: 'Скандинавский', emoji: '❄️' },
  { id: 'g2', name: 'Полосы',        emoji: '〰️' },
  { id: 'g3', name: 'Ромбы',         emoji: '◇' },
  { id: 'g4', name: 'Снежинки',      emoji: '❄' },
  { id: 'g5', name: 'Абстракция',    emoji: '🎨' },
  { id: 'g6', name: 'Корпоративный', emoji: '🏢' },
]

type Step = 'model' | 'design' | 'quantity' | 'order'

export default function CustomPage() {
  const [step, setStep] = useState<Step>('model')
  const [model, setModel] = useState('')
  const [designMode, setDesignMode] = useState<'upload' | 'gallery' | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [gallery, setGallery] = useState('')
  const [qty, setQty] = useState(100)
  const [sent, setSent] = useState(false)

  const onDrop = useCallback((files: File[]) => {
    if (files[0]) { setFile(files[0]); setDesignMode('upload') }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.png', '.jpg', '.svg'], 'application/pdf': ['.pdf'] },
    maxSize: 10 * 1024 * 1024,
  })

  const basePrice = 85
  const designFee = (file || gallery) ? 15 : 0
  const disc = qty >= 1000 ? 0.15 : qty >= 500 ? 0.10 : qty >= 200 ? 0.05 : 0
  const unit = Math.round((basePrice + designFee) * (1 - disc))
  const total = unit * qty

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0D0D1A] pt-28 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="font-black text-white leading-none" style={{ fontSize: 'clamp(3rem,7vw,7rem)' }}>
              КОНСТРУКТОР<br />
              <span className="text-transparent bg-clip-text bg-wool-gradient">НОСКОВ</span>
            </h1>
            <p className="text-white/40 text-lg mt-4">
              Загрузи логотип → получи 3D-превью за 30 мин → носки за 14 дней
            </p>
          </motion.div>

          {/* Степпер */}
          <div className="flex items-center justify-center mb-10 gap-0">
            {([
              { id: 'model',    label: '1. Модель',  icon: '🧦' },
              { id: 'design',   label: '2. Дизайн',  icon: '🎨' },
              { id: 'quantity', label: '3. Расчёт',  icon: '💰' },
              { id: 'order',    label: '4. Заказ',   icon: '✅' },
            ] as { id: Step; label: string; icon: string }[]).map((s, i, arr) => (
              <div key={s.id} className="flex items-center">
                <div className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${step === s.id ? 'bg-[#E94560]/20 border border-[#E94560]/40' : 'opacity-40'}`}>
                  <span className="text-xl">{s.icon}</span>
                  <span className={`text-xs font-medium ${step === s.id ? 'text-[#E94560]' : 'text-white/40'}`}>{s.label}</span>
                </div>
                {i < arr.length - 1 && <div className="w-6 h-px bg-white/10 mx-1" />}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">

            {/* Шаг 1: Модель */}
            {step === 'model' && (
              <motion.div key="model" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }}>
                <h2 className="text-2xl font-bold text-white mb-6">Выберите модель носка</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                  {MODELS.map((m) => (
                    <motion.button
                      key={m.id}
                      onClick={() => { setModel(m.id); setStep('design') }}
                      whileHover={{ scale: 1.05 }}
                      className={`p-5 rounded-2xl border text-center transition-all ${model === m.id ? 'border-[#E94560] bg-[#E94560]/10' : 'glass border-white/10 hover:border-white/30'}`}
                    >
                      <span className="text-4xl block mb-2">{m.icon}</span>
                      <p className="text-white font-bold text-sm">{m.name}</p>
                      <p className="text-white/30 text-xs mt-1">от {m.min} пар</p>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Шаг 2: Дизайн */}
            {step === 'design' && (
              <motion.div key="design" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }}>
                <h2 className="text-2xl font-bold text-white mb-6">Ваш дизайн</h2>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <button onClick={() => setDesignMode('upload')}
                    className={`p-6 rounded-2xl border text-center transition-all ${designMode === 'upload' ? 'border-[#E94560] bg-[#E94560]/10' : 'glass border-white/10'}`}>
                    <span className="text-4xl block mb-2">📤</span>
                    <p className="text-white font-bold">Загрузить логотип</p>
                    <p className="text-white/40 text-xs mt-1">PNG, SVG, PDF</p>
                  </button>
                  <button onClick={() => setDesignMode('gallery')}
                    className={`p-6 rounded-2xl border text-center transition-all ${designMode === 'gallery' ? 'border-[#F5A623] bg-[#F5A623]/10' : 'glass border-white/10'}`}>
                    <span className="text-4xl block mb-2">🖼️</span>
                    <p className="text-white font-bold">Из галереи</p>
                    <p className="text-white/40 text-xs mt-1">50+ готовых рисунков</p>
                  </button>
                </div>

                {designMode === 'upload' && (
                  <div {...getRootProps()} className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all ${isDragActive ? 'border-[#E94560] bg-[#E94560]/10' : 'border-white/20 hover:border-white/40 glass'}`}>
                    <input {...getInputProps()} />
                    {file ? (
                      <>
                        <div className="text-5xl mb-3">✅</div>
                        <p className="text-white font-bold">{file.name}</p>
                        <button onClick={(e) => { e.stopPropagation(); setFile(null) }} className="text-[#E94560] text-sm mt-2 hover:underline">Заменить</button>
                      </>
                    ) : (
                      <>
                        <div className="text-5xl mb-3">{isDragActive ? '🎯' : '📁'}</div>
                        <p className="text-white font-bold">{isDragActive ? 'Отпустите!' : 'Перетащите файл сюда'}</p>
                        <p className="text-white/40 text-sm mt-2">или нажмите для выбора • до 10 МБ</p>
                      </>
                    )}
                  </div>
                )}

                {designMode === 'gallery' && (
                  <div className="grid grid-cols-3 gap-3">
                    {GALLERY.map((g) => (
                      <button key={g.id} onClick={() => setGallery(g.id)}
                        className={`p-4 rounded-xl border-2 text-center transition-all ${gallery === g.id ? 'border-[#F5A623] bg-[#F5A623]/10' : 'glass border-white/10 hover:border-white/30'}`}>
                        <span className="text-3xl block mb-1">{g.emoji}</span>
                        <p className="text-white text-xs font-medium">{g.name}</p>
                      </button>
                    ))}
                  </div>
                )}

                {(file || gallery) && (
                  <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => setStep('quantity')}
                    className="mt-6 w-full py-4 rounded-xl bg-wool-gradient text-white font-bold text-lg">
                    Рассчитать стоимость →
                  </motion.button>
                )}
              </motion.div>
            )}

            {/* Шаг 3: Расчёт */}
            {step === 'quantity' && (
              <motion.div key="quantity" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }}>
                <h2 className="text-2xl font-bold text-white mb-6">Расчёт стоимости</h2>
                <div className="glass border border-white/10 rounded-2xl p-6 mb-6">
                  <label className="text-white/50 text-sm block mb-3">
                    Количество пар: <span className="text-white font-bold text-lg">{qty.toLocaleString('ru-RU')}</span>
                  </label>
                  <input type="range" min={50} max={5000} step={50} value={qty} onChange={(e) => setQty(+e.target.value)} className="w-full accent-[#E94560]" />
                  <div className="flex gap-2 mt-4 flex-wrap">
                    {[100, 200, 500, 1000].map((q) => (
                      <button key={q} onClick={() => setQty(q)} className={`px-3 py-1 rounded-lg text-xs ${qty === q ? 'bg-[#E94560] text-white' : 'glass text-white/50'}`}>{q}</button>
                    ))}
                  </div>
                </div>
                <div className="bg-wool-gradient rounded-2xl p-6 text-white mb-6">
                  {disc > 0 && <p className="text-white/70 mb-2">Скидка оптом: -{(disc * 100).toFixed(0)}%</p>}
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-white/70 text-sm">Итого:</p>
                      <p className="text-4xl font-black">{total.toLocaleString('ru-RU')} ₽</p>
                      <p className="text-white/70 text-sm">{unit} ₽ × {qty} пар</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white/70 text-sm">Срок:</p>
                      <p className="text-xl font-bold">14 дней</p>
                    </div>
                  </div>
                </div>
                <button onClick={() => setStep('order')} className="w-full py-4 rounded-xl bg-white text-[#1A1A2E] font-black text-lg">
                  Оформить заказ →
                </button>
              </motion.div>
            )}

            {/* Шаг 4: Заказ */}
            {step === 'order' && (
              <motion.div key="order" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }}>
                <h2 className="text-2xl font-bold text-white mb-6">Оформление заказа</h2>
                {sent ? (
                  <div className="text-center py-16 glass border border-emerald-400/30 rounded-3xl">
                    <div className="text-7xl mb-6">🎉</div>
                    <h3 className="text-3xl font-black text-white mb-4">Заявка принята!</h3>
                    <p className="text-white/50">Менеджер свяжется в течение 2 часов</p>
                  </div>
                ) : (
                  <form onSubmit={async (e) => { e.preventDefault(); setLoading2(true); await new Promise((r) => setTimeout(r, 1500)); setLoading2(false); setSent(true) }} className="space-y-4 glass border border-white/10 p-8 rounded-3xl">
                    {[
                      { placeholder: 'Ваше имя *', type: 'text' },
                      { placeholder: '+7 (___) ___-__-__ *', type: 'tel' },
                      { placeholder: 'Email *', type: 'email' },
                      { placeholder: 'Компания (необязательно)', type: 'text' },
                    ].map((f, i) => (
                      <input key={i} required={!f.placeholder.includes('необязательно')} type={f.type} placeholder={f.placeholder}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:border-[#E94560]" />
                    ))}
                    <div className="glass border border-white/10 rounded-xl p-4 text-sm">
                      <div className="flex justify-between text-white/50 mb-1"><span>Количество:</span><span className="text-white">{qty} пар</span></div>
                      <div className="flex justify-between font-bold text-lg"><span className="text-white/70">Итого:</span><span className="text-[#F5A623]">{total.toLocaleString('ru-RU')} ₽</span></div>
                    </div>
                    <button type="submit" className="w-full py-5 rounded-2xl bg-wool-gradient text-white font-black text-xl shadow-wool">
                      🚀 Отправить заявку
                    </button>
                  </form>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </>
  )
}

// Переменная для второго шага loading
let setLoading2: (v: boolean) => void = () => {}
