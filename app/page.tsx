import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import StatsSection from '@/components/sections/StatsSection'
import AgenticHero from '@/components/sections/AgenticHero'
import BentoEcosystem from '@/components/sections/BentoEcosystem'
import ScrollytellingSection from '@/components/sections/ScrollytellingSection'
import CatalogPreview from '@/components/sections/CatalogPreview'
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
        {/* CO&IN + Sheep Inc. → кинематографичный hero */}
        <HeroSection />

        {/* Agentic UX → персонализация под дилера/розницу */}
        <AgenticHero />

        {/* Aran Woollen Mills → цифры с историей */}
        <StatsSection />

        {/* Bento Grid → модульная экосистема */}
        <BentoEcosystem />

        {/* Scrollytelling → от шерсти до носка */}
        <ScrollytellingSection />

        {/* CO&IN editorial → каталог как журнал */}
        <CatalogPreview />

        {/* BM Steel конфигуратор → ROI калькулятор */}
        <ROISection />

        {/* Lupine Lights → отзывы дилеров */}
        <TestimonialsSection />

        {/* CTA */}
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
