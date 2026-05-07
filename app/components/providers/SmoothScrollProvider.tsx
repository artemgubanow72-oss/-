'use client'

import { useEffect, ReactNode } from 'react'

export default function SmoothScrollProvider({
  children,
}: {
  children: ReactNode
}) {
  useEffect(() => {
    let lenis: any
    let gsapInstance: any
    let ScrollTriggerInstance: any

    const init = async () => {
      try {
        const Lenis = (await import('lenis')).default
        const { gsap } = await import('gsap')
        const { ScrollTrigger } = await import('gsap/ScrollTrigger')

        gsap.registerPlugin(ScrollTrigger)
        gsapInstance = gsap
        ScrollTriggerInstance = ScrollTrigger

        lenis = new Lenis({
          duration: 1.4,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          smoothWheel: true,
          syncTouch: false,
          touchMultiplier: 2,
        })

        // Синхронизация с GSAP
        lenis.on('scroll', ScrollTrigger.update)

        gsap.ticker.add((time: number) => {
          lenis.raf(time * 1000)
        })

        gsap.ticker.lagSmoothing(0)

        // Глобальный доступ
        ;(window as any).__lenis = lenis
        ;(window as any).__gsap = gsap
        ;(window as any).__ScrollTrigger = ScrollTrigger

      } catch (e) {
        console.warn('Smooth scroll init failed:', e)
      }
    }

    init()

    return () => {
      try {
        if (lenis) lenis.destroy()
        if (gsapInstance && ScrollTriggerInstance) {
          ScrollTriggerInstance.getAll().forEach((t: any) => t.kill())
          gsapInstance.ticker.remove(() => {})
        }
      } catch (e) {}
    }
  }, [])

  return <>{children}</>
}
