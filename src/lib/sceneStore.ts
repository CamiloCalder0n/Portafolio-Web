'use client'
import { create } from 'zustand'

export type SceneType = 
  'hero' | 'about' | 'skills' | 
  'projects' | 'experience' | 'contact'

interface SceneStore {
  scene: SceneType
  setScene: (s: SceneType) => void
}

export const useSceneStore = create<SceneStore>((set) => ({
  scene: 'hero',
  setScene: (scene) => set({ scene }),
}))
