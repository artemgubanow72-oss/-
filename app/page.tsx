import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import HeroSection from '../components/sections/HeroSection'
import AgenticHero from '../components/sections/AgenticHero'
import StatsSection from '../components/sections/StatsSection'
import BentoEcosystem from '../components/sections/BentoEcosystem'
import StackScrollSection from '../components/sections/StackScrollSection'
import ScrollytellingSection from '../components/sections/ScrollytellingSection'
import CatalogPreview from '../components/sections/CatalogPreview'
import OrganicSection from '../components/sections/OrganicSection'
import PlayfulSection from '../components/sections/PlayfulSection'
import MinimalismSection from '../components/sections/MinimalismSection'
import ROISection from '../components/sections/ROISection'
import B2BSection from '../components/sections/B2BSection'
import TestimonialsSection from '../components/sections/TestimonialsSection'
import CTASection from '../components/sections/CTASection'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="grain-overlay">
        {/* 1. ГЛАВНЫЙ ЭКРАН (Анимация + 3D) */}
        <HeroSection />

        {/* 2. ПЕРСОНАЛИЗАЦИЯ ПОД КЛИЕНТА (Agentic UX) */}
        <AgenticHero />

        {/* 3. ЧИСЛА И ДОСТИЖЕНИЯ (Минимализм 2.0) */}
        <StatsSection />

        {/* 4. МОДУЛЬНАЯ СЕТКА ЭКОСИСТЕМЫ */}
        <BentoEcosystem />

        {/* 5. ИНТЕРАКТИВНЫЙ СТЕК-СКРОЛЛ */}
        <StackScrollSection />

        {/* 6. ПУТЬ ПРОИЗВОДСТВА (Scrollytelling) */}
        <ScrollytellingSection />

        {/* 7. ЭСТЕТИЧНЫЙ КАТАЛОГ (Editorial style) */}
        <CatalogPreview />

        {/* 8. ЭКО-ФОКУС И ОРГАНИКА */}
        <OrganicSection />

        {/* 9. ИГРОВЫЕ ЭЛЕМЕНТЫ (Levity) */}
        <PlayfulSection />

        {/* 10. ФУНДАМЕНТАЛЬНЫЙ МИНИМАЛИЗМ */}
        <MinimalismSection />

        {/* 11. B2B СЕРВИСЫ */}
        <B2BSection />

        {/* 12. КАЛЬКУЛЯТОР ПРИБЫЛИ (ROI) */}
        <ROISection />

        {/* 13. ОТЗЫВЫ ПАРТНЕРОВ */}
        <TestimonialsSection />

        {/* 14. ФИНАЛЬНЫЙ ПРИЗЫВ (Manifesto) */}
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
