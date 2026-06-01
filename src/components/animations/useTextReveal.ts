'use client'
import { useEffect, RefObject } from 'react'
import { gsap, ScrollTrigger, SplitText } from '@/lib/gsap'

export function useTextReveal(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!ref.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      const headings = gsap.utils.toArray<HTMLElement>('[data-reveal="lines"]')
      headings.forEach((el) => {
        const split = new SplitText(el, {
          type: 'lines',
          linesClass: 'reveal-line',
          autoSplit: true,
        })
        // máscara: cada línea oculta tras overflow hidden
        gsap.set(split.lines, { yPercent: 110 })
        gsap.to(split.lines, {
          yPercent: 0,
          duration: 1,
          ease: 'power4.out',
          stagger: 0.08,
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        })
      })
    }, ref)

    return () => ctx.revert()
  }, [ref])
}
