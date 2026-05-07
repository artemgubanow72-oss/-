import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Конструктор носков с логотипом — SHERSTON',
  description:
    'Создайте носки с вашим логотипом или выберите из нашей галереи. ' +
    '3D-превью за 30 минут. От 50 пар. Готово за 14 дней.',
}

const STEPS = [
  { num: '01', icon: '🧦', title: 'Выберите модель',    desc: 'Классические, гольфы, спортивные, детские' },
  { num: '02', icon: '📤', title: 'Загрузите логотип',  desc: 'PNG, SVG, PDF — до 10 МБ' },
  { num: '03', icon: '👁️', title: 'Получите 3D-превью', desc: 'Менеджер пришлёт за 30 минут' },
  { num: '04', icon: '✅', title: 'Одобрите и закажите',desc: 'Готово за 14 рабочих дней' },
]

const GALLERY = [
  { name: 'Скандинавский узор',  emoji: '❄️', tag: 'Этно'    },
  { name: 'Полосы',               emoji: '〰️', tag: 'Минимал' },
  { name: 'Ромбы',                emoji: '◇',  tag: 'Класс'   },
  { name: 'Снежинки',             emoji: '❆',  tag: 'Зима'    },
  { name: 'Абстракция',           emoji: '🎨', tag: 'Модерн'  },
  { name: 'Корпоративный',        emoji: '🏢', tag: 'Бизнес'  },
]

export default function ConstructorPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#060608] pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">

          {/* HERO */}
          <div className="text-center mb-20">
            <p className="text-[11px] text-[#E94560] tracking-[6px] uppercase mb-4">
              Кастомный конструктор
            </p>
            <h1
              className="font-black text-white leading-none mb-6"
              style={{ fontSize: 'clamp(2.5rem, 8vw, 9rem)' }}
            >
              СОЗДАЙ СВОЙ{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #E94560, #F5A623)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                НОСОК
              </span>
            </h1>
            <p className="text-white/40 text-xl max-w-2xl mx-auto leading-relaxed">
              Загрузи логотип → получи 3D-превью за 30 минут →
              носки с твоим брендом через 14 дней
            </p>
          </div>

          {/* КАК ЭТО РАБОТАЕТ */}
          <h2 className="text-2xl font-black text-white mb-8 text-center">
            Как это работает
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
            {STEPS.map((step) => (
              <div
                key={step.num}
                className="p-6 rounded-2xl text-center group hover:-translate-y-2 transition-transform duration-300"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <span className="text-4xl block mb-3">{step.icon}</span>
                <span className="text-[#E94560] text-xs font-black block mb-2">
                  {step.num}
                </span>
                <h3 className="text-white font-bold text-sm mb-2">{step.title}</h3>
                <p className="text-white/30 text-xs leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* ФОРМА ЗАЯВКИ */}
          <div className="grid md:grid-cols-2 gap-10 mb-20">

            {/* ФОРМА */}
            <div
              className="p-8 rounded-3xl"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <h2 className="text-2xl font-black text-white mb-6">
                Оставить заявку
              </h2>

              <form
                action="mailto:zakaz@sherston.ru"
                className="space-y-4"
              >
                <input
                  type="text"
                  placeholder="Ваше имя *"
                  required
                  className="w-full px-4 py-3 rounded-xl text-white placeholder-white/30 focus:outline-none transition-colors"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                />
                <input
                  type="tel"
                  placeholder="+7 (___) ___-__-__ *"
                  required
                  className="w-full px-4 py-3 rounded-xl text-white placeholder-white/30 focus:outline-none"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                />
                <input
                  type="email"
                  placeholder="Email *"
                  required
                  className="w-full px-4 py-3 rounded-xl text-white placeholder-white/30 focus:outline-none"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                />
                <select
                  className="w-full px-4 py-3 rounded-xl text-white/70 focus:outline-none"
                  style={{
                    background: '#0D0D1A',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <option value="">Количество пар *</option>
                  <option>50–100 пар</option>
                  <option>100–300 пар</option>
                  <option>300–500 пар</option>
                  <option>500–1000 пар</option>
                  <option>1000+ пар</option>
                </select>
                <textarea
                  placeholder="Описание дизайна или ссылка на лого"
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl text-white placeholder-white/30 focus:outline-none resize-none"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                />
                <a
                  href="mailto:zakaz@sherston.ru?subject=Заявка на конструктор носков"
                  className="block w-full py-4 rounded-full font-black text-white text-center text-lg"
                  style={{
                    background: 'linear-gradient(135deg, #E94560, #F5A623)',
                  }}
                >
                  🎨 Получить 3D-превью
                </a>
              </form>

              <p className="text-white/20 text-xs text-center mt-4">
                Менеджер ответит в течение 2 часов в рабочее время
              </p>
            </div>

            {/* ГАЛЕРЕЯ */}
            <div>
              <h2 className="text-2xl font-black text-white mb-6">
                Готовые рисунки из галереи
              </h2>
              <p className="text-white/40 text-sm mb-6 leading-relaxed">
                Не хотите загружать свой логотип? Выберите из 50+
                готовых дизайнов — без доплаты за разработку.
              </p>
              <div className="grid grid-cols-3 gap-3">
                {GALLERY.map((g) => (
                  <div
                    key={g.name}
                    className="p-4 rounded-xl text-center cursor-pointer group hover:-translate-y-1 transition-transform duration-300"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    <span className="text-3xl block mb-2">{g.emoji}</span>
                    <p className="text-white text-xs font-bold mb-1">{g.name}</p>
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-full"
                      style={{
                        background: 'rgba(233,69,96,0.15)',
                        color: '#E94560',
                      }}
                    >
                      {g.tag}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-white/25 text-xs mt-4 text-center">
                + 40 дизайнов доступны при заказе
              </p>
            </div>
          </div>

          {/* КОНТАКТЫ */}
          <div
            className="text-center p-10 rounded-3xl"
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.05)',
            }}
          >
            <h3 className="text-xl font-bold text-white mb-4">
              Есть вопросы по заказу?
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:zakaz@sherston.ru"
                className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 text-white/60 hover:text-white transition-colors text-sm"
              >
                📧 zakaz@sherston.ru
              </a>
              <a
                href="https://t.me/sherston_wool"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 text-white/60 hover:text-white transition-colors text-sm"
              >
                ✈️ Telegram @sherston_wool
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
                  }
