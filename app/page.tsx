import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import AgenticHero from '@/components/sections/AgenticHero'
import StatsSection from '@/components/sections/StatsSection'
import BentoEcosystem from '@/components/sections/BentoEcosystem'
import StackScrollSection from '@/components/sections/StackScrollSection'
import ScrollytellingSection from '@/components/sections/ScrollytellingSection'
import CatalogPreview from '@/components/sections/CatalogPreview'
import OrganicSection from '@/components/sections/OrganicSection'
import PlayfulSection from '@/components/sections/PlayfulSection'
import MinimalismSection from '@/components/sections/MinimalismSection'
import ROISection from '@/components/sections/ROISection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import CTASection from '@/components/sections/CTASection'
import { FAQSchema } from '@/components/seo/SchemaOrg'

export default function HomePage() {
  return (
    <>
      <FAQSchema />
      <Navbar />
      <main>
        {/* ТРЕНД: Кинетика + Глитч + Органика + Ретро */}
        <HeroSection />

        {/* ТРЕНД: Agentic UX — персонализация */}
        <AgenticHero />

        {/* ТРЕНД: Минимализм 2.0 — числа */}
        <StatsSection />

        {/* ТРЕНД: Bento Grid */}
        <BentoEcosystem />

        {/* ТРЕНД: Stacking Scroll */}
        <StackScrollSection />

        {/* ТРЕНД: Scrollytelling */}
        <ScrollytellingSection />

        {/* ТРЕНД: Editorial каталог */}
        <CatalogPreview />

        {/* ТРЕНД: Органические формы + Eco */}
        <OrganicSection />

        {/* ТРЕНД: Игривость + 3D персонажи */}
        <PlayfulSection />

        {/* ТРЕНД: Минимализм 2.0 — цитата */}
        <MinimalismSection />

        {/* ТРЕНД: Конфигуратор (BM Steel) */}
        <ROISection />

        {/* ТРЕНД: B2B/B2C переключение */}
        <TestimonialsSection />

        {/* ТРЕНД: Манифест бренда */}
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
