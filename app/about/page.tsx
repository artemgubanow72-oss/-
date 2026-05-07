import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'О компании SHERSTON — производитель шерстяных носков',
  description:
    'SHERSTON — российский производитель шерстяных носков из Рассказово, ' +
    'Тамбовская область. 20+ лет опыта. 500+ моделей. B2B платформа для дилеров.',
}

const FACTS = [
  { icon: '🏭', title: '20+ лет',         desc: 'на рынке производства носков' },
  { icon: '🧦', title: '500+ моделей',    desc: 'шерсть, мерино, ангора, хлопок' },
  { icon: '🤝', title: '1500+ дилеров',   desc: 'по России и странам СНГ' },
  { icon: '⚙️', title: 'Lonati (Италия)', desc: 'современные станки' },
  { icon: '✅', title: '99.8% качество',  desc: 'многоуровневый контроль ОТК' },
  { icon: '🚀', title: '1 день',          desc: 'срок отгрузки со склада' },
]

const TIMELINE = [
  { year: '2004', text: 'Основание производства в г. Рассказово' },
  { year: '2008', text: 'Первые 50 дилеров по России' },
  { year: '2014', text: 'Установка итальянских станков Lonati' },
  { year: '2018', text: 'Запуск линейки носков с рисунком на заказ' },
  { year: '2022', text: 'Маркировка Честный ЗНАК, 500+ моделей' },
  { year: '2026', text: 'Запуск B2B экосистемы SHERSTON' },
]

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#060608] pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">

          {/* HERO */}
          <div className="text-center mb-24">
            <p className="text-[11px] text-[#E94560] tracking-[6px] uppercase mb-4">
              О компании
            </p>
            <h1
              className="font-black text-white leading-none mb-6"
              style={{ fontSize: 'clamp(3rem, 9vw, 10rem)' }}
            >
              МЫ —{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #E94560, #F5A623)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                SHERSTON
              </span>
            </h1>
            <p className="text-white/40 text-xl max-w-2xl mx-auto leading-relaxed">
              Производитель шерстяных носков из Рассказово, Тамбовская область.
              20 лет делаем лучшие носки в России — из натуральной шерсти,
              с душой и по технологиям мирового уровня.
            </p>
          </div>

          {/* ФАКТЫ */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-24">
            {FACTS.map((f, i) => (
              <div
                key={f.title}
                className="p-6 rounded-2xl text-center"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <span className="text-4xl block mb-3">{f.icon}</span>
                <p className="text-white font-black text-xl mb-1">{f.title}</p>
                <p className="text-white/30 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* О ПРОИЗВОДСТВЕ */}
          <div className="grid md:grid-cols-2 gap-12 items-start mb-24">
            <div>
              <h2 className="text-4xl font-black text-white mb-6">
                Собственное производство
              </h2>
              <div className="space-y-4 text-white/50 text-lg leading-relaxed">
                <p>
                  Наше производство находится в городе Рассказово Тамбовской
                  области. Мы используем итальянские станки Lonati и
                  производим более 2000 пар шерстяных носков в день.
                </p>
                <p>
                  Многоуровневый контроль качества гарантирует менее 0.2% брака.
                  Вся продукция соответствует ГОСТ и маркируется в системе
                  «Честный ЗНАК».
                </p>
                <p>
                  Полный цикл производства: от закупки сертифицированной пряжи
                  до упаковки готовой продукции — всё под одной крышей.
                </p>
              </div>

              {/* Реквизиты */}
              <div
                className="mt-8 p-5 rounded-2xl"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <p className="text-white/30 text-xs uppercase tracking-widest mb-3">
                  Реквизиты
                </p>
                <div className="space-y-1 text-sm">
                  <p className="text-white/60">
                    <span className="text-white/30">ОГРНИП: </span>
                    324680000035450
                  </p>
                  <p className="text-white/60">
                    <span className="text-white/30">ИНН: </span>
                    682800528205
                  </p>
                  <p className="text-white/60">
                    <span className="text-white/30">Адрес: </span>
                    г. Рассказово, Тамбовская область
                  </p>
                </div>
              </div>
            </div>

            {/* ТАЙМЛАЙН */}
            <div>
              <h2 className="text-4xl font-black text-white mb-6">
                Наша история
              </h2>
              <div className="space-y-0">
                {TIMELINE.map((item, i) => (
                  <div key={item.year} className="flex gap-5 group">
                    {/* Линия */}
                    <div className="flex flex-col items-center shrink-0">
                      <div
                        className="w-3 h-3 rounded-full mt-1 shrink-0"
                        style={{
                          background:
                            'linear-gradient(135deg, #E94560, #F5A623)',
                        }}
                      />
                      {i < TIMELINE.length - 1 && (
                        <div className="w-px flex-1 bg-white/[0.06] my-1" />
                      )}
                    </div>
                    {/* Контент */}
                    <div className="pb-8">
                      <span className="text-[#E94560] font-black text-sm">
                        {item.year}
                      </span>
                      <p className="text-white/50 text-sm mt-0.5 leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div
            className="text-center p-12 rounded-3xl"
            style={{
              background:
                'linear-gradient(135deg, rgba(233,69,96,0.08), rgba(245,166,35,0.05))',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <h3 className="text-3xl font-black text-white mb-4">
              Станьте нашим дилером
            </h3>
            <p className="text-white/40 text-lg mb-8">
              Маржа 40–60%. Отгрузка за 1 день. Менеджер за 2 часа.
            </p>
            <a href="/b2b/dealer">
              <button
                className="px-10 py-4 rounded-full font-bold text-white text-lg"
                style={{
                  background: 'linear-gradient(135deg, #E94560, #F5A623)',
                }}
              >
                🤝 Стать дилером
              </button>
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
              }
