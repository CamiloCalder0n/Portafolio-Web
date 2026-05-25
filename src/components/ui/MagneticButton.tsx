'use client'

import React, { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  range?: number // Rango de atracción magnética en píxeles
  strength?: number // Fuerza del imán (de 0.1 a 1)
  onClick?: () => void
}

export default function MagneticButton({
  children,
  className = '',
  range = 45,
  strength = 0.35,
  onClick,
}: MagneticButtonProps) {
  const containerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const buttonCenterX = rect.left + rect.width / 2
      const buttonCenterY = rect.top + rect.height / 2
      
      const x = e.clientX - buttonCenterX
      const y = e.clientY - buttonCenterY
      const distance = Math.sqrt(x * x + y * y)

      if (distance < range) {
        // PFD L3: La atracción sutil transmite un control interactivo de alta calidad
        gsap.to(el, {
          x: x * strength,
          y: y * strength,
          duration: 0.3,
          ease: 'power2.out',
        })
      } else {
        // Resetear posición suavemente con elasticidad al salir de rango
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1.1, 0.4)',
        })
      }
    }

    const onMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1.1, 0.4)',
      })
    }

    window.addEventListener('mousemove', onMouseMove)
    el.addEventListener('mouseleave', onMouseLeave)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      el.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [range, strength])

  return (
    <button
      ref={containerRef}
      className={`relative inline-block ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
