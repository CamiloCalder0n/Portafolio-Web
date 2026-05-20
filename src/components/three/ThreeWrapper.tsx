'use client'

import dynamic from 'next/dynamic'

const GlobalCanvas = dynamic(
  () => import('./GlobalCanvas'), 
  { ssr: false }
)

const SceneWatcher = dynamic(
  () => import('./SceneWatcher'),
  { ssr: false }
)

export default function ThreeWrapper() {
  return (
    <>
      <GlobalCanvas />
      <SceneWatcher />
    </>
  )
}
