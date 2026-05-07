import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import StatsSection from '@/components/sections/StatsSection'
import CatalogPreview from '@/components/sections/CatalogPreview'
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
        <StatsSection />
        <CatalogPreview />
        <B2BSection />
        <ROISection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
