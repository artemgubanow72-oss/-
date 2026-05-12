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
import B2BSection from '@/components/sections/B2BSection'
import ROISection from '@/components/sections/ROISection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import CTASection from '@/components/sections/CTASection'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AgenticHero />
        <StatsSection />
        <BentoEcosystem />
        <StackScrollSection />
        <ScrollytellingSection />
        <CatalogPreview />
        <OrganicSection />
        <PlayfulSection />
        <MinimalismSection />
        <B2BSection />
        <ROISection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
