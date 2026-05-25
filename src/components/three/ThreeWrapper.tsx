'use client'

import dynamic from 'next/dynamic'
import { useLenis } from '@/hooks/useLenis'

const GlobalCanvas = dynamic(
  () => import('./GlobalCanvas'), 
  { ssr: false }
)

const SceneWatcher = dynamic(
  () => import('./SceneWatcher'),
  { ssr: false }
)

export default function ThreeWrapper() {
  // Inicializar smooth scroll global de Lenis
  useLenis()

  return (
    <>
      <GlobalCanvas />
      <SceneWatcher />
    </>
  )
}
