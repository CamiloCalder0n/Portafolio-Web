'use client'

import React, { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'

export default function PageTransition() {
  const containerRef = useRef<HTMLDivElement>(null)
  const wipeRef = useRef<HTMLDivElement>(null)
  const loaderRef = useRef<HTMLDivElement>(null)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (containerRef.current) {
        containerRef.current.style.display = 'none'
      }
      return
    }

    const ctx = gsap.context(() => {
      const obj = { value: 0 }
      const tl = gsap.timeline({
        onComplete: () => {
          if (containerRef.current) {
            containerRef.current.style.display = 'none'
          }
        },
      })

      // PFD L1: Contador asíncrono con aceleración no lineal para simular respuesta física
      tl.to(obj, {
        value: 100,
        duration: 1.5,
        ease: 'power3.out',
        onUpdate: () => {
          setCount(Math.floor(obj.value))
        },
      })

      // Desvanecer el cargador
      tl.to(loaderRef.current, {
        opacity: 0,
        y: -30,
        duration: 0.45,
        ease: 'power2.in',
      })

      // Cortina / Wipe vertical hacia arriba con la curva dramática personalizada
      tl.to(wipeRef.current, {
        y: '-100%',
        duration: 0.8,
        ease: 'jc.dramatic',
      }, '-=0.1')
    })

    return () => ctx.revert()
  }, [])

  // Formatear contador en estilo retro-digital de 3 dígitos "000"
  const formattedCount = String(count).padStart(3, '0')

  return (
    <div
      ref={containerRef}
      className="page-transition fixed inset-0 z-[9999] pointer-events-none"
    >
      <div
        ref={wipeRef}
        className="absolute inset-0 bg-base flex flex-col items-center justify-center pointer-events-auto"
        style={{ transform: 'translateY(0%)' }}
      >
        <div ref={loaderRef} className="flex flex-col items-center gap-4 select-none">
          {/* Contador ASCII grande estilo retro */}
          <span className="font-mono text-5xl sm:text-7xl tracking-widest text-text font-light opacity-95">
            {formattedCount}%
          </span>
          <div className="flex flex-col items-center gap-1.5">
            <span className="font-mono text-xs tracking-[0.25em] text-accent font-semibold">
              JC.INIT()
            </span>
            <span className="font-mono text-[9px] text-muted tracking-widest uppercase opacity-70">
              SYSTEMS ENGINEERING
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
