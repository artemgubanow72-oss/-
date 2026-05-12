'use client'

import { useEffect, ReactNode, useRef } from 'react'

export default function SmoothScrollProvider({
  children,
}: {
  children: ReactNode
}) {
  const lenisRef = useRef<any>(null)
  const rafCallbackRef = useRef<((time: number) => void) | null>(null)

  useEffect(() => {
    let mounted = true

    const init = async () => {
      try {
        const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
          import('lenis'),
          import('gsap'),
          import('gsap/ScrollTrigger').then((m) => ({ ScrollTrigger: m.ScrollTrigger })),
        ])

        if (!mounted) return

        gsap.registerPlugin(ScrollTrigger)

        const lenis = new Lenis({
          duration: 1.4,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          smoothWheel: true,
          syncTouch: false,
          touchMultiplier: 2,
        })

        lenisRef.current = lenis

        lenis.on('scroll', ScrollTrigger.update)

        const rafCallback = (time: number) => {
          lenis.raf(time * 1000)
        }
        rafCallbackRef.current = rafCallback

        gsap.ticker.add(rafCallback)
        gsap.ticker.lagSmoothing(0)

        ;(window as any).__lenis = lenis
      } catch (e) {
        console.warn('SmoothScroll init error:', e)
      }
    }

    init()

    return () => {
      mounted = false
      try {
        if (lenisRef.current) {
          lenisRef.current.destroy()
          lenisRef.current = null
        }
        if (rafCallbackRef.current) {
          import('gsap').then(({ gsap }) => {
            if (rafCallbackRef.current) {
              gsap.ticker.remove(rafCallbackRef.current)
            }
          })
        }
      } catch (e) {
        // silent
      }
    }
  }, [])

  return <>{children}</>
}
