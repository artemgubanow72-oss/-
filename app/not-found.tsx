import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0D0D1A] flex items-center justify-center text-center px-4">
      <div>
        <div className="text-9xl mb-6">🧦</div>
        <h1 className="text-6xl font-black text-white mb-4">404</h1>
        <p className="text-white/50 text-xl mb-8">
          Страница не найдена. Носок потерялся 😅
        </p>
        <Link href="/">
          <button className="px-8 py-4 rounded-2xl bg-wool-gradient text-white font-bold text-lg">
            На главную →
          </button>
        </Link>
      </div>
    </div>
  )
}
